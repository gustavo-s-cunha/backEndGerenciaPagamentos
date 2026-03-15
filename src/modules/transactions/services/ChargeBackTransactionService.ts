import { TransactionsRepository } from "../repositories/TransactionsRepository"

export class ChargeBackTransactionService {
  async execute(data: any){
    const repo = new TransactionsRepository()

    const transaction = await repo.chargeBack(data.id)

    return transaction
  }
}