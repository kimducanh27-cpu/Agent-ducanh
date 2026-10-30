# Leader dispatch — cách gọi subagent

Leader là main agent: người duy nhất có browser (`/browser`), quyền ghi file cuối và quyền merge. Subagent là lao động clean-slate: không thấy chat, không thấy mission khác, không tự mở browser.

## Vòng lặp 8 bước

1. **Recon:** đọc `agent-state/PROJECT.md` + `HANDOFF.md`, URL/scope, evidence pack; xác nhận mode.
2. **Mission map:** chia việc thành mission độc lập; gán agent/model/tool/workspace/transport/output.
3. **Dispatch:** gửi từng batch ≤3 mission; chỉ gửi mission độc lập, không phụ thuộc nhau.
4. **Validate:** kiểm schema, status, evidence, scope, secret/PII ngay khi batch xong.
5. **Spot-check:** main dùng `/browser` kiểm 3 claim P0/P1/P2; không tin output suông.
6. **Repair:** mission lỗi → sửa đúng mission đó 1 lần; lần 2 vẫn lỗi → `blocked`.
7. **Merge:** chỉ output hợp lệ mới sang `report-editor`/judge để dedupe và chấm.
8. **Verify + handoff:** verifier độc lập; main ghi report, `HANDOFF.md`, câu hỏi cuối.

## Mission packet

Mỗi mission là một khối đóng gói theo `core/templates/subagent-mission.md`, đủ 18 field:

| Field | Ý nghĩa |
|---|---|
| `mission_id` | Mã duy nhất, ví dụ `P03-A3` |
| `agent` | Tên subagent đúng trong `.agents/agents/` |
| `model` | `inherit`, `flash`, `pro` |
| `tools` | Chỉ tool whitelist |
| `command_policy` | `off`, `auto`, `eager`, `sandbox` |
| `workspace` | `share`, `inherit`, `branch` |
| `transport` | `native`, `cli`, `teamwork` |
| `persona/lens` | P01–P10 hoặc A1–A10 |
| `objective` | Một câu kết quả cần đạt |
| `scope` | Route/component/trạng thái được xem |
| `non_goals` | Việc không được làm |
| `inputs` | File/URL/evidence pack |
| `evidence` | Đường dẫn ảnh, console, network, số đo |
| `constraints` | Read-only, không browser, không sửa code |
| `output_schema` | Theo `core/templates/subagent-result.md` |
| `stop_conditions` | Khi nào dừng và báo `blocked` |
| `budget` | Số mission/lượt, thời gian, quota |
| `acceptance` | Điều kiện để output được dùng |

**Gửi:** mục tiêu, đầu vào, evidence, schema, giới hạn.
**Không gửi:** chat history, output của mission khác, secret/credential/PII, yêu cầu mơ hồ kiểu “sửa hết đi”.

## Batch

- Tối đa **3 subagent song song** mỗi batch; không chạy 10 cùng lúc.
- 10 persona = 4 batch: `P01–P03`, `P04–P06`, `P07–P09`, `P10`.
- Batch sau chỉ chạy khi batch trước đã validate xong.
- Mission phụ thuộc (skeptic, judge, verifier) chạy tuần tự sau batch nguồn.
- Gặp budget/quota → dừng, ghi phần đã làm, không cắt schema.

## Transport

| Transport | Dùng khi | Không dùng khi |
|---|---|---|
| `native` | audit/fix tương tác, cần approval/browser | batch lớn/headless |
| `cli` | batch read-only, CI, log; `agy -p`, `/agents`, `@name` | visual review, fix, browser |
| `teamwork` | multi-file implementation, file ownership | audit visual, việc nhỏ |

- Browser chỉ main `/browser`; CLI/teamwork không thay browser.
- CLI không tự sửa code; fix do main/`/teamwork`.
- `/teamwork-preview` cũ; dùng `/teamwork`.
- Chi tiết: `docs/tools/antigravity-cli.md`.

## Model và tool

| Việc | Agent | Model | Tools | Policy |
|---|---|---|---|---|
| Persona/lens read-only | `user-auditor`, `lens-auditor` | `flash` | `view_file`, `grep_search` | `off` |
| Phản biện bug | `bug-skeptic` | `pro` | `view_file`, `grep_search` | `off` |
| Merge/chấm | `report-editor` | `pro` | `view_file`, `grep_search` | `off` |
| Bảo mật | `security-reviewer` | `flash` | `view_file`, `grep_search` | `off` |
| Verify | `verifier` | `inherit` | `view_file`, `grep_search`, `run_command` | `sandbox` |
| Test | `test-engineer` | `pro` | view/grep/run/replace | `sandbox` |

Custom subagent **không được cấp browser** (chưa được xác nhận có quyền). Browser chỉ ở main qua `/browser`.

## Workspace và ghi file

- Audit/read-only: `share` hoặc `inherit`; không ghi file.
- Sửa/test: `branch`; một file chỉ một writer; leader merge.
- Không để 2 subagent sửa cùng file; không để subagent tự merge.
- Không sửa ngoài scope test/fixture; fix do main/`/teamwork`.

## Validate output (5 check)

1. **Schema:** đủ field bắt buộc, đúng enum status.
2. **Evidence:** đường dẫn tồn tại, đúng persona/lens, đúng viewport/route.
3. **Scope:** không lấn route/component ngoài mission.
4. **Trung thực:** không bịa số/ảnh/link; thiếu dữ liệu ghi `not_run`/`blocked`.
5. **An toàn:** không secret/PII, không lệnh lạ, không quyền mới.

Sai bất kỳ check nào → mission `invalid`; không dùng để chấm.

## Lỗi và cách xử lý

| Lỗi | Xử lý |
|---|---|
| Thiếu field/sai schema | Repair đúng mission kèm danh sách field thiếu |
| Thiếu evidence | `needs-repro` hoặc `blocked`; không nâng severity |
| Ngoài scope | Reject item đó, giữ phần hợp lệ |
| Tool lỗi/timeout | Retry 1 lần với scope nhỏ hơn; vẫn lỗi → `blocked` |
| Kết quả xung đột | Đưa `bug-skeptic`/`report-editor`, không bỏ phiếu đa số |
| Repair lần 2 vẫn lỗi | `blocked`, ghi log, chạy tiếp mission khác |

## Repair

- Chỉ repair mission lỗi; không gộp mission mới, không đổi objective.
- Gửi kèm lỗi cụ thể và field cần sửa; không gửi output của mission khác.
- Output repair phải validate lại từ đầu.
- **Không cascade:** output lỗi không được sang skeptic, judge, score hay report.

## Merge và verify

- Leader chỉ chuyển output `ok` sang `report-editor`.
- `report-editor` dedupe theo root cause, chấm theo `core/prompts/scoring.md`.
- Main `/browser` spot-check 3 claim P0/P1/P2 confirmed.
- Verifier độc lập kiểm lại; không tự review rồi gọi là độc lập.
- Chỉ `project_verified` mới được nói “đã kiểm chứng”.
- Kết thúc: report + owner summary + `HANDOFF.md` + 1 câu hỏi chọn việc sửa trước.

## Không làm

- Không chạy 10 subagent cùng lúc.
- Không giao browser cho custom subagent.
- Không gửi parent history/secret/PII.
- Không chấm điểm từ output `invalid`/`blocked`.
- Không cho subagent tự duyệt kết quả của chính nó.
- Không claim “verified” khi thiếu bằng chứng `project_verified`.
