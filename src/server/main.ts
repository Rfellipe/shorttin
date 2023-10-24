import Elysia from "elysia";
import { UserController } from "./controllers/users/userController";
import { UserFunctions } from "./services/users/userService";

const app = new Elysia()

new UserController(app, new UserFunctions)

app.listen(4000)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);