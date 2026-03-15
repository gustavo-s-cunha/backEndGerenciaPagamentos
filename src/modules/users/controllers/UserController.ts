import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService"
import { createUserValidator } from "../validators/CreateUserValidator"

export class UserController{
  async create(req:Request,res:Response){
    const data = await createUserValidator.validate(req.body)
    const service = new CreateUserService()
    const user = await service.execute(data)
    return res.json(user)
  }
}