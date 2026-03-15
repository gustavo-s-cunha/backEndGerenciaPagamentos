import { ProductRepository } from "../repositories/ProductRepository"

export class CreateProductService{
  async execute(data:any){
    const repo = new ProductRepository()
    const product = await repo.create(data)
    return product
  }
}