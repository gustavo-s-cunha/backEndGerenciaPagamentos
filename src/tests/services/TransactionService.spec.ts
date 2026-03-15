import { GetProductsService } from "../../modules/products/services/getProductsService"
import { ChargeBackTransactionService } from "../../modules/transactions/services/ChargeBackTransactionService"
import { CreateTransactionService } from "../../modules/transactions/services/CreateTransactionService"

describe("TransactionService", ()=>{
  let products: any
  beforeAll(async () => {
    const service = new GetProductsService()
    products = await service.execute()
  })

  it("Deve criar a transaction", async ()=>{
    const service = new CreateTransactionService()

    const transaction = await service.execute({
      name: "tester",
      email: "tester@email.com",
      cardNumber: "5569000000006063",
      cvv: "010",
      type: "Purchase",
      status: "pending",
      products: [
        {
          id_product: products[0].id,
          price: 500,
          quantity: 1
        },
        {
          id_product: products[1].id,
          price: 250,
          quantity: 2
        }
      ]
    })

    expect(transaction).toHaveProperty("id")
  })


  it("Deve realizar o chargeback da transação", async () => {
    const createService = new CreateTransactionService()
    const chargebackService = new ChargeBackTransactionService()

    const transactionRoll = await createService.execute({
      name: "tester",
      email: "tester@email.com",
      cardNumber: "5569000000006063",
      cvv: "010",
      type: "Purchase",
      status: "ready",
      products: [
        {
          id_product: products[0].id,
          price: 500,
          quantity: 1
        },
        {
          id_product: products[1].id,
          price: 235,
          quantity: 2
        }
      ]
    })
    const result = await chargebackService.execute(transactionRoll)

    expect(result.type).toBe("charge_back")
  })
})