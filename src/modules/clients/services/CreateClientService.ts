import { ClientRepository } from "../repositories/ClientRepository"

export class CreateClientService{
  async execute(data:any){
    const repo = new ClientRepository()
    const client = await repo.create(data)
    return client
  }
}