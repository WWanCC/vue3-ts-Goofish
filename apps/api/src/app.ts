import {Hono} from 'hono'
import home from "./routes/home.js"
import products from "./routes/products.js";

// RequestContext 用来给每一次 HTTP 请求创建独立的 EntityManager 上下文
import {RequestContext} from '@mikro-orm/core'
import type {MikroORM} from '@mikro-orm/mysql'


export function createApp(orm: MikroORM) {
// 创建整个后端的 Hono 应用实例
  const app = new Hono()
    //中间件创建干净em
    .use('*', async (_c, next) => {
      await RequestContext.create(orm.em, next)
    })
    .get('/', (c) => {
      return c.text('Hello Hono!')
    })
    .route('/api/home', home)
    .route('/api/products', products)

  return app
}

export type AppType = ReturnType<typeof createApp>


