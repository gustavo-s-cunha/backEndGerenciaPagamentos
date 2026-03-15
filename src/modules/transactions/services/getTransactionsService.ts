import { TransactionsRepository } from "../repositories/TransactionsRepository"

export class GetTransactionsService {
  async execute(){
    const repo = new TransactionsRepository()

    const transactions = await repo.getTransactions()
    const normalizedtransactions = transactions.map(r => ({
      ...r,
      products: typeof r.products === "string"
        ? JSON.parse(r.products)
        : r.products
    }))

    return normalizedtransactions
  }
}