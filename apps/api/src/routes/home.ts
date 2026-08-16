import {Hono} from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

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

    (c) => {
      const query = c.req.valid('query')

      return c.json({
        cursor: query.cursor,
        limit: query.limit,
      })
    },
  )

export default home
