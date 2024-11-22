import { Timestamp } from './timestamp'

export type UpdateUser = {
  username: string
  firstName: string
  lastName: string
  avatar: string
  description: string
}

export type User = {
  email: string
  birthDate: Date
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
