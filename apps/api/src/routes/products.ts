import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { RequestContext } from '@mikro-orm/core'
import { Product } from '../entities/Product.js'

const products = new Hono()
  .get('/:id',
    zValidator(
      'param',
      z.object({
        id: z.coerce.number().int().positive(),
      }),
    ),

    async (c) => {
      const { id } = c.req.valid('param')
      const em = RequestContext.getEntityManager()

      if (!em) {
        throw new Error('MikroORM RequestContext 未初始化')
      }

      // 根据主键 id 查询一件商品。
      const product = await em.findOne(Product, {
        id,
      },{
        populate:[
          'images',
          'seller',
        ]
      })

      // findOne 找不到数据时会得到 null。
      if (!product) {
        return c.json(
          {
            message: '商品不存在',
          },
          404,
        )
      }

      // 找到了，直接返回这一件商品。
      return c.json(product,200)
    },
  )

export default products
