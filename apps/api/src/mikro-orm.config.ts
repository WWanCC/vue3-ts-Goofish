import dotenv from 'dotenv'
import { defineConfig } from '@mikro-orm/mysql'
import {fileURLToPath} from "node:url";

// ========================================
// 1. 明确加载 apps/api/.env
// ========================================
//
// 当前文件位于：
// apps/api/src/mikro-orm.config.ts
//
// ../.env 就是：
// apps/api/.env
//
// dotenv 当前版本支持 URL 作为 path。
const envPath = fileURLToPath(
  new URL('../.env', import.meta.url),
)

const envResult = dotenv.config({
  path: envPath,
})

// ========================================
// 2. 如果 .env 根本没有加载成功，立即报错
// ========================================
//
// 不要等 MikroORM 连数据库以后才发现密码不存在。
if (envResult.error) {
  throw new Error(
    `无法读取 apps/api/.env：${envResult.error.message}`,
  )
}

// ========================================
// 3. 检查必要环境变量
// ========================================

if (!process.env.DB_PASSWORD) {
  throw new Error(
    '没有读取到 DB_PASSWORD，请检查 apps/api/.env',
  )
}

// 临时调试：
// 只检查“有没有密码”，绝对不要把真实密码输出到终端。
console.log('数据库环境变量：', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  hasPassword: Boolean(process.env.DB_PASSWORD),
})

// ========================================
// 4. MikroORM 配置
// ========================================

export default defineConfig({
  host: process.env.DB_HOST ?? '127.0.0.1',

  port: Number(process.env.DB_PORT ?? 3306),

  user: process.env.DB_USER ?? 'root',

  password: process.env.DB_PASSWORD,

  dbName: process.env.DB_NAME ?? 'goofish',

  // 现在还没有 Entity。
  entities: [],

  // 当前阶段允许没有 Entity。
  discovery: {
    warnWhenNoEntities: false,
  },

  // goofish 不存在时尝试创建。
  ensureDatabase: true,

  // 开发阶段显示 ORM 日志。
  debug: true,
})
