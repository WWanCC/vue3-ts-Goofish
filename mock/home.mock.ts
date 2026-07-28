import { fakerZH_CN } from '@faker-js/faker'
import { defineMock } from 'vite-plugin-mock-dev-server'

// 设置种子 固定 Faker 的随机结果
fakerZH_CN.seed(20260728)


// 使用 Faker 一次性生成 30 条商品
const products = fakerZH_CN.helpers.multiple(
  (_, index) => {
    return {
      id: index + 1,

      // 生成商品名称
      title: fakerZH_CN.commerce.productName(),

      // 生成 10～3000 的整数价格
      price: fakerZH_CN.number.int({
        min: 10,
        max: 3000,
      }),
    }
  },
  {
    // 生成数量
    count: 30,
  },
)

export default defineMock({
  url: '/api/home/products',
  method: 'GET',
  delay: 900,

  body({ query }) {
    const limit = Number(query.limit ?? 3)

    const cursor = query.cursor
      ? Number(query.cursor)
      : null

    let startIndex = 0

    if (cursor !== null) {
      const cursorIndex = products.findIndex(
        (product) => product.id === cursor,
      )

      startIndex = cursorIndex + 1
    }

    const list = products.slice(
      startIndex,
      startIndex + limit,
    )

    const hasMore =
      startIndex + list.length < products.length

    const lastProduct = list[list.length - 1]

    const nextCursor =
      hasMore && lastProduct
        ? lastProduct.id
        : null

    return {
      data: {
        list,
        nextCursor,
        hasMore,
      },
    }
  },
})
