import { User } from './user'

export type Image = {
  media: string
  order: number
}

export type Post = {
  id: string
  likes?: number | null
  comments?: number | null
  images: Image[]
  createdAt: string
  updatedAt?: string
  deletedAt?: string | null
  body: string
  locationId: string
  score: number
  isArchived: boolean
  user: User
}

export type PostUpdate = {
  body: string
  isArchived: boolean
  score: number
}

export type PostResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Post[]
}
