import { UserFunctions } from '@/server/services/users/userService'
import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import Elysia from 'elysia'

export class UserController {
  constructor(
    readonly server: Elysia,
    private readonly userFunctions: UserFunctions
  ) {
    // SIGNUP ENDPOINT
    server.post('/signup', async ({ body }) => {
      return await this.userFunctions.createUser(body)
    })

    // SIGNIN ENFPOINT
    server
      .use(
        jwt({
          name: 'jwt',
          secret: process.env.TOKEN_KEY
        })
      )
      .use(cookie())
      .post('/signin', async ({ jwt, setCookie, set, body }) => {
        const response = await this.userFunctions.loginUser(body)
      
        if (!response) {
          set.status = 401
          return 'Unauthorized'
        }

        setCookie('auth', await jwt.sign(response), {
          httpOnly: true,
          maxAge: 7 * 86400
        })

        return 'Authorized'
      })
  }
}
