import Elysia from 'elysia'
import cors from '@elysiajs/cors'
import { UserController } from './controllers/users/userController'
import { UserFunctions } from './services/users/userService'
import { LinkController } from './controllers/links/linkController.'
import { LinkFunctions } from './services/links/linkService'

const app = new Elysia()

new UserController(app, new UserFunctions())
new LinkController(app, new LinkFunctions())

app.use(cors()).listen(4000)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
)
