import React from 'react'

import { FlatList } from 'react-native'
import { post } from '@/src/fixtures/post'
import PostCard from './PostCard'

export default function PostCardList() {
  const visiblePosts = post.filter((postc) => !postc.isArchive)

  return (
    <FlatList
      data={visiblePosts}
      keyExtractor={(postc) => String(postc.id)}
      renderItem={({ item }) => <PostCard {...item} />}
    />
  )
}
