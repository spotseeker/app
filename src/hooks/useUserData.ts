import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../api/auth'
import { LoginResponse } from '../types/auth'
import { loginData } from '../schemas/userSchema'
import { UserService } from '../api/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RegisterUserType, UserResponse, OtpResponse, UpdateUser } from '../types/user'
import { SpotSeekerAPI } from '../api'

const authService = new AuthService()
const userService = new UserService()
const api = new SpotSeekerAPI()

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
        console.log(await AsyncStorage.getItem('session')) // Para depuración adicional
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

// HOOK PARA ACTUALIZAR LA CONTRASEÑA (CAMBIARLA)
export const useUpdatePassword = (
  password: string,
  newPassword: string,
  username: string
) => {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: () => api.user.updatePassword(password, newPassword, username),
    onSuccess: async (data) => {
      try {
        console.log('Actualización de contraseña exitosa', data)
      } catch (err) {
        console.error('Error al actualizar la contraseña', err)
      }
    }
  })

  return { UpdatePassword: mutate, isError, isPending }
}

// NOTIFICATIONS HOOK
export const useNotificationsList = (page:number, username: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.user.getNotifications(page, username)
  })

  return { notificationsList: data, isLoading, error }
}

// HOOK PARA ACTUALIZAR DATOS DEL USUARIO
export const useUpdateUserData = (userData: UpdateUser) => {
  const queryClient = useQueryClient()
  const { mutate, isSuccess, isError, isPending } = useMutation({
    mutationFn: () => api.user.update(userData),
    onSuccess: (data) => {
      // Handle the success response here, for example:
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
      console.log('User data updated successfully:', data)
      // You can also trigger some other actions like showing a toast, redirecting, etc.
    },
    onError: (error) => {
      // Handle error here
      console.log('Error updating user data:', error)
    }
  })

  return { useUpdate: mutate, isSuccess, isError, isPending }
}

// HOOK PARA OBTENER LOS DATOS DEL USUARIO POR EL NOMBRE DE USUARIO
export const useGetUserData = (username: string) => {
  const { data, isLoading, error } = useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: () => api.user.getByUsername(username)
  })

  return { getUserData: data, isLoading, error }
}
