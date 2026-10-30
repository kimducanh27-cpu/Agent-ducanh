# Bootstrap tools — dò và cài tool còn thiếu

## 6 bước
1. Xác định app + version: Antigravity 2.0 / Qoder / Claude Code / generic.
2. Inventory: browser, MCP, skill, plugin đang có.
3. So `registry.json`; chỉ xét tool core + optional đang cần.
4. Hiển thị bảng: tool | có/thiếu | việc gì | nguồn | version | rủi ro.
5. Owner xác nhận một lần; cài từ nguồn chính thức; restart nếu cần.
6. Healthcheck + ghi `agent-state/installed.json`; cài lỗi → rollback/fallback/BLOCKED.

## Cài nhanh
- **Superpowers**
  - Antigravity: `agy plugin install https://github.com/obra/superpowers`
  - Qoder: tìm “superpowers” trong marketplace
  - Claude: `/plugin install superpowers@claude-plugins-official`
- **Chrome DevTools MCP**: Add MCP hoặc `npx -y chrome-devtools-mcp@latest`
- **Playwright MCP**: `npx @playwright/mcp@latest` (cài browser nếu cần)
- **Context7**: `npx -y @upstash/context7-mcp@latest`
- **GitHub MCP**: remote OAuth chính thức
- **Lighthouse**: `npx lighthouse <url> ...`; hoặc cài `@lhci/cli` pinned để chạy 3 run

## Không làm
- Không cài tool ngoài allowlist.
- Không nhập token/mật khẩu vào config/log.
- Không auto-update.
- Không bỏ qua xác nhận của app.
