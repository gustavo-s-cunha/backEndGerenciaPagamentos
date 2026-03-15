import { Request, Response } from "express"
import { CreateClientService } from "../services/CreateClientService"
import { createClientValidator } from "../validators/CreateClientValidator"
import { GetClientsService } from "../services/getClientsService"
import { GetClientByIdService } from "../services/getClientByIdService"
import { GetClientPurchasesService } from "../services/getClientPurchasesService"
import { UpdateClientService } from "../services/UpdateClientService"

export class ClientsController {
  async create(req:Request,res:Response){
    const data = await createClientValidator.validate(req.body)
    const service = new CreateClientService()
    const client = await service.execute(data)
    return res.json(client)
  }

  async update(req:Request,res:Response){
    const data = await createClientValidator.validate(req.body)
    const service = new UpdateClientService()
    const client = await service.execute(data)
    return res.json(client)
  }

  async getClients(req: Request, res: Response) {
    const service = new GetClientsService()
    const clients = await service.execute()

    return res.json(clients)
  }

  async getById(req: Request, res: Response) {
    const service = new GetClientByIdService()
    const client = await service.execute(req.params.id)

    return res.json(client)
  }

  async purchases(req: Request, res: Response) {
    const service = new GetClientPurchasesService()
    const purchases = await service.execute(req.params.id)

    return res.json(purchases)
  }
}