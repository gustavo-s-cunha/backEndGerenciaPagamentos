import { CreateClientService } from "../../modules/clients/services/CreateClientService"
import { UpdateClientService } from "../../modules/clients/services/UpdateClientService"

describe("ClientService", () => {

  describe("Create Client", () => {
    it("Deve criar um cliente", async () => {
      const service = new CreateClientService()

      const client = await service.execute({
        name:"tester2",
        email:"tester2@email.com"
      })

      expect(client).toHaveProperty("id")
    })
  })

  describe("Update Client", () => {
    it("Deve atualizar cliente", async () => {
      const createService = new CreateClientService()

      const cliente = await createService.execute({
        name:"new tester",
        email:"newtester@email.com"
      })

      const updateService = new UpdateClientService()

      const updated = await updateService.execute({
        id: cliente.id,
        name: "new tester atualizado",
        email: "newtester@email.com"
      })

      expect(updated.name).toBe("new tester atualizado")
    })
  })
})