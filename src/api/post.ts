import { Post, PostResponse } from '../types/post'
import { Client } from './client'
import { objectToSnake } from 'ts-case-convert'

export class PostService extends Client {
  async list(page: number): Promise<PostResponse> {
    const response = await this.get({
      url: '/post/',
      needAuthorization: true,
      params: { page }
    })
    return response as unknown as PostResponse
  }

  async create(post: Post): Promise<PostResponse> {
    const response = await this.post({
      url: '/post/',
      needAuthorization: true,
      data: objectToSnake(post)
    })
    return response as unknown as PostResponse
  }

  async getPost(id: string): Promise<PostResponse> {
    const response = await this.get({
      url: `/post/${id}/`,
      needAuthorization: true
    })
    return response as unknown as PostResponse
  }

  // async updatePost(id: string, post: PostUpdate): Promise<PostResponse> {
  // const response = await this.patch({
  //   url: `/post/${id}/`,
  //   needAuthorization: true,
  //   data: objectToSnake(post)
  // })
  //  return response as unknown as PostResponse
  //}

  async deletePost(id: string): Promise<void> {
    await this.delete({
      url: `/post/${id}/`,
      needAuthorization: true
    })
  }

  async like(id: string): Promise<void> {
    await this.post({
      url: `/post/${id}/like/`,
      needAuthorization: true
    })
  }

  async bookmark(id: string): Promise<void> {
    await this.post({
      url: `/post/${id}/bookmark/`,
      needAuthorization: true
    })
  }
}
