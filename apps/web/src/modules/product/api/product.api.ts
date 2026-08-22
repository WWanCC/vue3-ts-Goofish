import {client} from '@/shared/api/client.ts'
// 提供的 RPC 响应类型推导工具
import type {InferResponseType} from 'hono/client'

//先把这个 RPC 请求方法单独拿出来
const getProductDetailRequest = client.api.products[':id'].$get

type ProductDetailResponse = InferResponseType<
  typeof getProductDetailRequest,
  200
>

type ProductDetailError = InferResponseType<
  typeof getProductDetailRequest,
  404
>

export async function getProductDetail(id: number): Promise<ProductDetailResponse> {



  const response = await getProductDetailRequest({
    param: {
      id: String(id),
    },
  })



  // 后端明确可能返回 404。
  if (response.status === 404) {
    const error = (await response.json()) as ProductDetailError
    throw new Error(error.message)
  }

  // 其他异常情况统一处理。
  if (!response.ok) {
    throw new Error(`商品详情请求失败：${response.status}`)
  }

  // 这里的商品数据类型由后端 AppType 推导。
  return (await response.json()) as ProductDetailResponse
}
