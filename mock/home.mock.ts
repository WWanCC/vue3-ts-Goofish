import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
  url: '/api/home/products',
  method: 'GET',
  delay: 900,
  body: {
    data: [
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
  },
})
