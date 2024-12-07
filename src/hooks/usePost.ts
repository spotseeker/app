import { useQuery } from '@tanstack/react-query'
import { PostResponse } from '../types/post'
import { SpotSeekerAPI } from '../api'

const api = new SpotSeekerAPI()

// Función para obtener los posts desde el servicio
const postsList = async (): Promise<PostResponse> => {
  return api.post.list(1) // Asumiendo que 'list' toma un parámetro (páginas o algo similar)
}

// Hook para obtener los posts
export const usePostsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: postsList // Llamada a la función postsList
  })

  return { posts: data, isLoading, error }
}

export const usePostsUser = (page: number, username: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', page, username],
    queryFn: () => api.post.list(page, username)
  })

  return { posts: data, isLoading, error }
}

export const usePostsArchived = (page: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', page, 'archived'],
    queryFn: () => api.post.list(page, undefined, true)
  })

  return { posts: data, isLoading, error }
}

export const usePostsBookmarked = (page: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', page, 'bookmarked'],
    queryFn: () => api.post.list(page, undefined, undefined, true)
  })

  return { posts: data, isLoading, error }
}
