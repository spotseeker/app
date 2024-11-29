import { Timestamp } from './timestamp'

export type Image = {
  media: string
  order: number
}

export type Post = {
  image: string[]
  body: string
  locationId: string
  score: number
  user: string
  description: string
  date: Date
}

export type PostUpdate = {
  body: string
  locationId: number
  isArchived: boolean
}

export type PostResponse = {
  id: string
  likes: number
  comments: number
  rating: number
  isArchived: boolean
} & Timestamp &
  Post
