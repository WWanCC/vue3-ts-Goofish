export interface ProductItem {
  id: number
  title: string
  price: number
  imageUrl:string
  location: string

   // 是否包邮
  shippingIncluded: boolean
  // 例如“描述不符包邮退”
  // 数据库允许 NULL，所以前端也接受 null。
  serviceTag?: string | null
  // 例如“Apple/苹果 | 全新未拆封”
  attributeText?: string | null
  // 想要人数
  wantedCount: number
  // 划线原价，并不是每个商品都有
  originalPrice?: number | null
  // 卖家信息
  sellerName: string
  sellerAvatarUrl: string
  // 例如“卖家信用极好”，部分商品没有
  sellerCredit?: string | null
}
