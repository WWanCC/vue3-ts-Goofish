import {hc} from 'hono/client'
import type {AppType} from '@goofish/api'

export const client = hc<AppType>('/')

