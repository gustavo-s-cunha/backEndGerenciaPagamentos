import { Client } from "../entities/Client"
import { CreateClientDTO } from "../dtos/CreateClientDTO"

export interface IClientRepository{
  create(data:CreateClientDTO):Promise<Client>
  update(data:CreateClientDTO):Promise<Client>
  getClients():Promise<Client[]>
  getClientById(id: string):Promise<Client | null>
  getPurchases(id: string):Promise<[]>
}