import { loadEnvFile } from 'node:process'

import { defineConfig } from '@mikro-orm/mysql'
import { Migrator } from '@mikro-orm/migrations'

import {Product} from "./entities/Product.js";
import { ProductImage } from './entities/ProductImage.js'
// ========================================
// 1. 加载 apps/api/.env
// ========================================
//
// 当前文件：apps/api/src/mikro-orm.config.ts
// ../.env： apps/api/.env
//
// 使用 import.meta.url 后，路径相对于当前文件计算，
// 不受 pnpm 命令从哪个目录执行的影响。
loadEnvFile(new URL('../.env', import.meta.url))

// ========================================
// 2. 读取并检查环境变量
// ========================================
//
// 数据库配置属于“必须存在”的配置。
// 与其使用 ?? 给默认值导致配置错误被隐藏，
// 不如启动时直接报错。
function getEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`缺少环境变量：${name}`)
  }

  return value
}

// DB_PORT 在 process.env 中一定是字符串，
// 所以这里转换为 number。
const dbPort = Number(getEnv('DB_PORT'))

// 防止 .env 写成 DB_PORT=abc 之类的错误值。
if (!Number.isInteger(dbPort)) {
  throw new Error('环境变量 DB_PORT 必须是整数')
}

// ========================================
// 3. MikroORM 配置
// ========================================

export default defineConfig({
  host: getEnv('DB_HOST'),
  port: dbPort,

  user: getEnv('DB_USER'),
  password: getEnv('DB_PASSWORD'),

  dbName: getEnv('DB_NAME'),

  extensions: [Migrator],
  entities: [
    Product,
    ProductImage

  ],

  // 当前阶段允许没有 Entity。
  // 创建 Product 后这个配置就可以删掉。
  discovery: {
    warnWhenNoEntities: false,
  },

  // 开发阶段，如果数据库不存在则创建数据库。
  ensureDatabase: true,

  // 生产环境关闭 ORM SQL 调试日志。
  debug: process.env.NODE_ENV !== 'production',
})
