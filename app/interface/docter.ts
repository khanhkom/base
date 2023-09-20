export interface IDocter {
  userId: string
  name: string
  gender: string
  birthday: string
  mail: string
  price: number
  specialist: string[]
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
