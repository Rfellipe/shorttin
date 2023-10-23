import prisma from '../../../../prisma/prisma'

export class UserFunctions {
  async createUser(body): Promise<any> {
    const { username, email, password, passwordConfirmation } = body
    console.log(body)

    const confirmUser = this.vefifyCredentials(username, email)

    if (!confirmUser) {
      return 'Account alredy exists!'
    }

    if (password !== passwordConfirmation) {
      return `Passwords don't match!`
    } 
    
    const hashPass = await Bun.password.hash(password)
    
    await prisma.users.create({
      data: {
        email,
        username,
        password: hashPass
      }
    })

    return 'User created sucessfully!'
  }

  private async vefifyCredentials(username: string, email: string) {
    const verifyUsername = await prisma.users.findUnique({
      where: {
        username
      }
    })

    const verifyEmail = await prisma.users.findUnique({
      where: {
        email
      }
    })

    if (verifyEmail !== null) {
      return false
    } else if (verifyUsername !== null) {
      return false
    }

    return true
  }
}
