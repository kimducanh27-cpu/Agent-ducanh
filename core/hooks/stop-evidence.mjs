import { existsSync, readFileSync } from "node:fs";

function block(reason) {
  console.error(`[agent-ducanh] BLOCKED: ${reason}`);
  process.exit(2);
}

if (!existsSync("agent-state/HANDOFF.md")) {
  if (existsSync("agent-state")) {
    block("Đã có thư mục agent-state/ nhưng thiếu agent-state/HANDOFF.md. Cập nhật handoff trước khi kết thúc.");
  }
  process.exit(0);
}

const handoff = readFileSync("agent-state/HANDOFF.md", "utf8");
for (const key of ["protocol:", "kit:", "mode:", "evidence:", "next_kit:"]) {
  if (!handoff.includes(key)) block(`HANDOFF thiếu ${key}. Cập nhật handoff trước khi kết thúc.`);
}

process.exit(0);
