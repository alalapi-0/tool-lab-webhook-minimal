# 运行记录

## 本机环境

- 运行日期：2026-08-12
- Node 版本：v26.0.0
- npm 版本：11.12.1
- 是否需要账号：否
- 是否需要 API Key：否

## 运行命令

```bash
node --check src/server.js
PORT=31338 npm start
```

本次复用仓库既有且被忽略的 `node_modules/`，没有安装或升级依赖；服务仅监听 loopback 验证端口。

## 运行结果

- `/health` 返回 HTTP 200、JSON Content-Type 与 `{"status":"ok"}`；
- 合法 JSON webhook 被服务端打印并返回 `ok: true` 与可解析的当前 UTC ISO 时间戳；
- 非法 JSON 被拒绝为 HTTP 400；超过 Express 默认 100 KiB 限制的 JSON 被拒绝为 HTTP 413；
- 自定义端口 31338 正确出现在启动帮助文本中，Node 语法检查通过。

## 报错记录

无验证失败。Express 默认错误处理中间件会在本地终端打印非法 JSON 和超限请求的堆栈；生产部署仍必须增加受控错误响应、签名校验、重放防护与幂等处理，本实验不声称具备这些能力。

## 一句话总结

Webhook 接收端让外部系统主动 POST 事件并快速确认接收；生产安全性取决于验签、大小限制、错误控制和幂等，而不仅是路由能返回 2xx。
