// [新增]
// MikroORM 使用 MySQL 时，
// ORM 类直接从 @mikro-orm/mysql 导入。
import { MikroORM } from '@mikro-orm/mysql'

import config from '../mikro-orm.config.js'

/**
 * [新增]
 * 初始化 MikroORM。
 *
 * 调用这个函数时，MikroORM 会：
 *
 * 1. 读取配置
 * 2. 初始化 MySQL Driver
 * 3. 建立数据库连接
 * 4. 创建 EntityManager
 *
 * 下一步我们创建 Product Entity 后，
 * ORM 还会在这里完成 Entity metadata discovery。
 */
export async function initOrm() {
  const orm = await MikroORM.init(config)

  return orm
}
