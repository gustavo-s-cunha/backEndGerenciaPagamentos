import { GatewaysRepository } from "../repositories/GatewaysRepository"

export class CreateGatewaysService{
  async execute(data:any){
    const repo = new GatewaysRepository()
    const gateways = await repo.create(data)
    return gateways
  }
}