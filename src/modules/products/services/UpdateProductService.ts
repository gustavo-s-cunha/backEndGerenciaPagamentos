import { ProductRepository } from "../repositories/ProductRepository"

export class UpdateProductService{
  async execute(data:any){
    const repo = new ProductRepository()
    const product = await repo.update(data)
    return product
  }
}