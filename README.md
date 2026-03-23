# ColorWalking

ColorWalking 是一个跨平台幸运色抽取产品，包含：
- `apps/mobile`: iOS/Android（Expo React Native）
- `apps/site`: 品牌官网（Vite + React）
- `packages/shared`: 色盘与抽取逻辑共享模块

## 当前环境（已配置）
- 便携 Node.js: `d:\English\tools\node-v20.19.0-win-x64`
- 包管理器：`corepack pnpm`

## 一键命令（PowerShell）
1. 安装依赖
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-deps.ps1
```

2. 启动网站（固定 5173，自动处理占用）
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-site.ps1
```
- 本机：`http://127.0.0.1:5173`
- 局域网：`http://192.168.149.196:5173`

3. 启动网站（后台模式，不占当前终端）
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-site-bg.ps1
```
停止后台网站：
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\stop-site-bg.ps1
```

4. 启动手机调试（Expo Go）
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-mobile.ps1
```
- Expo Go 输入：`exp://192.168.149.196:8081`

## 打包可安装 APK（不上传应用商店）
1. 登录 Expo 账号（一次即可）
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\eas-login.ps1
```

2. 触发 Android APK 云构建
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-android-apk.ps1
```
构建完成后会输出下载链接，手机下载安装即可。

## 官网公网部署（所有用户可访问）
执行：
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-vercel.ps1
```
部署完成后会返回公网 `https://*.vercel.app` 地址。
详细文档见：`docs/deploy-vercel.md`

## iPhone 安装说明
- iPhone 的可安装包需要 Apple 签名（Apple Developer 账号）。
- 当前工程已支持后续 EAS iOS 构建，登录并绑定苹果账号后即可出 Ad Hoc/TestFlight 安装包。

## 原创保护
本项目视觉、文案、品牌设定（含“五彩斑斓的小羊卷”）默认归 ColorWalking 项目版权所有。
详见 `COPYRIGHT.md`。
