import { defineEntity, p } from '@mikro-orm/core'
import { ProductImage } from './ProductImage.js'
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

    sellerName: p.string(),

    sellerAvatarUrl: p.string(),

    sellerCredit: p.string().nullable(),

    images: () => p.oneToMany(ProductImage).mappedBy('product'),

  },
})
