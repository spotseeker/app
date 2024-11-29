import React, { createContext, useContext, ReactNode, useEffect } from 'react'
import { useAuth } from '@/src/hooks/useAuth'
import { useStorageState } from '@/src/hooks/useStorageState'

interface AuthContextType {
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  session: string | null
  isAuthenticated: boolean
  tokens: { access: string; refresh: string } | null
  error: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook para acceder al contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a SessionProvider')
  }
  return context
}

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, tokens, login, logout, error } = useAuth()
  const [session, setSession] = useStorageState('session')

  useEffect(() => {
    if (tokens?.access) {
      setSession(tokens.access)
    }
  }, [tokens, setSession])

  const value = {
    login,
    logout,
    session,
    isAuthenticated,
    tokens,
    error
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
