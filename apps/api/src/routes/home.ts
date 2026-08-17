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
        cursor: z.coerce.number().optional(),
        limit: z.coerce.number(),
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

      const products = await em.find(Product, {},
        {
          limit: query.limit
        })

      return c.json({
        list: products
      })
    },
  )

export default home
