import prisma from '../../../../prisma/prisma'


export class LinkFunctions {
  async createNewLinks(body): Promise<any> {
    const { userID, url } = body
    const isValidUrl = this.validateURL(url)

    if (!isValidUrl) {
      return { res: 'invalid URL' }
    }

    const newLink = await this.createAndValidateNewURL()

    this.registerLinks(url, newLink, userID)

    return newLink
  }

  private validateURL(url: string) {
    try {
      new URL(url)
      return true
    } catch (error) {
      return false
    }
  }

  private async registerLinks(oldLink: string, newLink: string, userID: string) {
    const newLinkRegistering = await prisma.newLink.create({
      data: {
        url: newLink,
        clicks: 0,
        users: {
          connect: {
            id: userID
          }
        }
      }
    })

    await prisma.oldLink.create({
      data: {
        url: oldLink,
        newLink: {
          connect: {
            id: newLinkRegistering.id
          }
        }
      }
    })
  }

  private async createAndValidateNewURL() {
    const base =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    const result: string[] = []
    let newURL: string
    let isValid = true

    while(isValid) {
      for (let i = 0; i < 8; i++) {
        const letter = base.split('')[Math.floor(Math.random() * 61)]
  
        result.push(letter)
      }
  
      newURL = process.env.DOMAIN_NAME + result.join('')

      const validateNewURL = await prisma.newLink.findUnique({
        where: {
          url: newURL
        }
      })

      if (!validateNewURL) {
        isValid = false
      } else {
        isValid = true
      }
    }    
    return newURL
  }
}
