import { ProductRepository } from "../repositories/ProductRepository"

export class GetProductsService {
  async execute(){
    const repo = new ProductRepository()

    return repo.getProducts()
  }
}