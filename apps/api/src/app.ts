import {Hono} from 'hono'
import home from "./routes/home.js"

// 创建整个后端的 Hono 应用实例
const app = new Hono()
  .get('/', (c) => {
    return c.text('Hello Hono!')
  })
  .route('/api/home', home)

export type AppType = typeof app

export default app
