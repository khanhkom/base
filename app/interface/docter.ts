export interface IDocter {
  userId: string
  name: string
  gender: string
  birthday: string
  mail: string
  price: number
  specialist: {
    code: string
    value: string
  }[]
  experience: IExperience[]
  education: Education[]
  averageRating: number
  createdAt?: string
  updatedAt?: string
  id: string
}

export interface IExperience {
  timeRange: string
  description: string
  id: string
}

interface Education {
  timeRange: string
  description: string
  id: string
}
export interface ISpecialList {
  value: string
  code: string
}
export interface IDoctorCalendar {
  timeRange: {
    from: string
    to: string
    id: string
  }
  isOrder: boolean
  id: string
}
