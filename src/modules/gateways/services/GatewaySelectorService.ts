import { GatewaysRepository } from "../repositories/GatewaysRepository"
import { Gateway1Client } from "../clients/gateway1.client"
import { Gateway2Client } from "../clients/gateway2.client"

export class GatewaySelectorService {
  private gatewayRepository = new GatewaysRepository()

  async processTransaction(data: any) {
    const gateways = await this.gatewayRepository.getActiveGateway()

    if (!gateways.length) {
      throw new Error("No active gateways")
    }

    for (const gateway of gateways) {
      try {
        if (gateway.name === "gateway 1") {
          const client = new Gateway1Client()
          return await client.createTransaction(data)
        }
        if (gateway.name === "gateway 2") {
          const client = new Gateway2Client()
          return await client.createTransaction(data)
        }
      } catch (error) {
        console.log(`Gateway ${gateway.name} failed`)
      }
    }

    throw new Error("All gateways failed")
  }
}