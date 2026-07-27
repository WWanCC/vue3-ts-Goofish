export interface CursorQuery {
  cursor?: number
  limit: number
}

export interface CursorPage<T> {
  list: T[]
  nextCursor: number | null
  hasMore: boolean
}
