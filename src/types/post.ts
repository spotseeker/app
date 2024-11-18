import { Timestamp } from './timestamp'

export type Image = {
  media: string
  order: number
}

export type Post = {
  images: Image[]
  body: string
  locationId: number
  score: number
  user: string
}

export type PostResponse = {
  id: string
  likes: number
  comments: number
  isArchived: boolean
} & Timestamp &
  Post
