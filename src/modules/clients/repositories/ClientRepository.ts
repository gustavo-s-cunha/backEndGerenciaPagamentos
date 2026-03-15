import { db } from "../../../config/database"
import { v4 as uuid } from "uuid"

export class ClientRepository{
  async create(data:any){
    const client = {
      id: uuid(),
      name: data.name,
      email: data.email
    }
    await db("clients").insert(client)

    return client
  }

  async update(data:any){
    const client = {
      id: data.id,
      name: data.name,
      email: data.email
    }
    await db("clients").where({ id: data.id }).update(client)

    return client
  }

  async getClients(){
    return db("clients")
  }

  async getClientById(id: string){
    const client = await db("clients").where({ id }).first()
    return client || null
  }

  async getPurchases(clientId: string) {
    return db("clients as c")
      .join("transactions as t", "t.id_client", "c.id")
      .join("transaction_products as tp", "tp.transaction_id", "t.id")
      .join("products as p", "p.id", "tp.product_id")
      .where({
        "c.id": clientId,
        "t.type": "purchase"
      })
      .groupBy("t.id", "t.status", "t.amount", "t.gateway", "t.numeroCartao")
      .select(
        "t.id as transaction_id",
        "t.status",
        "t.amount",
        "t.gateway",
        "t.numeroCartao",
        db.raw(`
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', p.id,
              'name', p.name,
              'quantity', tp.quantity,
              'quantity', tp.price
            )
          ) as products
        `)
      )
  }
}