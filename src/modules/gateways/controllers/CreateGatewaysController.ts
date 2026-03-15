import { Request, Response } from "express"
import { CreateGatewaysService } from "../services/CreateGatewaysService"

export class CreateGatewaysController{
  async handle(req:Request,res:Response){
    const service = new CreateGatewaysService()
    const gateways = await service.execute(req.body)
    return res.json(gateways)
  }
}