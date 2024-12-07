import type { LoginResponse } from '@/src/types/auth'
import { Client } from './client'
import axios from 'axios'

export class AuthService {
  private client: Client
  constructor() {
    this.client = new Client()
    this.login = this.login.bind(this)
    this.recoverPassword = this.recoverPassword.bind(this)
    this.sendPasswordOTP = this.sendPasswordOTP.bind(this)
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.client.post({
        url: '/login/',
        needAuthorization: false,
        data: {
          username,
          password
        }
      })

      if ('access' in response && 'refresh' in response) {
        return response as LoginResponse
      }

      throw new Error('La respuesta del servidor no es válida.')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          throw new Error(
            'Error usuario/credenciales no validas. Verifique su usuario y contraseña ingresadas.'
          )
        }

        if (err.response?.data?.detail) {
          throw new Error(err.response.data.detail)
        }
      }

      throw new Error(
        'Error usuario/credenciales no validas. Verifique su usuario y contraseña ingresadas.'
      )
    }
  }

  async recoverPassword(email: string): Promise<void> {
    await this.client.post({
      url: '/user/password/recover/',
      needAuthorization: false,
      data: {
        email
      }
    })
  }

  async sendPasswordOTP(otp: string): Promise<LoginResponse> {
    const response = await this.client.post({
      url: '/user/password/recover/otp/',
      needAuthorization: false,
      data: {
        otp
      }
    })
    return response as unknown as LoginResponse
  }
}
