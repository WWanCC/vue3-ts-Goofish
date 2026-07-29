import { fakerZH_CN } from '@faker-js/faker'
import { defineMock } from 'vite-plugin-mock-dev-server'

import type { ProductItem } from '../src/modules/home/types'

const serviceTags = [
  '描述不符包邮退',
  '验货宝',
  '极速发货',
] as const

const attributeTexts = [
  '全新未拆封',
  '几乎全新',
  '轻微使用痕迹',
  '功能正常',
  '原装正品',
] as const

const creditTags = [
  '卖家信用极好',
  '卖家信用优秀',
] as const

const products: ProductItem[] = fakerZH_CN.helpers.multiple(
  (_, index) => {
    const price = fakerZH_CN.number.int({
      min: 10,
      max: 3000,
    })

    return {
      id: index + 1,

      title: fakerZH_CN.commerce.productName(),

      price,

      originalPrice:
        price +
        fakerZH_CN.number.int({
          min: 10,
          max: 500,
        }),

      imageUrl: `https://picsum.photos/seed/product-${index + 1}/400/400`,

      location: fakerZH_CN.location.city(),

      shippingIncluded: fakerZH_CN.datatype.boolean(),

      serviceTag: fakerZH_CN.helpers.arrayElement(serviceTags),

      attributeText: fakerZH_CN.helpers.arrayElement(attributeTexts),

      wantedCount: fakerZH_CN.number.int({
        min: 0,
        max: 500,
      }),

      sellerName: fakerZH_CN.person.fullName(),

      sellerAvatarUrl: `https://picsum.photos/seed/seller-${index + 1}/100/100`,

      sellerCredit: fakerZH_CN.helpers.arrayElement(creditTags),
    }
  },
  {
    count: 60,
  },
)

export default defineMock({
  url: '/api/home/products',
  method: 'GET',
  delay: 900,

  body({ query }) {
    const limit = Number(query.limit ?? 3)

    const cursor = query.cursor ? Number(query.cursor) : null

    let startIndex = 0

    if (cursor !== null) {
      const cursorIndex = products.findIndex((product) => product.id === cursor)

      startIndex = cursorIndex + 1
    }

    const list = products.slice(startIndex, startIndex + limit)

    const hasMore = startIndex + list.length < products.length

    const lastProduct = list[list.length - 1]

    const nextCursor = hasMore && lastProduct ? lastProduct.id : null

    return {
      data: {
        list,
        nextCursor,
        hasMore,
      },
    }
  },
})
