import { CreateUserService } from "../../modules/users/services/CreateUserService"

describe("UserService", ()=>{

  it("Deve criar o user", async ()=>{
    const service = new CreateUserService()

    const user = await service.execute({
      name:"Dev2",
      email:"dev2@betalent.tech",
      password:"123456",
      role:"ADMIN"
    })

    expect(user).toHaveProperty("id")
  })
})