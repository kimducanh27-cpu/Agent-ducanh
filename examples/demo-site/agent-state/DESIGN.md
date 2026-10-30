# DESIGN — Focus Board demo

## 1. Style direction
- Pack: Editorial calm
- Vì sao: người dùng là sinh viên/người sáng tạo/người quá tải; task chọn 3 việc mỗi ngày cần cảm giác tin cậy, nhẹ, không thúc ép.
- 3 từ khoá gu: tin cậy, ấm, rõ
- Signature element: headline serif lớn + “3 nhịp” gạch ngắn dưới h1 (xanh lá → giấy → cam đất)
- Density: thoáng; section 48–88px; container 1120px
- Voice: điềm tĩnh, khích lệ, không phán xét
- Anti-pattern: gradient tím, card grid vô hồn, emoji rải rác
- References: print/editorial, giấy ấm; không copy mù

## 2. Token 3 lớp

### Primitive
| Token | Value | Dùng cho |
|---|---|---|
| `--paper` | `#F6F1E7` | nền chính |
| `--paper-2` | `#EFE7D8` | section xen kẽ |
| `--ink` | `#1F2A24` | chữ chính |
| `--muted` | `#5B665F` | chữ phụ |
| `--line` | `#D8D0C2` | đường kẻ |
| `--white` | `#FFFDF8` | surface |
| `--accent` | `#1F7A5A` | hành động chính |
| `--accent-dark` | `#155C43` | hover/focus |
| `--warm` | `#92450F` | cảnh báo/chi tiết |
| `--warm-soft` | `#FBF0E4` | nền task đang làm |

### Semantic
| Token | Primitive | Dùng cho |
|---|---|---|
| `--bg` | paper | nền trang |
| `--bg-alt` | paper-2 | section xen kẽ |
| `--surface` | white | card/form |
| `--text` | ink | chữ |
| `--text-muted` | muted | mô tả |
| `--border` | line | viền |
| `--action` | accent | CTA |
| `--action-hover` | accent-dark | hover CTA |
| `--highlight` | warm | điểm nhấn |

### Component
| Token | Semantic | Component |
|---|---|---|
| `--radius` | 18px | card |
| `--radius-md` | 12px | task |
| `--radius-sm` | 10px | field |
| `--radius-xs` | 6px | checkbox |
| `--radius-pill` | 999px | button/nav |
| `--shadow` | `0 18px 50px rgba(31,42,36,0.12)` | card |

## 3. Typography
| Vai trò | Font | Size/line | Weight | Dùng cho |
|---|---|---|---|---|
| Display | `"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif` | clamp 2.8–5.2rem / 1.05 | 600 | h1 |
| Heading | cùng serif | clamp 2–3.1rem / 1.05 | 600 | h2 |
| Subheading | cùng serif | 1.25rem / 1.2 | 600 | h3 |
| Body | `"Segoe UI", system-ui, -apple-system, sans-serif` | 1–1.12rem / 1.6 | 400 | đoạn |
| Small | cùng sans | 0.78–0.92rem / 1.5 | 400–700 | nhãn, ghi chú |

## 4. Spacing và layout
- Scale: 4/8px; section `clamp(3rem, 7vw, 5.5rem)`.
- Container: `min(1120px, 100% - 2.5rem)`.
- Breakpoints: 850/560; test 320/360/390/768/1440.

## 5. Components
| Component | Variants | States | Token | Ghi chú |
|---|---|---|---|---|
| Button | primary/ghost/block | hover/focus-visible | action, radius-pill | min-height 44px |
| Header/nav | sticky | hover/focus | bg, border | skip-link |
| Task card | done/doing/todo | — | surface, warm-soft | 3 việc |
| Step card | 01/02/03 | — | surface, radius | 3 bước |
| Form field | input/select | focus/error | surface, warm | label + error |
| Timeline | — | — | border | mẫu ngày |

## 6. States
- Empty: không có trong demo tĩnh.
- Loading: không có; form xử lý tức thì.
- Error: viền warm + message; focus vào field lỗi đầu tiên.
- Success: status “Đã ghi nhận…”, không gửi email.
- Disabled: không có; nếu thêm phải giữ contrast và lý do rõ.

## 7. Motion
| MO | Trigger | Duration/easing | Reduced-motion |
|---|---|---|---|
| MO-01 | button hover | 160ms ease-out, translateY(-1px) | tắt transform |
| MO-02 | scroll | smooth | auto |

## 8. Accessibility
- Contrast targets: WCAG AA (text 4.5:1, UI 3:1).
- Focus: 3px outline; form focus accent.
- Keyboard: skip-link, form label/error; tab order cần kiểm đủ khi review.
- Target size: button/input ≥44px.
- Alt/label/heading: đủ; logo aria-label khớp chữ “FocusBoard”.

## 9. Nội dung
- Tone: điềm tĩnh, khích lệ, không phán xét.
- CTA verbs: “Nhận kế hoạch mẫu”, “Xem cách hoạt động”.
- Error pattern: nói cách sửa, không đổ lỗi.
- Locale: tiếng Việt; ngày/giá không có.

## 10. Nguồn sự thật
- `DESIGN.md` là chuẩn; ngoại lệ phải ghi lý do.
- Không hardcode ngoài token; không đổi token toàn cục vì một màn hình.
- `UI_REVIEW.md` tham chiếu token/component ở đây.
