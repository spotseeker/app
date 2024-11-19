import { CommentResponse } from '../types/comment'
import { Client } from './client'
import { objectToSnake } from 'ts-case-convert'

export class CommentService extends Client {
  async list(postId: string): Promise<CommentResponse[]> {
    const response = await this.get({
      url: `/post/${postId}/comment/`,
      needAuthorization: true
    })
    return response as unknown as CommentResponse[]
  }

  async create(postId: string, comment: string): Promise<CommentResponse> {
    const response = await this.post({
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
    const response = await this.put({
      url: `/post/${postId}/commnet/${id}/`,
      needAuthorization: true,
      data: objectToSnake({ comment })
    })
    return response as unknown as CommentResponse
  }

  async deleteComment(postId: string, id: string): Promise<void> {
    await this.delete({
      url: `/post/${postId}/commnet/${id}/`,
      needAuthorization: true
    })
  }
}
