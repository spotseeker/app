import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  CommentsBody,
  CommentsResponse,
  createPost,
  Post,
  PostResponse
} from '../types/post'
import { SpotSeekerAPI } from '../api'

const api = new SpotSeekerAPI()

const postsList = async (): Promise<PostResponse> => {
  return api.post.list(1)
}

export const usecreatePostApi = (postData: createPost) => {
  const queryClient = useQueryClient()
  const { mutate, error, data, isSuccess, isPending } = useMutation<Post>({
    mutationFn: () => api.post.create(postData),
    onSuccess: async (data: Post) => {
      try {
        console.log('Creacion del post exitosa', data)
        queryClient.invalidateQueries({ queryKey: ['posts'] })
      } catch (err) {
        console.error('Error al crear post comentario', err)
      }
    }
  })
  return { createPost: mutate, error, data, isSuccess, isPending }
}

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

//flujo like y bookmark

export const useBookmarkPost = (postID: string) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => api.post.bookmark(postID),
    onSuccess: async (data) => {
      try {
        console.log('Agregado a favoritos con exito', data)
        queryClient.invalidateQueries({
          queryKey: ['posts']
        })

        queryClient.invalidateQueries({
          queryKey: ['bookmarked']
        })

        queryClient.invalidateQueries({
          queryKey: ['archived']
        })
      } catch (err) {
        console.error('error al agregar a favoritos', err)
      }
    }
  })
  return { bookMark: mutate }
}

export const useLikePost = (postID: string) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => api.post.like(postID),
    onSuccess: async (data) => {
      try {
        console.log('Exito al darle like', data)
        queryClient.invalidateQueries({
          queryKey: ['posts']
        })

        queryClient.invalidateQueries({
          queryKey: ['bookmarked']
        })

        queryClient.invalidateQueries({
          queryKey: ['archived']
        })
      } catch (err) {
        console.error('error al dar like', err)
      }
    }
  })
  return { like: mutate }
}

export const useSearch = (page: number, query: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', page, query],
    queryFn: () => api.post.list(page, undefined, undefined, undefined, undefined, query)
  })

  return { results: data, isLoading, error }
}

export const useDiscover = (page: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['discover', page],
    queryFn: () => api.post.list(page, undefined, undefined, undefined, true)
  })

  return { discover: data, isLoading, error }
}

export const useCommentsList = (postID: string | string[]) => {
  const { data, isLoading, error } = useQuery<CommentsResponse>({
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
