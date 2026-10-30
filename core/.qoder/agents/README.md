# Qoder custom agents

Qoder không tự đọc `.claude/agents`. Tạo custom agent trong Qoder bằng:

- `/create-subagent`, hoặc
- Settings → Agents → tạo mới.

Dùng nội dung/role từ:

- `core/.claude/agents/lens-auditor.md`
- `core/.claude/agents/verifier.md`
- `core/.claude/agents/security-reviewer.md`
- `core/.claude/agents/test-engineer.md`

Gợi ý cấu hình:
- `lens-auditor` / `verifier` / `security-reviewer`: read-only, không Edit/Write.
- `test-engineer`: chỉ sửa test/fixture.
- Không cấp quyền deploy/payment.
