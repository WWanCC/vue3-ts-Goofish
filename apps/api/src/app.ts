
import { Hono } from 'hono'

// 创建整个后端的 Hono 应用实例
const app = new Hono()

// 暂时保留这个测试路由，确认后端能正常运行
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// 把 Hono 应用导出去
// 后面的 index.ts 会负责启动它
export default app
