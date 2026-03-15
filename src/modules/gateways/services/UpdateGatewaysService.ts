import { GatewaysRepository } from "../repositories/GatewaysRepository"

export class UpdateGatewaysService{
  async execute(data:any){
    const repo = new GatewaysRepository()
    const gateways = await repo.update(data)

    return gateways
  }
}