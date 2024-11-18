import { Post, PostResponse } from '../types/post'
import { Client } from './client'
import { objectToSnake } from 'ts-case-convert'

export class PostService extends Client {
  async getPosts(): Promise<PostResponse[]> {
    const response = await this.get({
      url: '/post/',
      needAuthorization: true
    })
    return response as unknown as PostResponse[]
  }

  async createPost(post: Post): Promise<PostResponse> {
    const response = await this.post({
      url: '/post/',
      needAuthorization: true,
      data: objectToSnake(post)
    })
    return response as unknown as PostResponse
  }
}
