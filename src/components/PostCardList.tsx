import React from 'react'
import { FlatList, Text, ActivityIndicator } from 'react-native'
import PostCard from './PostCard'
import { usePostsList } from '../hooks/usePost' // Importa el hook que implementamos

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
      data={posts?.results} // Asegúrate de acceder correctamente a los datos en la respuesta
      keyExtractor={(item) => item.id} // Usamos el 'id' como key
      renderItem={({ item }) => <PostCard {...item} />} // Pasamos los datos al componente PostCard
    />
  )
}

export default PostCardList
