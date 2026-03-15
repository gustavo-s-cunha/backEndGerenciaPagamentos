import { ClientRepository } from "../repositories/ClientRepository"

export class GetClientsService {
  async execute(){
    const repo = new ClientRepository()

    return repo.getClients()
  }
}