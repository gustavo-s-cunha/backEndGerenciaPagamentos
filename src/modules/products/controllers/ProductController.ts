import { Request, Response } from "express"
import { CreateProductService } from "../services/CreateProductService"
import { createProductValidator } from "../validators/CreateProductValidator"
import { UpdateProductService } from "../services/UpdateProductService"
import { GetProductsService } from "../services/getProductsService"
import { GetProductByIdService } from "../services/getProductByIdService"

export class ProductController{
  async create(req:Request,res:Response){
    const data = await createProductValidator.validate(req.body)
    const service = new CreateProductService()
    const product = await service.execute(data)
    return res.json(product)
  }

  async update(req:Request,res:Response){
    const data = await createProductValidator.validate(req.body)
    const service = new UpdateProductService()
    const product = await service.execute(data)
    return res.json(product)
  }

  async getProducts(req: Request, res: Response) {
    const service = new GetProductsService()
    const products = await service.execute()

    return res.json(products)
  }

  async getById(req: Request, res: Response) {
    const service = new GetProductByIdService()
    const product = await service.execute(req.params.id)

    return res.json(product)
  }
}