import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthService } from '@/src/api/auth'
import { SpotSeekerAPI } from '../api'
import { useMutation } from '@tanstack/react-query'

const api = new SpotSeekerAPI()

interface UseAuthReturn {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  isAuthenticated: boolean
  tokens: { access: string; refresh: string } | null
  username: string
}

export const useAuth = (): UseAuthReturn => {
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [tokens, setTokens] = useState<{ access: string; refresh: string } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const authService = new AuthService()

  const checkAuth = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const refreshToken = await AsyncStorage.getItem('refreshToken')
    const storedUsername = await AsyncStorage.getItem('username')

    if (accessToken && refreshToken && storedUsername) {
      setTokens({ access: accessToken, refresh: refreshToken })
      setUsername(storedUsername)
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  const login = async (username: string, password: string): Promise<void> => {
    try {
      setError(null)
      const response = await authService.login(username, password)

      if ('access' in response && 'refresh' in response) {
        await AsyncStorage.setItem('accessToken', response.access)
        await AsyncStorage.setItem('refreshToken', response.refresh)
        await AsyncStorage.setItem('username', username)
        setTokens({ access: response.access, refresh: response.refresh })
        setUsername(username)
        setIsAuthenticated(true)
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
      setIsAuthenticated(false)

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')
    await AsyncStorage.removeItem('username')
    setTokens(null)
    setUsername(null)
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
    tokens,
    username: username || ''
  }
}

export const useRecoverPassword = () => {
  const { mutate, status, error, data } = useMutation({
    mutationFn: api.auth.recoverPassword,
    onSuccess: (data) => {
      console.log('OTP enviado correctamente:', data)
    },
    onError: (error) => {
      console.error('Error al enviar el OTP:', error)
    }
  })
  return { sendOtpMutation: mutate, status, error, data }
}

export const useSendPasswordOTP = (otp: string) => {
  const { mutate, status, error, data } = useMutation({
    mutationFn: () => api.auth.sendPasswordOTP(otp),
    onSuccess: async (data) => {
      await AsyncStorage.setItem('accessToken', data.access)
      await AsyncStorage.setItem('refreshToken', data.refresh)
      console.log('OTP validado correctamente:', data)
    },
    onError: (error) => {
      console.error('Error al validar el OTP:', error)
    }
  })
  return { validateOTPMutation: mutate, status, error, data }
}

export const useResetPassword = (newPassword: string, username: string) => {
  const { mutate, status, error, data } = useMutation({
    mutationFn: () => api.user.resetPassword(newPassword, username),
    onSuccess: async (data) => {
      console.log('Contraseña restablecida correctamente:', data)
    },
    onError: (error) => {
      console.error('Error al restablecer la contraseña:', error)
    }
  })
  return { resetPasswordMutation: mutate, status, error, data }
}

{
  /*export const useGetProfile=(username:string) => {
  const {data,isLoading,error} = useQuery({
    queryKey: [username],
    queryFn: () => api.user.getByUsername(username)
  })
  return {profile:data,isLoading,error}
  } */
}
