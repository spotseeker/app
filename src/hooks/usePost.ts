import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CommentsBody, PostResponse } from '../types/post'
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
    queryKey: ['archivedPosts', page, 'archived'],
    queryFn: () => api.post.list(page, undefined, true)
  })

  return { posts: data, isLoading, error }
}

export const usePostsBookmarked = (page: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bookmarkedPosts', page, 'bookmarked'],
    queryFn: () => api.post.list(page, undefined, undefined, true)
  })

  return { posts: data, isLoading, error }
}

// hooks de comentarios

export const useCommentsList = (postID: string | string[]) => {
  const { data, isLoading, error } = useQuery<CommentsBody[]>({
    queryKey: ['comments'],
    queryFn: () => api.comment.list(postID)
  })

  return { commentsList: data, isLoading, error }
}

export const useCommentPost = (postID: string | string[], comment: string) => {
  const queryClient = useQueryClient()
  const { mutate, error, data } = useMutation<CommentsBody>({
    mutationFn: () => api.comment.create(postID, comment),
    onSuccess: async (data) => {
      try {
        console.log('comentario exitoso', data)
        queryClient.invalidateQueries({ queryKey: ['comments'] })
      } catch (err) {
        console.error('error al comentar', err)
      }
    }
  })

  return { createComment: mutate, error, data }
}

export const useUpdateComment = (
  postId: string | string[],
  id: string,
  comment: string
) => {
  const queryClient = useQueryClient()
  const { mutate, error } = useMutation<CommentsBody>({
    mutationFn: () => api.comment.updateComment(postId, id, comment),
    onSuccess: async (data: CommentsBody) => {
      try {
        console.log('Actualizacion de comentario exitosa', data)
        queryClient.invalidateQueries({ queryKey: ['comments'] })
      } catch (err) {
        console.error('Error al guardar actualizar comentario', err)
      }
    }
  })

  return { updateComment: mutate, error }
}

export const useDeleteComment = (postId: string | string[], id: string) => {
  const queryClient = useQueryClient()
  const { mutate, error } = useMutation<void>({
    mutationFn: () => api.comment.deleteComment(postId, id),
    onSuccess: async (data: void) => {
      try {
        console.log('Eliminacion de comentario exitosa', data)
        queryClient.invalidateQueries({ queryKey: ['comments'] })
      } catch (err) {
        console.error('Error al elimnar actualizar comentario', err)
      }
    }
  })

  return { deleteCommentApi: mutate, error }
}
