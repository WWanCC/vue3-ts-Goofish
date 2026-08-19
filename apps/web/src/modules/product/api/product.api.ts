import {client} from '@/shared/api/client.ts'

export async function getProductDetail(id: number) {

  const response = await client.api.products[':id'].$get({
    param: {
      id: String(id),
    },
  })

  // 后端明确可能返回 404。
  if (response.status === 404) {
    const error = await response.json()
    throw new Error(error.message)
  }

  // 其他异常情况统一处理。
  if (!response.ok) {
    throw new Error(`商品详情请求失败：${response.status}`)
  }

  // 这里的商品数据类型由后端 AppType 推导。
  return response.json()
}
