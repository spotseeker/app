import { Post, PostResponse, PostUpdate } from '../types/post'
import { Client } from './client'
import { objectToSnake } from 'ts-case-convert'

export class PostService {
  private client: Client

  constructor() {
    this.client = new Client()
    this.list = this.list.bind(this)
    this.create = this.create.bind(this)
    this.getPost = this.getPost.bind(this)
    this.updatePost = this.updatePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.like = this.like.bind(this)
    this.bookmark = this.bookmark.bind(this)
  }

  async list(
    page: number,
    user?: string,
    isArchived?: boolean,
    isBookmarked?: boolean,
    isDiscover?: boolean,
    q?: string
  ): Promise<PostResponse> {
    const response = await this.client.get({
      url: '/post/',
      needAuthorization: true,
      params: objectToSnake({ page, user, isArchived, isBookmarked, isDiscover, q })
    })
    return response as unknown as PostResponse
  }

  async create(post: Post): Promise<PostResponse> {
    const response = await this.client.post({
      url: '/post/',
      needAuthorization: true,
      data: objectToSnake(post)
    })
    return response as unknown as PostResponse
  }

  async getPost(id: string): Promise<PostResponse> {
    const response = await this.client.get({
      url: `/post/${id}/`,
      needAuthorization: true
    })
    return response as unknown as PostResponse
  }

  async updatePost(id: string, post: PostUpdate): Promise<PostResponse> {
    const response = await this.client.patch({
      url: `/post/${id}/`,
      needAuthorization: true,
      data: objectToSnake(post)
    })
    return response as unknown as PostResponse
  }

  async deletePost(id: string): Promise<void> {
    await this.client.delete({
      url: `/post/${id}/`,
      needAuthorization: true
    })
  }

  async like(id: string): Promise<void> {
    await this.client.post({
      url: `/post/${id}/like/`,
      needAuthorization: true
    })
  }

  async bookmark(id: string): Promise<void> {
    await this.client.post({
      url: `/post/${id}/bookmark/`,
      needAuthorization: true
    })
  }
}
