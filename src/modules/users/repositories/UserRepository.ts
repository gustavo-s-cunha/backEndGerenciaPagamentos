import { db } from "../../../config/database"
import { v4 as uuid } from "uuid"

export class UserRepository{
  async create(data:any){
    const role = await db("roles")
      .where({ name: data.role })
      .first()

    if (!role) {
      throw new Error("Role not found")
    }

    const user = {
      id: uuid(),
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: role.id
    }
    await db("users").insert(user)

    return user
  }
}