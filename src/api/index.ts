import { AuthService } from './auth'
import { PostService } from './post'
import { UserService } from './user'

export class SpotSeekerAPI {
  auth: AuthService
  user: UserService
  post: PostService

  constructor() {
    this.auth = new AuthService()
    this.user = new UserService()
    this.post = new PostService()
  }
}
