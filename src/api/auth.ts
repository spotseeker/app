import type { LoginResponse } from '@/src/types/auth'
import { Client } from './client'

export class AuthService extends Client {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await this.post({
      url: '/login/',
      needAuthorization: false,
      data: {
        username,
        password
      }
    })
    return response as unknown as LoginResponse
  }
}
