export interface Inotification {
  userId: string
  title: string
  body: string
  clickAction: {
    actionType: string
    data: {
      orderId: string
    }
    id: string
  }
  createdAt: string
  updatedAt: string
  id: string
}