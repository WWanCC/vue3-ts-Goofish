import { defineEntity, p } from '@mikro-orm/core'

import { Product } from './Product.js'

export const ProductImage = defineEntity({
  name: 'ProductImage',

  properties: {
    // 图片自己的主键
    id: p.integer().primary(),

    // 图片地址
    url: p.string(),

    // 图片显示顺序
    sortOrder: p.integer().default(0),

    // 关键：
    // 多张 ProductImage 可以属于同一个 Product
    product: () => p.manyToOne(Product),
  },
})
