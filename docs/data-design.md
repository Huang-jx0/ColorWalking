# ColorWalking 数据设计

## 1. 核心实体

### ColorItem
- id: string
- name: string
- hex: string
- message: string

### DrawResult
- id: string
- colorId: string
- colorName: string
- hex: string
- message: string
- drawnAt: string (ISO8601)
- dayKey: string (YYYY-MM-DD)

## 2. 存储设计
- storage key: `colorwalking.history.v1`
- 存储类型：JSON 数组（按时间倒序）
- 保留策略：最多 100 条

## 3. 抽取 Pipeline
1. 加载色盘配置（静态 + 可扩展）
2. 注入随机源（默认 `Math.random`，可替换为种子随机）
3. 生成目标 index
4. 输出 DrawResult
5. 写入本地历史并截断

## 4. 可复用与扩展
- `packages/shared/src/colors.ts`：仅管理色盘数据
- `packages/shared/src/engine.ts`：仅管理抽取逻辑
- App 与网站统一引用同一份数据定义，避免重复开发。
