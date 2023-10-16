import { IPatient } from "./patient"

export interface IRatingOrder {
  orderId: string
  createdBy: string
  description: string
  score: number
  criteria: string[]
  createdAt: string
  updatedAt: string
  id: string
}
export interface IRatingDoctorDetail {
  orderDetail: {
    orderId: string
    patientProfileId: string
    doctorUserId: string
  }
  patient: IPatient
  createdBy: string
  description: string
  score: number
  criteria: string[]
  createdAt: string
  updatedAt: string
  id: string
}
