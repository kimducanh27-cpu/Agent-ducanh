# Evals — kiểm tra router/kit

`evals/cases.json` chứa 10 tình huống chuẩn. `scripts/eval-kits.mjs` kiểm tra:

- Task → đúng kit.
- Kit → đúng mode.
- Các file hạ tầng bắt buộc tồn tại (AGENTS, router, handoff, hooks, commands, verify).

Chạy:

```bash
node scripts/eval-kits.mjs
```

Đây là eval tĩnh, không gọi LLM. Khi prompt/router đổi, cập nhật case + expected.
