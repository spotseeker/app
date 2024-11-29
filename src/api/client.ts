import axios, { InternalAxiosRequestConfig, AxiosInstance } from 'axios'
import { BASE_URL } from '@/src/settings/settings'
import { objectToCamel } from 'ts-case-convert'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type ClientConfig = {
  url: string
  needAuthorization: boolean
  data?: object
  params?: object
}

export type Pagination = {
  results: object[]
  count: number
  next: string | null
  previous: string | null
}

export class Client {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Configurar el interceptor de autorización globalmente
    this.client.interceptors.request.use(this.addAuthToken)
  }

  // Obtener el token del almacenamiento y agregarlo a los headers
  async addAuthToken(config: InternalAxiosRequestConfig) {
    const session = await AsyncStorage.getItem('session')
    if (session) {
      config.headers['Authorization'] = `Bearer ${session}`
    }
    return config
  }

  async call(method: string, config: ClientConfig): Promise<Response | Pagination> {
    try {
      const response = await this.client.request({
        method: method,
        url: config.url,
        data: config.data,
        params: config.params
      })
      return response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async get(config: ClientConfig) {
    const isPaginated = config.params && 'page' in config.params
    if (isPaginated) {
      const response = await this.call('get', config)
      if ('results' in response) {
        const data: Pagination = response
        return {
          results: objectToCamel(data.results),
          count: data.count,
          next: data.next,
          previous: data.previous
        }
      }
      throw new Error('Expected Pagination response')
    } else {
      const data = await this.call('get', config)
      return objectToCamel(data)
    }
  }

  async post(config: ClientConfig) {
    const data = await this.call('post', config)
    return objectToCamel(data)
  }

  async put(config: ClientConfig) {
    const data = await this.call('put', config)
    return objectToCamel(data)
  }

  async patch(config: ClientConfig) {
    const data = await this.call('patch', config)
    return objectToCamel(data)
  }

  async delete(config: ClientConfig) {
    const data = await this.call('delete', config)
    return objectToCamel(data)
  }
}
