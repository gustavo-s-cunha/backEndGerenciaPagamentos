import { ClientRepository } from "../repositories/ClientRepository"

export class GetClientByIdService {
  async execute(id: string){
    const repo = new ClientRepository()

    return repo.getClientById(id)
  }
}