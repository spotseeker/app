import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from '@/src/components/Profile'
import { useLocalSearchParams } from 'expo-router'

export default function OtherProfile() {
  const { username } = useLocalSearchParams()
  const normalizedUsername = Array.isArray(username) ? username[0] : username
  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <View className="">
        <View className="">
          <Profile username={normalizedUsername} />
        </View>
      </View>
    </SafeAreaView>
  )
}
