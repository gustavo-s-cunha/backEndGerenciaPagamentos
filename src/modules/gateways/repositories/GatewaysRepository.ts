import { db } from "../../../config/database"
import { v4 as uuid } from "uuid"

export class GatewaysRepository {
  async create(data:any){
    const gateway = {
      id: uuid(),
      name: data.name,
      is_active: data.is_active,
      priority: data.priority
    }
    await db("gateways").insert(gateway)

    return gateway
  }

  async getActiveGateway() {
    const gateway = await db("gateways")
      .where({ is_active: true })
      .orderBy("priority", "asc")

    return gateway
  }

  async getGateways() {
    return db("gateways")
  }
  
  async update(data:any) {
    await db("gateways")
      .where({ name: data.name })
      .update(data)

    const gateway = await db("gateways")
      .where({ name: data.name })
      .first()

    return gateway
  }
}