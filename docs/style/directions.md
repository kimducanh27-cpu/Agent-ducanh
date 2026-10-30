# Ba hướng phong cách

Đây là hướng, không phải skin copy nguyên. Chọn theo `core/rules/ui-style.md`; ghi lý do trong `agent-state/DESIGN.md`.

## 1. Editorial calm

**Dùng khi:** học tập, viết, sức khoẻ, tài chính, nội dung cần tin cậy; người dùng đọc nhiều, task không gấp.

**Palette:**
| Vai trò | Mẫu | Ghi chú |
|---|---|---|
| Nền | `#F6F1E7` | giấy ấm |
| Nền phụ | `#EFE7D8` | section/panel |
| Chữ | `#1F2A24` | mực xanh đậm |
| Chữ phụ | `#5B665F` | muted |
| Đường kẻ | `#D8D0C2` | nhẹ |
| Accent | `#1F7A5A` | xanh lá |
| Accent đậm | `#155C43` | hover/focus |
| Gia vị | `#92450F` | terracotta, dùng rất ít |

**Typography:** serif cho display (`"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif`), sans cho body (`"Segoe UI", system-ui, -apple-system, sans-serif`). Scale 1.25–1.333; line-height 1.5–1.65. Không tải font ngoài nếu chưa license.

**Spacing/density:** base 4/8; section 64–96; container 1120; thoáng, ít lựa chọn.

**UX style:** flow tuyến tính, ít quyết định mỗi màn hình, feedback nhẹ, empty state có hướng dẫn.

**Motion:** 160–240ms ease-out; fade/translate 4–8px; không bounce; reduced-motion.

**Signature:** headline serif lớn + nhịp “3 bước” (3 đường kẻ/3 số ngắn) hoặc một từ italic accent.

**Tránh:** gradient tím/xanh mặc định; glassmorphism; 3 card icon đều nhau; hero giữa vô hồn.

**Token mẫu:** `--paper`, `--paper-2`, `--ink`, `--muted`, `--line`, `--accent`, `--accent-dark`, `--warm`.

---

## 2. Product precise

**Dùng khi:** dashboard, SaaS, dev tool, bảng dữ liệu, thao tác lặp; người dùng cần tốc độ và độ chính xác.

**Palette:**
| Vai trò | Mẫu | Ghi chú |
|---|---|---|
| Nền | `#F7F8FA` | trung tính mát |
| Surface | `#FFFFFF` | card/table |
| Chữ | `#111827` | ink |
| Chữ phụ | `#6B7280` | muted |
| Đường kẻ | `#E5E7EB` | 1px |
| Accent | `#2563EB` | hành động chính |
| Accent đậm | `#1D4ED8` | hover/focus |
| Success/Warning/Danger | `#15803D` / `#B45309` / `#B91C1C` | semantic |

**Typography:** sans (`ui-sans-serif, system-ui, "Segoe UI", sans-serif`), mono cho nhãn/số (`ui-monospace, "SFMono-Regular", Consolas, monospace`). Scale 1.2; line-height 1.4–1.5; mật độ gọn.

**Spacing/density:** lưới 8px; row 40–44; panel padding 16–24; container 1280.

**UX style:** keyboard-first, filter/sort rõ, inline validation, feedback chính xác; không giấu hành động chính.

**Motion:** 120–180ms; chỉ để giải thích state; không trang trí.

**Signature:** nhãn mono + treatment số/table đặc trưng; đường kẻ chính xác.

**Tránh:** trang trí thừa; màu mè; hero marketing trong app nghiệp vụ; animation cản thao tác.

**Token mẫu:** `--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`, `--success`, `--warning`, `--danger`.

---

## 3. Warm expressive

**Dùng khi:** cộng đồng, giáo dục trẻ, sáng tạo, thương hiệu cá nhân; người dùng cần cảm giác gần gũi, khuyến khích.

**Palette:**
| Vai trò | Mẫu | Ghi chú |
|---|---|---|
| Nền | `#FFF7ED` | kem ấm |
| Surface | `#FFFFFF` | card |
| Chữ | `#2B2118` | nâu đậm |
| Chữ phụ | `#6B5B4D` | muted |
| Đường kẻ | `#E7D8C9` | mềm |
| Accent | `#C2410C` | cam đất |
| Phụ | `#0F766E` | teal |
| Highlight | `#F59E0B` | vàng, dùng ít |

**Typography:** system sans, weight đậm cho display; nếu có license, cân nhắc font tròn. Scale 1.25; line-height 1.55.

**Spacing/density:** base 8; radius 16–24; section 48–72; container 1080; thoáng vừa.

**UX style:** guided, progressive disclosure, microcopy thân thiện, feedback ăn mừng vừa phải; không giấu chi phí/rủi ro.

**Motion:** 200–320ms, hơi spring; reduced-motion; không loop.

**Signature:** khối màu lớn, nét vẽ tay, hoặc shape/illustration đơn giản.

**Tránh:** gradient bóng bẩy; emoji rải rác; minh hoạ quá nhiều làm chậm; copy “xịn xò” vô nghĩa.

**Token mẫu:** `--cream`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`, `--secondary`, `--highlight`.
