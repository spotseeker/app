import { Timestamp } from './timestamp'

export type UpdateUser = {
  userName: string
  firstName: string
  lastName: string
  avatar: string
  description: string
}

export type User = {
  email: string
  birthDate: string
} & UpdateUser

export type CreateUser = {
  password: string
} & User

export type UserResponse = {
  id: string
  isValidated: boolean
} & User &
  Timestamp

export type Notification = {
  user: string
  content: string
}

export type avatar = {
  uri: string
  fileName: string
  mimeType: string
}

export type avatarUploaded = {
  publicID: string
  url: string
}

export type RegisterUserType = {
  username: string
  email: string
  first_name: string
  last_name: string
  birth_date: string // Formato "YYYY-MM-DD"
  password: string
  description: string
  avatar: string
}

export type OtpResponse = {
  otp: string[] // Cambia el tipo de acuerdo con la estructura real de la respuesta
}
