export interface ProductItem {
  id: number
  title: string
  price: number
  imageUrl:string
  location: string

   // 是否包邮
  shippingIncluded: boolean
  // 例如“描述不符包邮退”
  serviceTag?: string
  // 例如“Apple/苹果 | 全新未拆封”
  attributeText?: string
  // 想要人数
  wantedCount: number
  // 划线原价，并不是每个商品都有
  originalPrice?: number
  // 卖家信息
  sellerName: string
  sellerAvatarUrl: string
  // 例如“卖家信用极好”，部分商品没有
  sellerCredit?: string
}
