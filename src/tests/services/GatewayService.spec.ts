import { CreateGatewaysService } from "../../modules/gateways/services/CreateGatewaysService"
import { UpdateGatewaysService } from "../../modules/gateways/services/UpdateGatewaysService"

describe("GatewaysService", ()=>{
  let serviceCreate: any
  let serviceUpdate: any
  beforeAll(async () => {
    serviceCreate = new CreateGatewaysService()
    serviceUpdate = new UpdateGatewaysService()
  })

  it("Deve criar o gateway", async ()=>{
    const gateway = await serviceCreate.execute({
      name: "gateway 2",
      is_active: true,
      priority: 2
    })

    expect(gateway).toHaveProperty("id")
  })

  it("Deve desativar o gateway", async ()=>{
    await serviceCreate.execute({
      name: "gateway 3",
      is_active: true,
      priority: 3
    })

    const gateway = await serviceUpdate.execute({
      name: "gateway 3",
      is_active: false
    })

    expect(gateway.is_active).toBe(0)
  })

  it("Deve atualizar a prioridade do gateway", async ()=>{
    await serviceCreate.execute({
      name: "gateway 4",
      is_active: false,
      priority: 4
    })

    const gateway = await serviceUpdate.execute({
      name: "gateway 4",
      priority: 2
    })

    expect(gateway.priority).toBe(2)
  })
})