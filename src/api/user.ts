import { CreateUser, UpdateUser, UserResponse, Notification } from '../types/user'
import { Client } from './client'
import { objectToSnake } from 'ts-case-convert'

export class UserService extends Client {
  async create(user: CreateUser): Promise<UserResponse> {
    const response = await this.post({
      url: '/user/',
      needAuthorization: true,
      data: objectToSnake(user)
    })
    return response as unknown as UserResponse
  }

  async getByUsername(username: string): Promise<UserResponse> {
    const response = await this.get({
      url: `/user/${username}/`,
      needAuthorization: true
    })
    return response as unknown as UserResponse
  }

  async update(user: UpdateUser): Promise<UserResponse> {
    const response = await this.patch({
      url: `/user/${user.username}/`,
      needAuthorization: true,
      data: objectToSnake(user)
    })
    return response as unknown as UserResponse
  }

  async updatePassword(
    username: string,
    password: string,
    newPassword: string
  ): Promise<void> {
    await this.patch({
      url: `/user/${username}/password/`,
      needAuthorization: true,
      data: objectToSnake({ password, newPassword })
    })
  }

  async getNotifications() {
    const response = await this.get({
      url: '/user/notification/',
      needAuthorization: true
    })
    return response as unknown as Notification[]
  }
}
