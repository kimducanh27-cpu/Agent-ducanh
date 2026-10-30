# Router — chọn kit theo việc

## Bảng chọn kit

| Việc | Kit | Mode |
|---|---|---|
| Làm web mới, landing, web app | `new-web` | `plan_only` → `implement` |
| Web đang chạy, audit/sửa tổng thể | `audit-fix` | `review_only` → `implement` |
| Web có sẵn, thêm/đổi hành vi | `feature` | `plan_only` → `implement` |
| Web có sẵn, đổi giao diện/UX | `ui-rework` | `ui_rework` |
| Bug/hotfix/tăng tốc/bảo mật | `maintenance` | `review_only` → `implement` |

## Lite hay Full?

- **Lite:** 1 route/component, reversible, không auth/data/payment/migration/launch.
  - 1 kit + 1 prompt; audit 1 lens; fix vẫn 5+10; before/after + handoff.
- **Full:** web mới, audit toàn site, nhiều route, auth/data/payment/migration, launch.
  - Protocol đầy đủ, 10 lens, verifier độc lập, human gate.
- AI đề xuất; owner có thể nói “lite”/“full”. Không dùng Lite cho dữ liệu/quyền/thanh toán.

## Nếu không chắc, hỏi tối đa 3 câu

1. Bạn đã có website chưa, hay làm mới?
2. Bạn muốn thêm hành vi, chỉ đổi giao diện, hay đang có lỗi?
3. Bạn cần audit tổng thể hay chỉ một việc cụ thể?

Không hỏi lại thông tin đã có trong `agent-state/PROJECT.md` hoặc `HANDOFF.md`.

## Việc hỗn hợp

- Thêm chức năng + đổi giao diện: `feature` trước, `ui-rework` sau.
- Audit thấy nhiều loại: `audit-fix` ghi finding, rồi route từng U-* sang `maintenance` / `feature` / `ui-rework`.
- Làm web mới xong: `audit-fix` sau release nếu owner muốn.
- Bug cần hành vi mới: `maintenance` trước, `feature` sau.
- Không trộn mode trong một vòng.

## Stage phụ (không đổi kit)

- Tối ưu tốc độ: giữ kit hiện tại + `/perf-web` hoặc `core/prompts/perf-web.md`.
- Release/deploy: giữ kit hiện tại + `core/prompts/release-web.md`; chỉ deploy khi owner cho phép.
- Perf/release không phải kit mới; không tạo kit thứ 6.

## Output router

```text
Kit: <new-web|audit-fix|feature|ui-rework|maintenance>
Mode: <plan_only|review_only|implement|ui_rework>
Scale: <lite|full>
Đọc: core/AGENTS.md, core/protocol/README.md, core/prompts/lite.md, kits/<kit>/AGENTS.md, kits/<kit>/prompts/<...>
Thiếu: <dữ kiện cần hỏi>
```

Mỗi kit vẫn dùng riêng được bằng `kits/<kit>/START-HERE.md`; router chỉ là đường tắt.
