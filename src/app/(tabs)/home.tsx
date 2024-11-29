import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCardList from '@/src/components/PostCardList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
        <View className="">
          <View className="">
            <PostCardList />
          </View>
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  )
}
