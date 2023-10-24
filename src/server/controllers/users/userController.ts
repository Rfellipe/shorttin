import { UserFunctions } from '@/server/services/users/userService'
import Elysia from 'elysia'

export class UserController {
  constructor(
    readonly server: Elysia,
    private readonly userFunctions: UserFunctions
  ) {
    server.post('/signup', async ({ body }) => {
      return this.userFunctions.createUser(body)
    })
    server.post('/signin', async ({body}) => {
      return this.userFunctions.loginUser(body)
    })
  }
}
