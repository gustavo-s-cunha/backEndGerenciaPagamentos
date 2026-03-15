import { ProductRepository } from "../repositories/ProductRepository"

export class GetProductByIdService {
  async execute(id: string){
    const repo = new ProductRepository()

    return repo.getProductById(id)
  }
}