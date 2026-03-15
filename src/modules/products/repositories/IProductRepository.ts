import { Product } from "../entities/Product"
import { CreateProductDTO } from "../dtos/CreateProductDTO"

export interface IProductRepository{
  create(data:CreateProductDTO):Promise<Product>
  getProducts():Promise<Product[]>
  getProductById(id: string):Promise<Product | null>
  update(data:CreateProductDTO):Promise<Product>
}