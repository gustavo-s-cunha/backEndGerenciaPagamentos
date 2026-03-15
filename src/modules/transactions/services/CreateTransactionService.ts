import { GatewaySelectorService } from "../../gateways/services/GatewaySelectorService"
import { TransactionsRepository } from "../repositories/TransactionsRepository"

export class CreateTransactionService {
  private transactionRepository = new TransactionsRepository()
  private gatewaySelector = new GatewaySelectorService()

  constructor() {
    this.transactionRepository = new TransactionsRepository()
    this.gatewaySelector = new GatewaySelectorService()
  }

  async execute(data:any) {
    // const gateway = await this.gatewaySelector.processTransaction(data)
    // if (!gateway) {
    //   throw new Error("No active gateway")
    // }
    
    if (!data.cvv || data.cvv === "100" || data.cvv === "200") {
      throw new Error("Dados do cartão inválidos")
    }

    type ProductPurchase = {
      product_id: string
      price: number
      quantity: number
    }

    const amount =
      data.products?.reduce(
        (total: number, r: ProductPurchase) =>
          total + r.price * r.quantity,
        0
      ) || 0

    const transaction = await this.transactionRepository.create({
      name: data.name,
      email: data.email,
      external_id: null,
      gateway: "Gateway 1",//gateway.name,
      status: data.status || 'pending',
      amount: amount,
      card_last_numbers: data.cardNumber.slice(-4),
      type: data.type || 'payment',
      products: data.products || []
    })

    return transaction
  }
}