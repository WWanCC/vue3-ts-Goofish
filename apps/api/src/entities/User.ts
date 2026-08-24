import { defineEntity, p } from '@mikro-orm/core'

export const User = defineEntity({
  name: 'User',

  // 避免和 MySQL 自身的 user 概念混淆。
  tableName: 'app_user',

  properties: {
    // 用户主键
    id: p.integer().primary(),

    // 用户昵称
    nickname: p.string(),

    // 用户头像
    avatarUrl: p.string(),

    // 用户信用等级
    credit: p.string().nullable(),
  },
})
