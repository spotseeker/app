import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCard from '@/src/components/PostCard'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useGetPostById } from '@/src/hooks/usePost'
import { Post } from '@/src/types/post'
import Icons from '@/src/components/Icons'

export default function SinglePost() {
  const { ArrowBack } = Icons
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Búsqueda',
      headerTintColor: '#FB9062',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])
  const [post, setPost] = useState<Post>()
  const { id } = useLocalSearchParams()
  const { postData } = useGetPostById(id)
  useEffect(() => {
    if (postData) {
      setPost(postData)
    }
  }, [postData])
  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <View className="">
        <View className="">{post && <PostCard {...post} />}</View>
      </View>
    </SafeAreaView>
  )
}
