import {defineEntity, p, QueryOrder} from '@mikro-orm/core'
import {ProductImage} from './ProductImage.js'
import {User} from "./User.js";

export const Product = defineEntity({
  name: 'Product',

  properties: {
    id: p.integer().primary(),

    title: p.string(),

    price: p.float(),

    originalPrice: p.float().nullable(),

    imageUrl: p.string(),

    location: p.string(),

    shippingIncluded: p.boolean(),

    serviceTag: p.string().nullable(),

    attributeText: p.string().nullable(),

    wantedCount: p.integer(),


    seller: () =>
      p
        .manyToOne(User),

    images: () => p.oneToMany(ProductImage)
      .mappedBy('product')
      .orderBy({
        sortOrder: QueryOrder.ASC,
      })
    ,

  },
})
