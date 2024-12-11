import React from 'react'
import { FlatList, Text, ActivityIndicator } from 'react-native'
import PostCard from './PostCard'
import { usePostsList } from '../hooks/usePost'

const PostCardList = () => {
  const { posts, isLoading, error } = usePostsList()

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />
  }

  if (error) {
    return <Text>Error al cargar los posts</Text>
  }

  return (
    <FlatList
      data={posts?.results}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostCard {...item} />}
    />
  )
}

export default PostCardList
