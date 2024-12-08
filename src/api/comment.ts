import { CommentsBody } from '../types/post'
import { Client } from './client'
import { objectToSnake } from 'ts-case-convert'

export class CommentService {
  private client: Client

  constructor() {
    this.client = new Client()
    this.list = this.list.bind(this)
    this.create = this.create.bind(this)
    this.updateComment = this.updateComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }

  async list(postId: string | string[]): Promise<CommentsBody[]> {
    const response = await this.client.get({
      url: `/post/${postId}/comment/`,
      needAuthorization: true
    })
    return response as unknown as CommentsBody[]
  }

  async create(postId: string | string[], comment: string): Promise<CommentsBody> {
    const response = await this.client.post({
      url: `/post/${postId}/comment/`,
      needAuthorization: true,
      data: objectToSnake({ comment })
    })
    return response as unknown as CommentsBody
  }

  async updateComment(
    postId: string | string[],
    id: string,
    comment: string
  ): Promise<CommentsBody> {
    const response = await this.client.put({
      url: `/post/${postId}/comment/${id}/`,
      needAuthorization: true,
      data: objectToSnake({ comment })
    })
    return response as unknown as CommentsBody
  }

  async deleteComment(postId: string | string[], id: string): Promise<void> {
    await this.client.delete({
      url: `/post/${postId}/comment/${id}/`,
      needAuthorization: true
    })
  }
}
