# Antigravity CLI — profile

Nguồn chính thức:
- https://antigravity.google/docs/subagents/
- https://antigravity.google/docs/teamwork/
- https://antigravity.google/docs/features/
- https://antigravity.google/docs/cli/reference/
- https://antigravity.google/docs/cli/features/
- https://antigravity.google/product/antigravity-cli/

## Facts
- CLI là `agy`; là một surface khác của cùng agent harness, không phải model khác.
- CLI có `/agents` để xem/duyệt subagent, `-p`/`--print` để chạy headless, `@name` để nhắn subagent.
- CLI chạy được `/teamwork`.
- Custom subagent chạy song song, context riêng; browser **không** được cấp cho custom subagent.
- `/teamwork` có Sentinel điều phối, Orchestrator chia mốc, Worker sở hữu file riêng.
- Automations/scheduled tasks hiện là tính năng app; CLI không có bộ automation gốc.
- `/teamwork-preview` là bản cũ; dùng `/teamwork`.

## Decision matrix
| Việc | Surface | Lý do |
|---|---|---|
| Audit 10 persona/lens, batch lặp lại, CI | **CLI** `agy -p` + `/agents` | headless, log, chạy lại được; read-only |
| Sửa nhiều file, cần file ownership | **`/teamwork`** (native hoặc CLI) | Sentinel/Orchestrator/Worker; không giẫm file |
| UI/UX review, so before/after, duyệt visual | **App + `/browser`** | CLI không thay mắt người/ảnh chụp |
| Việc 1–2 file | **Main agent** | Ít overhead hơn teamwork/CLI |
| Browser evidence | **Main `/browser`** | Custom subagent không browser |

## Lệnh mẫu
```text
agy
/agents
agy -p "Chạy mission P01-A1 read-only theo mission packet; trả result schema."
@P01 "Giải thích evidence thiếu ở bước 3."
/teamwork
```
Kiểm `agy --help` trên máy trước khi dùng flag mới; không hardcode version.

## Persona + Impeccable
- CLI persona P01–P10 read-only, batch ≤3, `transport: cli`; đọc persona card + evidence.
- Impeccable chạy **một lần** ở main/app trên cùng evidence + `DESIGN.md`; không chạy theo từng persona.
- Reconcile: map A1/A10/F-UI; Impeccable-only không P0/P1; `DESIGN.md`/owner thắng.
- Output `IMPECCABLE_REVIEW.md`; `report-editor` chỉ dùng finding hợp lệ.

## Guard
- CLI chỉ cho audit/batch read-only; fix do main/`/teamwork`.
- Browser chỉ main; CLI không thêm browser.
- Batch ≤3; pause khi budget/quota; không cascade output lỗi.
- Không đưa secret/PII/chat history vào prompt.
- Validate/repair/spot-check giữ nguyên như `core/prompts/leader-dispatch.md`.
- Không dùng `/teamwork-preview`; không auto-deploy.

## Limits
- Headless khó thấy visual/approval; không dùng để kết luận UI.
- Quota/chi phí tăng nhanh khi fan-out; batch nhỏ.
- Tool/flag CLI có thể khác app; kiểm local trước.
- Automations app-only; CLI không thay scheduler.