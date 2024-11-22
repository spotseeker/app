import { AuthService } from './auth'
import { CommentService } from './comment'
import { PostService } from './post'
import { UserService } from './user'

export class SpotSeekerAPI {
  auth: AuthService
  user: UserService
  post: PostService
  comment: CommentService

  constructor() {
    this.auth = new AuthService()
    this.user = new UserService()
    this.post = new PostService()
    this.comment = new CommentService()
  }
}
