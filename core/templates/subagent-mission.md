# MISSION — <mission_id>

> Gửi nguyên khối này cho subagent. Không thêm chat history, output mission khác, secret hay PII.

## Danh tính

- mission_id:
- agent:
- model:
- tools:
- command_policy:
- workspace:
- transport: native | cli | teamwork

## Việc

- persona/lens:
- objective:
- scope:
- non_goals:

## Đầu vào

- inputs:
- evidence:
- constraints:

## Đầu ra

- output_schema:
- stop_conditions:
- budget:
- acceptance:

## Khối gửi

```text
Bạn là <agent>. Chỉ làm mission <mission_id>.

Transport: <transport>
Mục tiêu: <objective>
Phạm vi: <scope>
Không làm: <non_goals>
Đầu vào: <inputs>
Bằng chứng: <evidence>
Ràng buộc: read-only; không browser; không sửa code; không bịa; thiếu dữ liệu ghi blocked.
Đầu ra: đúng core/templates/subagent-result.md; status ok/invalid/blocked/needs-repro/failed.
Dừng khi: <stop_conditions>.
Budget: <budget>.
Được dùng khi: <acceptance>.
```
