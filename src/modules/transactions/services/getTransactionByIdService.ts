import { TransactionsRepository } from "../repositories/TransactionsRepository"

export class GetTransactionByIdService {
  async execute(id: string){
    const repo = new TransactionsRepository()

    const transaction = await repo.getTransactionById(id)
    const normalizedtransactions = transaction.map(r => ({
      ...r,
      products: typeof r.products === "string"
        ? JSON.parse(r.products)
        : r.products
    }))

    return normalizedtransactions[0]
  }
}