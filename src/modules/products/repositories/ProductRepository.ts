import { db } from "../../../config/database"
import { v4 as uuid } from "uuid"

export class ProductRepository{
  async create(data:any){
    const product = {
      id: uuid(),
      name: data.name,
      amount: data.amount,
      price: data.price
    }
    await db("products").insert(product)

    return product
  }

  async getProducts(){
    return db("products")
  }

  async getProductById(id: string){
    const product = await db("products").where({ id }).first()
    return product || null
  }
  
  async update(data:any){
    const product = {
      id: data.id,
      name: data.name,
      amount: data.amount,
      price: data.price
    }
    await db("products").where({ id: data.id }).update(product)

    return product
  }
}