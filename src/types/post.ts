export type Image = {
  media: string
  order: number
}

export type Post = {
  id: string
  likes?: number | null
  comments?: number | null
  images: Image[]
  created_at: string
  updated_at?: string
  deleted_at?: string | null
  body: string
  location_id: string
  score: number
  is_archived: boolean
  user: string
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
  user: string
  comment: string
}

export type PostComments = {
  comments: CommentsBody[]
}
