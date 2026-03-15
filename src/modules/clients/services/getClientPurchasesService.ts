import { ClientRepository } from "../repositories/ClientRepository"

export class GetClientPurchasesService {
  async execute(id: string){
    const repo = new ClientRepository()

    const client = await repo.getClientById(id)
    if (!client) {
      throw new Error("Client not found")
    }

    const purchases = await repo.getPurchases(id)
    const normalizedPurchases = purchases.map(r => ({
      ...r,
      products: typeof r.products === "string"
        ? JSON.parse(r.products || "[]")
        : r.products || []
    }))

    return {
      ...client,
      purchases: normalizedPurchases
    }
  }
}