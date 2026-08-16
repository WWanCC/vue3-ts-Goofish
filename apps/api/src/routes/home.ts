

import { Hono } from 'hono'

const home = new Hono()

home.get('/products', (c) => {
  // 目前只返回测试数据
  // 下一步才会把原来的 Mock 商品搬进来
  return c.json({
    message: 'Home products route works!',
  })
})

export default home
