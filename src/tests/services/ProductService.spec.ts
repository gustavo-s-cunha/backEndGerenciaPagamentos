import { CreateProductService } from "../../modules/products/services/CreateProductService"
import { UpdateProductService } from "../../modules/products/services/UpdateProductService"

describe("ProductService", ()=>{

  it("Deve criar o product", async ()=>{
    const service = new CreateProductService()

    const product = await service.execute({
      name: "Product 03",
      amount: 100,
      price: 100
    })

    expect(product).toHaveProperty("id")
  })
  
  it("Deve atualizar o produto", async ()=>{
    const serviceCreate = new CreateProductService()

    const product = await serviceCreate.execute({
      name: "Product 04",
      amount: 50,
      price: 300
    })

    const updateService = new UpdateProductService()

    const updated = await updateService.execute({
      id: product.id,
      name: "Product 04",
      amount: 100,
      price: 300
    })

    expect(updated.amount).toBe(100)
  })
})