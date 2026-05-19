# tool-lab-webhook-minimal

用 **Express** 启动一个监听 **HTTP POST `/webhook`** 的最小程序：把收到的 **JSON Body** 打印到终端再返回应答。类比真实世界：Stripe、GitHub、Slack、支付回调等都可能用「Webhook = 对你方 URL 进行一次推送」这种模式。

## Webhook（接收端视角）是啥

你的服务暴露一个 HTTPS（本实验仅用 HTTP + 本机）URL；**第三方主动 POST** JSON 到你的服务器，这与「你一直轮询拉取 API」不同。

## 这个最小实验验证什么

1. **`POST /webhook`**：`Content-Type: application/json` body 可被 `express.json()` 解析并打印。
2. **响应**：返回 `{ ok: true, receivedAt: ... }`（便于 Postman/Swagger Demo Viewer 对齐）。
3. **`GET /health`**：对齐 Stage 3 `/health`。

默认端口：**3050**（避免与 Stage 3 的 Express `3000` 冲突）。

## 安装步骤

```bash
cd tool-lab-webhook-minimal
npm install
```

## 运行步骤

```bash
npm start
```

另开终端示例：

```bash
curl -s http://localhost:3050/health

curl -s -X POST http://localhost:3050/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"demo.ping","payload":{"score":42}}'
```

运行窗口应打出 `[webhook] 收到 JSON body: ...`。

## OpenAPI / Postman

- **`tool-lab-openapi-spec-minimal`** 声明了与本服务一致的 `/webhook` 契约路径。
- 你也可以在 Postman 里手工建 `POST http://localhost:3050/webhook`。

## 常见失败原因

| 现象 | 可能原因 |
| --- | --- |
| Body 始终是 `{}` | 忘记 `express.json()` 或请求头未带 JSON |
| 端口冲突 | `PORT=3051 npm start` |

## 安全注意事项（必读）

最小实验**不落库、不校验签名**。生产必须：

1. HTTPS + 只允许平台来源 IP（若官方提供）。
2. 校验 **`X-*-Signature` / HMAC** 与 **`timestamp`** 拒绝重放。
3. **幂等**：同一 delivery id 可能被重试推送。

笔记：[`docs/NOTES.md`](./docs/NOTES.md)。
