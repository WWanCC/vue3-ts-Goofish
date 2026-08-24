import {Hono} from 'hono'
import {zValidator} from '@hono/zod-validator'
import {z} from 'zod'
import {RequestContext} from "@mikro-orm/core"
import {Product} from "../entities/Product.js"

const home = new Hono()
  .get(
    '/products',
    zValidator(
      'query',
      z.object({
        cursor: z.coerce.number().positive().optional(),
        limit: z.coerce.number().int().min(1),
      }),
    ),

    async (c) => {
      const query = c.req.valid('query')
      const em = RequestContext.getEntityManager()
      // 理论上经过我们在 app.ts 注册的 middleware 后一定存在。
      // 这里加检查，避免未来 middleware 配错时静默出问题。
      if (!em) {
        throw new Error('MikroORM RequestContext 未初始化')
      }

      // 构建条件
      // 第一次：
      // cursor = undefined
      // 查询 id > 0，也就是从头开始
      //
      // 第二次：
      // cursor = 12
      // 查询 id > 12
      const where = query.cursor !== undefined
        ? {
          id: {
            $gt: query.cursor,
          },
        }
        : {}

      // 前端要知道“后面还有没有商品”。
      //
      // 假设 limit = 12：
      // 实际查 13 条。
      //
      // 查到 13 条 → 后面还有数据
      // 只查到 <=12 条 → 已经到底了
      const products = await em.find(
        Product,
        where,
        {
          populate:['seller'],
          orderBy: {
            id: 'asc',
          },
          limit: query.limit + 1,
        },
      )

      // 多查出来的第 13 条只是用来判断还有没有下一页。
      const hasMore = products.length > query.limit

      // 真正返回给前端的仍然只保留 limit 条。
      const list = products.slice(0, query.limit)

      // 本页最后一条商品的 id，
      // 就作为下一页的 cursor。
      const lastProduct = list[list.length - 1]

      const nextCursor =
        hasMore && lastProduct
          ? lastProduct.id
          : null

      return c.json({
        list,
        nextCursor,
        hasMore,
      })
    },
  )

export default home
