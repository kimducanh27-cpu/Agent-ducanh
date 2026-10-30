# Fix một root cause

Bạn là implementation lead. Chỉ sửa sau khi owner authorize scope.

## Input
- Một U-ID/root cause từ `agent-state/AUDIT_REPORT.md`.
- Owner đã duyệt phạm vi sửa.

## Research
- Nếu fix phụ thuộc upstream/API: research GitHub đúng version, ghi `agent-state/RESEARCH.md`.
- Không copy code ngoài license; PR merged không chứng minh bản đang cài đã có fix.

## 1. Baseline
- Reproduce đúng trạng thái; ghi số đo + ảnh trước.
- Đọc lại code/config vùng sửa; không đoán.

## 2. Phương án
Đề xuất 2–3 cách. Bảng: được gì / mất gì / rủi ro / công sức / đồng bộ thiết kế / a11y.
Chọn A/B/C trong scope; giải thích 2–3 dòng. Không thêm dependency nếu không cần.

## 3. 5 + 10
Tự đặt tối thiểu 5 câu hỏi chặn + 10 tiêu chí đo được:
- Cách đo, expected, environment, trạng thái.
- Map U → T-FIX-* + AC/V + DoR.

## 4. Implement
- Sửa tối thiểu; không refactor ngoài scope.
- TDD cho behavior; text/style manual/visual.
- UI-REVIEW nếu visual: before/after cùng route/viewport.
- Motion chỉ khi trigger: MO-* + reduced-motion.

## 5. Verify
- Browser thật; 360/768/1440; console/network.
- Ảnh trước/sau; negative control nếu đo layout.
- `verification-before-completion` trước khi nói xong.
- Bàn giao verifier độc lập; sửa theo feedback.

## 6. Handoff
- `agent-state/HANDOFF.md`: task/AC/V/evidence, next kit.
- Không deploy/push nếu chưa được phép.
