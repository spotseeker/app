import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCardList from '@/src/components/PostCardList'

export default function Home() {
  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <View className="">
        <View className="">
          <PostCardList />
        </View>
      </View>
    </SafeAreaView>
  )
}
