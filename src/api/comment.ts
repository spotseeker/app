import { CommentResponse } from '../types/comment'
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

  async list(postId: string): Promise<CommentResponse[]> {
    const response = await this.client.get({
      url: `/post/${postId}/comment/`,
      needAuthorization: true
    })
    return response as unknown as CommentResponse[]
  }

  async create(postId: string, comment: string): Promise<CommentResponse> {
    const response = await this.client.post({
      url: `/post/${postId}/comment/`,
      needAuthorization: true,
      data: objectToSnake({ comment })
    })
    return response as unknown as CommentResponse
  }

  async updateComment(
    postId: string,
    id: string,
    comment: string
  ): Promise<CommentResponse> {
    const response = await this.client.put({
      url: `/post/${postId}/commnet/${id}/`,
      needAuthorization: true,
      data: objectToSnake({ comment })
    })
    return response as unknown as CommentResponse
  }

  async deleteComment(postId: string, id: string): Promise<void> {
    await this.client.delete({
      url: `/post/${postId}/commnet/${id}/`,
      needAuthorization: true
    })
  }
}
