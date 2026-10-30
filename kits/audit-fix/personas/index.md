# 10 persona — người dùng soi lỗi

> Mỗi persona là một mission cho `user-auditor`, không phải 10 agent definition riêng.

| ID | Persona | Lens | Mission chính |
|---|---|---|---|
| P01 | Người mới lần đầu | A1 | 5 giây, value prop, CTA, trust |
| P02 | Người cần xong việc | A2 | Hoàn thành luồng chính, lỗi, confirmation |
| P03 | Mobile một tay | A3 | 360/320, tap target, overflow, bàn phím |
| P04 | Keyboard / screen reader | A4 | Tab/focus/label/contrast/reflow |
| P05 | Mạng chậm / máy yếu | A5 | LCP/INP/CLS, loading, third-party |
| P06 | Người tìm thông tin | A6 | Nav/search/404/content/metadata |
| P07 | Người hoài nghi / privacy | A7 | Consent/auth/PII/dark pattern |
| P08 | Người quay lại / power user | A8 | Session/state/settings/history |
| P09 | Người dùng biên / adversarial | A9 | Input xấu, back/refresh, multi-tab |
| P10 | Designer khó tính / cross-browser | A10 | States, spacing, render, browser |

## Quy tắc
- Mỗi mission: persona card + lens + evidence pack; không browser, không code.
- Log ngôi thứ nhất 5–8 dòng; bug phải có expected/actual/repro/evidence.
- Bug vs preference: preference cap P3; P0/P1/P2 phải qua `bug-skeptic`.
- Không cascade output lỗi; lỗi một persona thì repair đúng mission đó.
