import prisma from '../../../../prisma/prisma'

export class UserFunctions {
  private error: number

  async createUser(body): Promise<any> {
    const { username, email, password, passwordConfirmation } = body
    this.error = 0
    try {
      const usernameValidation = await this.validateUsername(username)

      if (usernameValidation !== null) {
        this.error += 1
      }

      const emailValidation = await this.validateEmail(username)

      if (emailValidation !== null) {
        this.error += 2
      }

      if (password !== passwordConfirmation) {
        this.error += 4
      }

      switch (this.error) {
        case 0:
          const hashPass = await Bun.password.hash(password)

          await prisma.users.create({
            data: {
              email,
              username,
              password: hashPass
            }
          })
          return 'User created successfully!'
        case 1:
          return 'Username alredy registered!'
        case 2:
          return 'Email alredy registered!'
        case 3:
          return 'Username and email alredy registered!'
        case 4:
          return 'Passowords does not match!'
        case 5:
          return 'Passowords does not match and username alredy registered!'
        case 6:
          return 'Passowords does not match and email alredy registered!'
        case 7:
          return 'Passowords does not match and username and email alredy registered!'
        default:
          return this.error
      }
    } catch (error) {
      throw error
    }
  }

  async loginUser(body): Promise<any> {
    const { username, email, password } = body

    const usernameValidation = await this.validateUsername(username)
    const emailValidation = await this.validateEmail(email)
    
    if (usernameValidation === null || emailValidation === null) {
      return false
    }

    const pass = await Bun.password.verify(password, usernameValidation.password)

    if (!pass) {
      return false
    }

    delete usernameValidation.password

    return usernameValidation
  }

  private async validateUsername(username: string) {
    return await prisma.users.findUnique({
      where: {
        username
      }
    })
  }

  private async validateEmail(email: string) {
    return await prisma.users.findUnique({
      where: {
        email
      },
      select: {
        email: true
      }
    })
  }
}
