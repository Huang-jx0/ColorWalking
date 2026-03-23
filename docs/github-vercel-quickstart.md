# GitHub + Vercel 快速上线（5 分钟）

## 1) 本地提交
在 `d:\English` 执行：

```powershell
git config --global --add safe.directory D:/English
git add .
git commit -m "feat: launch ColorWalking web + mobile + deploy scripts"
```

如果提示没有用户名邮箱，先执行：

```powershell
git config --global user.name "YourName"
git config --global user.email "you@example.com"
```

## 2) 创建 GitHub 空仓库
- 打开 GitHub 新建仓库（不要勾选 README）
- 复制仓库地址，例如：`https://github.com/<you>/colorwalking.git`

## 3) 推送代码到 GitHub
把下面地址替换成你的：

```powershell
git remote add origin https://github.com/<you>/colorwalking.git
git branch -M main
git push -u origin main
```

## 4) Vercel 网页后台部署（不走 CLI）
1. 打开 `https://vercel.com/new`
2. 选择你的 GitHub 仓库 `colorwalking`
3. 点击 Deploy（本项目已有 `vercel.json`，会自动识别）
4. 等待完成，得到公网地址：`https://xxx.vercel.app`

## 5) 给用户访问
用户只需要打开你的公网网址即可：
- 不需要内网
- 不需要登录 Vercel
- 不需要安装任何工具

## 6) 绑定你自己的品牌域名（可选）
在 Vercel 项目 Settings -> Domains 添加：
- `colorwalking.com`
- `www.colorwalking.com`

按提示在域名服务商添加 DNS 即可。
