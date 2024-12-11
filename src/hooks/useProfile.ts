import { SpotSeekerAPI } from '../api'
import { useQuery } from '@tanstack/react-query'

const api = new SpotSeekerAPI()

export const useUserProfile = (username: string) => {
  const { data } = useQuery({
    queryKey: [username],
    queryFn: () => api.user.getByUsername(username)
  })
  return { profile: data }
}

export const userListFollowers = (page: number, username: string) => {
  const { data } = useQuery({
    queryKey: ['followers', page, username],
    queryFn: () => api.user.list(page, username)
  })

  return { followers: data }
}
export const useFollowingList = (page: number, username: string) => {
  const { data } = useQuery({
    queryKey: ['following', page, username],
    queryFn: () => api.user.followingList(page, username)
  })
  console.log(data)
  return { followers: data }
}
