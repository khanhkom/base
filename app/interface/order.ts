import { ISpecialList } from "./docter"

export interface IOrder {
  patientId: string
  doctorId: string
  specialist: {
    code: string
    value: string
  }
  timeRange: {
    from: string
    to: string
  }
  patientNotes: string
}
export const STATUS_ORDER = {
  created: "created",
  verified: "verified",
  examining: "examining",
  rating_processing: "rating_processing",
  result_processing: "result_processing",
  done: "done",
  cancel: "cancel",
}
export interface IOrderHistory {
  fileUpload: string[]
  status: string
  patient: {
    id: string
    name: string
    userId: string
    profileId: string
    phone: string
  }
  doctor: {
    id: string
    name: string
    userId: string
    profileId: string
  }
  timeRange: {
    from: string
    to: string
    id: string
  }
  specialist: {
    specialistCode: string
    value: string
  }
  patientNotes: string
  createdBy: string
  createdAt: string
  updatedAt: string
  cancelDescription?: string
  id: string
  code: string
}
