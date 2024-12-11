import {
  UpdateUser,
  UserResponse,
  Notification,
  RegisterUserType,
  OtpResponse,
  FollowersResponse,
  FollowingResponse
} from '../types/user'
import { Client } from './client'
import { objectToSnake } from 'ts-case-convert'

export class UserService {
  private client: Client
  constructor() {
    this.client = new Client()
    this.create = this.create.bind(this)
    this.getByUsername = this.getByUsername.bind(this)
    this.update = this.update.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    this.getNotifications = this.getNotifications.bind(this)
    this.sendOtp = this.sendOtp.bind(this)
    this.list = this.list.bind(this)
  }

  async create(user: RegisterUserType): Promise<UserResponse> {
    const response = await this.client.post({
      url: '/user/',
      needAuthorization: true,
      data: user
    })
    return response as unknown as UserResponse
  }

  async getByUsername(username: string): Promise<UserResponse> {
    const response = await this.client.get({
      url: `/user/${username}/`,
      needAuthorization: true
    })
    return response as unknown as UserResponse
  }

  async update(user: UpdateUser): Promise<UserResponse> {
    const response = await this.client.patch({
      url: `/user/${user.username}/`,
      needAuthorization: true,
      data: objectToSnake(user)
    })
    return response as unknown as UserResponse
  }

  async updatePassword(password: string, newPassword: string): Promise<void> {
    await this.client.patch({
      url: '/user/password/',
      needAuthorization: true,
      data: objectToSnake({ password, newPassword })
    })
  }

  async resetPassword(password: string): Promise<void> {
    await this.client.post({
      url: '/user/password/reset/',
      needAuthorization: true,
      data: { password }
    })
  }

  async getNotifications() {
    const response = await this.client.get({
      url: '/user/notification/',
      needAuthorization: true
    })
    return response as unknown as Notification[]
  }

  async sendOtp(otp: string): Promise<OtpResponse> {
    const response = await this.client.post({
      url: '/user/otp/',
      needAuthorization: true,
      data: { otp }
    })
    return response as unknown as OtpResponse
  }

  async list(page: number, username: string): Promise<FollowersResponse> {
    const response = await this.client.get({
      url: `user/${username}/followers/`,
      needAuthorization: true,
      params: objectToSnake({ page, username })
    })
    return response as unknown as FollowersResponse
  }

  async followingList(page: number, username?: string): Promise<FollowingResponse> {
    const response = await this.client.get({
      url: `user/${username}/following/`,
      needAuthorization: true,
      params: objectToSnake({ page, username })
    })
    return response as unknown as FollowingResponse
  }

  async unfollowUser(username: string): Promise<void> {
    await this.client.delete({
      url: `user/${username}/follow/`,
      needAuthorization: true
    })
  }
}
