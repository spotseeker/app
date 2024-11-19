export type Comment = {
  comment: string
}

export type CommentResponse = {
  id: string
  user: string
} & Comment
