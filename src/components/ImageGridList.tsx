import React from 'react'
import { ActivityIndicator, FlatList, View, Text } from 'react-native'
import { Post } from '../types/post'
import ImageGrid from './ImageGrid'

function ImageGridList({
  isLoading,
  posts
}: {
  isLoading: boolean
  posts: Post[] | undefined
}) {
  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />
  }
  if (posts?.length == 0) {
    return <Text>Sin resultados</Text>
  }
  return (
    <View className="flex justify-center items-center">
      <FlatList
        numColumns={3}
        renderItem={ImageGrid}
        data={posts}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default ImageGridList
