# P05 — Mạng chậm / máy yếu

**Lens:** A5

## Hồ sơ
- Vai: người dùng mạng di động chậm, máy cấu hình thấp.
- Mục tiêu: vẫn hoàn thành task, biết hệ thống đang tải.
- Ràng buộc: kiên nhẫn có hạn; dễ bỏ nếu trang trắng.
- Môi trường: Slow 4G, CPU 4×, cold cache.

## Nhiệm vụ
1. Load trang; đo LCP/CLS/INP/TBT.
2. Bấm CTA khi trang còn tải.
3. Cuộn khi ảnh/font đang load.
4. Kiểm loading/empty/error state.

## Bug triggers
- LCP >4s / INP >500ms / CLS >0.25 (poor).
- Trang trắng/không feedback; layout shift lớn.
- CTA bấm không phản hồi; third-party chặn render.
- Ảnh/font nặng; long task.

## Bug vs preference
- Bug: không dùng được/vượt budget rõ/không biết đang tải.
- Preference: animation/transition nếu không ảnh hưởng task.

## Bằng chứng
Trace/Lighthouse 3 run; median; waterfall; ảnh trạng thái chậm; console/network.
Lab vs field tách rõ.

## Output
- Log 5–8 dòng.
- Bugs[]: metric, expected/actual, context, severity, evidence.
