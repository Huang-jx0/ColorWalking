# Vercel 公网部署指南（ColorWalking）

## 目标
将官网部署为公网 HTTPS 地址，让任何用户都能在不同网络和设备稳定访问。

## 前提
- 项目目录：`d:\English`
- 已可执行 `scripts/install-deps.ps1`

## 方式 A：命令行一键部署（推荐）
在项目根目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-vercel.ps1
```

部署完成后，终端会输出：
- 预览域名（`*.vercel.app`）
- 生产域名（`*.vercel.app`）

## 方式 B：Vercel 控制台导入
1. 把代码推到 GitHub。
2. 在 Vercel 新建项目，导入仓库。
3. Framework 选择 `Vite`。
4. 构建将读取根目录 `vercel.json` 自动完成。

## 上线后建议
- 绑定自定义域名（例如 `colorwalking.com`）。
- 开启 HTTPS（Vercel 默认启用）。
- 建议配置分析工具（Vercel Analytics 或 GA）。

## 说明
你当前本地 `vite dev` 属于开发服务，仅适合本机/局域网测试。
Vercel 生产部署后，不再依赖内网。
