import { Request, Response } from "express"
import { CreateTransactionService } from "../services/CreateTransactionService"
import { GetTransactionsService } from "../services/getTransactionsService"
import { GetTransactionByIdService } from "../services/getTransactionByIdService"
import { ChargeBackTransactionService } from "../services/ChargeBackTransactionService"

export class TransactionsController {
  async create(req:Request,res:Response){
    const service = new CreateTransactionService()
    const transaction = await service.execute(req.body)

    return res.json(transaction)
  }

  async getTransactions(req: Request, res: Response) {
    const service = new GetTransactionsService()
    const clients = await service.execute()

    return res.json(clients)
  }

  async getTransactionById(req: Request, res: Response) {
    const service = new GetTransactionByIdService()
    const client = await service.execute(req.params.id)

    return res.json(client)
  }

  async chargeBack(req:Request,res:Response){
    const service = new ChargeBackTransactionService()
    const transaction = await service.execute(req.body)

    return res.json(transaction)
  }
}