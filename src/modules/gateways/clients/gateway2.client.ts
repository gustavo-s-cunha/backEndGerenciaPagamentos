import axios from "axios"

export class Gateway2Client {
  private baseURL = "http://localhost:3002"

  async createTransaction(data: any) {
    const res = await axios.post(
      `${this.baseURL}/transacoes`,
      data,
      {
        headers: {
          "Gateway-Auth-Token": process.env.GATEWAY_TOKEN2,
          "Gateway-Auth-Secret": process.env.GATEWAY_SECRET
        }
      }
    )

    return res.data
  }
}