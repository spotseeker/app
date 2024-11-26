import axios, { InternalAxiosRequestConfig, type AxiosInstance } from 'axios'
import { BASE_URL } from '@/src/settings/settings'
import { objectToCamel } from 'ts-case-convert'
import { useStorageState } from '../hooks/useStorageState'

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
  }

  addAuthToken(config: InternalAxiosRequestConfig) {
    // TODO: Implement session storage
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [session, setSession] = useStorageState('session')
    config.headers['Authorization'] = `Bearer ${session}`
    return config
  }

  handleConfig(clientConfig: ClientConfig) {
    if (clientConfig.needAuthorization) {
      this.client.interceptors.request.use((config) => this.addAuthToken(config))
    }
  }

  async call(method: string, config: ClientConfig): Promise<Response | Pagination> {
    this.handleConfig(config)
    try {
      const response = await this.client.request({
        method: method,
        url: config.url,
        data: config.data,
        params: config.params
      })
      return response.data
      // TODO: Implement error handling
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
