import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
  url: '/api/home/products',
  method: 'GET',
  delay: 900,

  body({ query }) {
    const cursor = query.cursor
      ? Number(query.cursor)
      : null

    // 第一次请求：没有 cursor
    if (cursor === null) {
      return {
        data: {
          list: [
            {
              id: 1,
              title: '机械键盘，九成新',
              price: 199,
            },
            {
              id: 2,
              title: '闲置显示器支架',
              price: 89,
            },
            {
              id: 3,
              title: '全新未拆封鼠标',
              price: 129,
            },
          ],
          nextCursor: 3,
          hasMore: true,
        },
      }
    }

    // 第二次请求：携带 cursor=3
    return {
      data: {
        list: [
          {
            id: 4,
            title: '二手办公椅',
            price: 260,
          },
          {
            id: 5,
            title: '桌面音响',
            price: 150,
          },
          {
            id: 6,
            title: '笔记本电脑支架',
            price: 79,
          },
        ],
        nextCursor: null,
        hasMore: false,
      },
    }
  },
})
