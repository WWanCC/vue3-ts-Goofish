import {hc} from 'hono/client'
import type {AppType} from '@goofish/api'

export const client = hc<AppType>('http://localhost:3000')
client.api.home.products.$get({
  query: {
    limit: '12',
    cursor: '12'
  }
})
