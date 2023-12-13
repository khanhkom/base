import { ISpecialList } from "./docter"

export interface IQuestion {
  id: string
  patientUserId: string
  title: string
  content: string
  patientFiles: string[]
  specialist?: ISpecialList[] // Assuming the type of doctorSpecialist is an array
  doctorFiles: string[]
  answer?: string
  answeredAt?: string
  doctorName?: string
  doctorAvatarUrl?: string
  isAnswered: boolean
  status: EStatusQuestion
  likes: ILikeQuestion[] // Assuming the type of likes is an array
  comments: ICommentData[] // Assuming the type of comments is an array
  createdAt: string
  updatedAt: string
  patientName: string
  patientAvatarUrl: string
  doctorSpecialist: ISpecialList[] // Assuming the type of doctorSpecialist is an array
  listUser: IUserTag[]
}
export enum EStatusQuestion {
  CREATED = "CREATED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
  VERIFIED = "VERIFIED",
  ANSWERED = "ANSWERED",
}

export interface UpdateComment {
  content: string
  replyToId?: string
  tags?: [
    {
      userId: string
      role: "patient" | "doctor"
    },
  ]
}
export interface ICommentData {
  userId: string
  role: "patient" | "doctor"
  content: string
  commentFileUrl?: string
  deletedAt?: boolean
  deletedBy?: boolean

  tags: any[] // Assuming the type of tags is an array
  createdAt: string
  likes: ILikeQuestion[] // Assuming the type of likes is an array
  id: string
  _id: string
  avatarUrl: string
  userName: string
  replies: IReplyComment[] // Assuming the type of replies is an array
}

export interface IReplyComment {
  _id: string
  avatarUrl: string
  content: string
  createdAt: string
  id: string
  likes: ILikeQuestion[] // Assuming the type of likes is an array of strings
  replyToId: string
  role: string
  tags: string[] // Assuming the type of tags is an array of strings
  userId: string
  userName: string
  commentFileUrl?: string
}

export interface ILikeQuestion {
  id: string
  userId: string
}

export interface ISpecialistMost {
  count: number
  specialist: ISpecialList
}
export interface IUserTag {
  avatarUrl: string
  role: string
  userId: string
  userName: string
}
