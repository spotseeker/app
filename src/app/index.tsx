import React, { useState, useEffect } from 'react'
import Loading from './(aux)/loading'
import { View } from 'react-native'
import Login from './auth/login'
export default function Index() {
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return !showLogin ? (
    <Loading />
  ) : (
    <View className="flex-1 justify-center items-center">
      <Login />
    </View>
  )
}
