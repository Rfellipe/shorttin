import { LinkFunctions } from "@/server/services/links/linkService";
import Elysia from "elysia";

export class LinkController {
  constructor(
    readonly server: Elysia,
    private readonly linkFunctions: LinkFunctions
  ) {
    server.post('/link', async ({ body }) => {
      return await this.linkFunctions.createNewLinks(body)
    })
  }
}