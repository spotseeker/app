import { useQuery } from '@tanstack/react-query'
import { PostService } from '../api/post'
import { PostResponse } from '../types/post'

const posts = new PostService()
const getPostList = async (): Promise<PostResponse[]> => {
  return posts.list(1)
}

export const usePostList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPostList
  })

  return { postData: data, error, isLoading }
}
