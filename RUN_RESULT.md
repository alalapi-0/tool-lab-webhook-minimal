# 运行记录

## 本机环境

- 操作系统：macOS 26.3.1（darwin）
- Node 版本：v25.6.1
- Python 版本：不适用
- 是否需要账号：否
- 是否需要 API Key：否

## 运行命令

```
npm install
npm start
# 另开终端：
curl -s http://localhost:3050/health
curl -s -X POST http://localhost:3050/webhook -H "Content-Type: application/json" -d '{"demo":true}'
```

## 运行结果

（2026-05-19）`/health` 返回 `{"status":"ok"}`；`POST /webhook` 终端打印收到 body，HTTP 响应形如 `{"ok":true,"receivedAt":"…"}`。

## 报错记录

无（本次自检）。

## 我是否真正理解了这个工具的一句话总结

Webhook 模式是「对方在你入睡时仍可能 POST 过来」：你的接收端要快速 2xx、可重试、且生产必须验签与幂等。
