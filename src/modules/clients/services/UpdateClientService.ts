import { ClientRepository } from "../repositories/ClientRepository"

export class UpdateClientService{
  async execute(data:any){
    const repo = new ClientRepository()
    const client = await repo.update(data)
    return client
  }
}