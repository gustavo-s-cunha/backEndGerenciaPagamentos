import { CreateGatewaysDTO } from "../dtos/CreateGatewaysDTO"
import { Gateways } from "../entities/Gateways"

export interface IGatewaysRepository{
  create(data:CreateGatewaysDTO):Promise<Gateways>
  update(data:any):Promise<Gateways>
  getActiveGateway():Promise<Gateways>
  getGateways():Promise<Gateways[]>
}