import { hashPassword } from "../../../shared/utils/hash"
import { UserRepository } from "../repositories/UserRepository"

export class CreateUserService {
  private usersRepository: UserRepository

  constructor() {
    this.usersRepository = new UserRepository()
  }

  async execute(data: any) {
    const passwordHash = await hashPassword(data.password)

    const user = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
      role: data.role
    })

    return user
  }
}