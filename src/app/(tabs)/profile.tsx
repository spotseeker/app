import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from '@/src/components/Profile'
import { useAuthContext } from '@/src/context/context'

export default function OwnProfile() {
  const { myUsername } = useAuthContext()
  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <View className="">
        <View className="">
          <Profile username={myUsername} />
        </View>
      </View>
    </SafeAreaView>
  )
}
