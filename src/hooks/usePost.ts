import { useQuery } from '@tanstack/react-query'
import { PostService } from '../api/post'
import { PostResponse } from '../types/post'

const posts = new PostService()

// Función para obtener los posts desde el servicio
const postsList = async (): Promise<PostResponse> => {
  return posts.list(1) // Asumiendo que 'list' toma un parámetro (páginas o algo similar)
}

// Hook para obtener los posts
export const usePostsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: postsList // Llamada a la función postsList
  })

  return { posts: data, isLoading, error }
}
