import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthService } from '@/src/api/auth'

interface UseAuthReturn {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  isAuthenticated: boolean
  tokens: { access: string; refresh: string } | null
}

export const useAuth = (): UseAuthReturn => {
  const [error, setError] = useState<string | null>(null)
  const [tokens, setTokens] = useState<{ access: string; refresh: string } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const authService = new AuthService()

  const checkAuth = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const refreshToken = await AsyncStorage.getItem('refreshToken')

    if (accessToken && refreshToken) {
      setTokens({ access: accessToken, refresh: refreshToken })
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  const login = async (username: string, password: string): Promise<void> => {
    try {
      setError(null)
      const { access, refresh } = await authService.login(username, password)
      await AsyncStorage.setItem('accessToken', access)
      await AsyncStorage.setItem('refreshToken', refresh)
      setTokens({ access, refresh })
      setIsAuthenticated(true)
    } catch {
      setError('Error al iniciar sesión')
      setIsAuthenticated(false)

      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')
    setTokens(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return {
    login,
    logout,
    error,
    isAuthenticated,
    tokens
  }
}
