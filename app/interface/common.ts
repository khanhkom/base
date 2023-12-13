export interface ApiResponseByPage<T> {
  items: T[]
  headers: {
    "x-page": number
    "x-total-count": number
    "x-pages-count": number
    "x-per-page": number
    "x-next-page": number
  }
}
