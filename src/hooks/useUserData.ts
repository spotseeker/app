import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../api/auth'
import { LoginResponse } from '../types/auth'
import { loginData } from '../schemas/userSchema'
import { UserService } from '../api/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RegisterUserType, UserResponse, OtpResponse } from '../types/user'

const authService = new AuthService()
const userService = new UserService()

const loginUser = async (loginData: loginData): Promise<LoginResponse> => {
  return authService.login(loginData.username, loginData.password)
}

const registerUser = async (userData: RegisterUserType): Promise<UserResponse> => {
  return userService.create(userData)
}

const sendOtp = async (otp: string): Promise<OtpResponse> => {
  return userService.sendOtp(otp)
}

export const useLogin = () => {
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      try {
        // Guardamos el token de acceso en AsyncStorage
        await AsyncStorage.setItem('session', data.access)
        console.log('Login exitoso', data)
        console.log(await AsyncStorage.getItem('session'))
      } catch (err) {
        console.error('Error al guardar el token en AsyncStorage:', err)
      }
    }
  })

  return { loginMutation: mutate }
}

export const useCreateUser = () => {
  const { mutate, status, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      try {
        console.log('registro exitoso', data)
      } catch (err) {
        console.error('Error al guardar el token en AsyncStorage:', err)
      }
    }
  })
  return { registerMutation: mutate, status, error }
}

export const useSendOtp = () => {
  const { mutate, status, error, data } = useMutation({
    mutationFn: sendOtp,
    onSuccess: async (response) => {
      // El response contiene el objeto OtpResponse
      console.log('OTP enviado correctamente:', response)
    }
  })

  return { sendOtpMutation: mutate, status, error, data }
}
