import { User } from './user'

export type Image = {
  media: string
  order: number
}

export type Location = {
  id: string
  name: string
  latitude: number
  longitude: number
  code: string
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
  location: Location
  score: number
  isArchived: boolean
  isLiked: boolean
  isBookmarked: boolean
  user: User
}

export type createPost = {
  images: Image[]
  body: string
  location_id: string
  score: number
  is_archived: boolean
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

export type CommentsBody = {
  id: string
  user: User
  comment: string
}

export type CommentsResponse = {
  count: number
  next: string | null
  previous: string | null
  results: CommentsBody[]
}

export interface PostPatch {
  body: string
  isArchived: boolean
  score: number
  images: Image[]
  location_id: string
}
