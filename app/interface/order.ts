export interface IOrder {
  patientId: string
  doctorId: string
  specialist: string
  timeRange: {
    from: string
    to: string
  }
  patientNotes: string
}
