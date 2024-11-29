import React from 'react'
import { Text, ActivityIndicator, FlatList } from 'react-native'
import PostCard from './PostCard'
import { usePostList } from '@/src/hooks/usePost'

const PostCardList = () => {
  const { postData, error, isLoading } = usePostList()

  if (isLoading) {
    return <ActivityIndicator size={'large'} color={'#0000ff'} />
  }

  if (error) {
    return <Text> Error: {error.message}</Text>
  }
  return (
    <FlatList
      data={postData}
      keyExtractor={(posts) => String(posts.id)}
      renderItem={({ item }) => <PostCard {...item} />}
    />
  )
}
export default PostCardList
