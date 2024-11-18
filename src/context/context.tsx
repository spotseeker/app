import { createContext, type PropsWithChildren } from 'react'
import { useStorageState } from '@/src/hooks/useStorageState'
import { SpotSeekerAPI } from '../api'

const api = new SpotSeekerAPI()

export const AuthContext = createContext<{
  login?: (username: string, password: string) => Promise<void> | null
  logout?: () => void | null
  session?: string | null
}>({})

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useStorageState('session')
  const login = async (username: string, password: string) => {
    const result = await api.auth.login(username, password)
    setSession(result.access)
  }
  const logout = () => {
    setSession(null)
  }
  const value = {
    login,
    logout,
    session
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
