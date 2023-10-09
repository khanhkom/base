export interface IOrderResult {
  orderId: string
  createdBy: string
  description: string
  note: string
  fileUpload: string[]
  createdAt: string
  updatedAt: string
  id: string
}
export interface IOrderResultItem {
  orderDetail: {
    orderId: string
    patientProfileId: string
    patientUserId: string
  }
  createdBy: string
  description: string
  note: string
  fileUpload: string[]
  createdAt: Date
  updatedAt: Date
  id: string
}
