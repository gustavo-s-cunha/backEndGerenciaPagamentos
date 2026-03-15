import { db } from "../../config/database"

export class RolesRepository {

  async findByName(name: string) {
    return db("roles")
      .where({ name })
      .first()
  }
}