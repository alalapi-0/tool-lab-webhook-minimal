/**
 * 最小 HTTP Webhook **接收端**：
 * POST /webhook 打印 JSON body（生产请额外验签）。
 *
 * GET /health — 对齐 Stage3 Express 语义，便于联调自检。
 *
 * 默认端口 3050，与 openapi.yaml 中 servers.variables.port.default 对齐。
 */
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3050;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/webhook', (req, res) => {
  const body = req.body;
  console.log('[webhook] 收到 JSON body:', JSON.stringify(body ?? {}));
  res.json({
    ok: true,
    receivedAt: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Webhook 接收端已启动: http://localhost:${PORT}`);
  console.log(`试试: curl -s http://localhost:${PORT}/health`);
  console.log(
    `试试: curl -s -X POST http://localhost:${PORT}/webhook -H 'Content-Type: application/json' -d '{"demo":true}'`
  );
});
