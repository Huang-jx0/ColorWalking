# 自动部署到 https://www.colorful-lamb-rolls.cloud

已新增工作流：`.github/workflows/deploy-site-vercel.yml`

触发方式：
- 每次 `push` 到 `main`
- 手动执行 `workflow_dispatch`

## 你只需要在 GitHub 仓库设置 3 个 Secrets

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

获取方式（Vercel 后台）：
1. Token: `Account Settings -> Tokens`
2. Org ID / Project ID: `Project Settings -> General`

## 一次性确认域名绑定

在 Vercel 项目中确认：
1. `Settings -> Domains` 已添加 `www.colorful-lamb-rolls.cloud`
2. 该域名被设置为 `Production`

完成后，后续只要提交到 `main`，就会自动部署并更新到该域名。
