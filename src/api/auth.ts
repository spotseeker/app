import type { LoginResponse } from '@/src/types/auth'
import { Client } from './client'
import axios from 'axios'

export class AuthService extends Client {
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.post({
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
}
