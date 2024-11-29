import type { LoginResponse } from '@/src/types/auth'
import { Client } from './client'
import { loginData } from '../schemas/userSchema'

export class AuthService extends Client {
  async login(loginData: loginData): Promise<LoginResponse> {
    const response = await this.post({
      url: '/login/',
      needAuthorization: false,
      data: loginData
    })
    return response as unknown as LoginResponse
  }
}
