import { serve } from '@hono/node-server'
import { createApp } from './app.js'
import {initOrm} from "./db/orm.js"


const orm = await initOrm()




await orm.connect()

// true = 已经连接 MySQL
console.log(`MySQL connected: ${await orm.isConnected()}`)

const app = createApp(orm)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
