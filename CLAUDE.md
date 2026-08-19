# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

这是一个 pnpm workspace 单仓库，当前包含两个应用：

- `apps/web`：Vue 3 + Vite 前端，使用 Vue Router、Pinia、Element Plus、Tailwind CSS 和 VueUse。
- `apps/api`：Node.js + Hono 后端，使用 MikroORM 连接 MySQL。
- `packages/*`：workspace 已预留的共享包目录，目前没有应用代码。

项目使用 ESM。Node.js 版本要求为 `^22.18.0 || >=24.12.0`，包管理器固定为 pnpm `11.21.0`。

## 常用命令

命令默认在仓库根目录执行：

```sh
pnpm install
pnpm dev
pnpm build
pnpm type-check
pnpm lint
pnpm format
pnpm test:unit
```

- `pnpm dev` 并行启动 API 和 Web。API 监听 `http://localhost:3000`；Web 的开发脚本会先等待该地址可用，再启动 Vite。
- `pnpm build` 当前只构建 Web。单独构建 API 使用 `pnpm --filter @goofish/api build`，生产启动使用 `pnpm --filter @goofish/api start`。
- `pnpm type-check` 使用 `vue-tsc --build` 检查 Web 的 TypeScript 和 Vue 类型。
- `pnpm lint` 运行 Web 的 Oxlint 和 ESLint，并带 `--fix`，执行后可能会修改文件。
- `pnpm format` 使用 Oxfmt 格式化 `apps/web/src/`，执行后可能会修改文件。
- `pnpm test:unit` 启动 Web 的 Vitest 交互模式。一次性运行测试使用 `pnpm --filter @goofish/web exec vitest run`；指定文件和用例可使用 `pnpm --filter @goofish/web exec vitest run src/path/to/file.test.ts -t "用例名称"`。

当前仓库未发现 `src/**/__tests__` 下的业务测试文件。Vitest 使用 `jsdom` 环境，并排除 `e2e/**`。

## 开发前提

API 启动时会初始化 MikroORM 并连接 MySQL，因此运行 `pnpm dev` 前必须准备 MySQL，并在 `apps/api/.env` 中配置：

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

配置文件会从 `apps/api/src/mikro-orm.config.ts` 相对加载 `apps/api/.env`，不会依赖命令执行时的当前目录。开发配置启用了 `ensureDatabase`，但数据库表结构仍由 MikroORM migrations 管理。迁移文件位于 `apps/api/src/migrations/`；可在 API workspace 中通过 `pnpm --filter @goofish/api exec mikro-orm <command>` 使用 MikroORM CLI。

## 架构与数据流

### API

`apps/api/src/index.ts` 是运行入口，负责初始化 ORM、连接数据库，并把 `createApp(orm).fetch` 交给 `@hono/node-server`。`apps/api/src/app.ts` 创建 Hono 应用，并通过 MikroORM `RequestContext` 为每个请求建立独立的 EntityManager 上下文。

首页路由位于 `apps/api/src/routes/home.ts`，实际路径为 `GET /api/home/products`。查询参数 `limit` 必填，`cursor` 可选；路由用 Zod 做查询参数校验，然后按 `Product.id` 升序查询 `id > cursor` 的记录，多取一条判断 `hasMore`，返回 `list`、`nextCursor` 和 `hasMore`。

实体定义在 `apps/api/src/entities/Product.ts`，当前数据库模型是 MySQL 的 `product` 表。新增或修改实体结构时要同步考虑 MikroORM migration，而不是只修改实体文件。

### Web

`apps/web/src/main.ts` 和 `apps/web/src/router/` 负责应用启动与路由；页面按功能模块组织，首页代码位于 `apps/web/src/modules/home/`。首页页面维护已加载商品、游标、加载状态和错误状态，并通过 VueUse 的 `useInfiniteScroll` 加载后续页面。展示组件位于 `apps/web/src/modules/home/components/`。

`apps/web/src/shared/api/client.ts` 使用 Hono `hc<AppType>` 创建客户端。`AppType` 由 API 的 `createApp` 返回类型导出，Web 通过 workspace 依赖 `@goofish/api` 直接复用该类型；首页请求封装位于 `apps/web/src/modules/home/api/home.api.ts`。新增或修改 API 路由时，应保持这条类型共享链路可用。

Vite 开发服务器把 `/api` 代理到 `http://localhost:3000`。前端请求应使用 Hono RPC 客户端提供的路径，而不是重新引入独立的 Axios 或 Mock 请求链路。

## 配置与代码风格

- Web 的 `@` 别名指向 `apps/web/src`。
- Element Plus 组件和 API 通过 Vite 插件自动导入与注册，新增组件优先遵循现有自动导入配置。
- `.oxfmtrc.json` 要求不使用分号并使用单引号。Oxlint 配置启用了 correctness、TypeScript、Vue、Vitest 等规则，其中 correctness 级别为 error。
- Web 的 lint 配置忽略 `dist`、`dist-ssr` 和 `coverage`，测试文件约定放在 `src/**/__tests__`。
