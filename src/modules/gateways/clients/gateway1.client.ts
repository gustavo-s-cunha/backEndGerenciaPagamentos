import axios from "axios"

export class Gateway1Client {
  private baseURL = "http://localhost:3001"

  async login() {
    const response = await axios.post(`${this.baseURL}/login`, {
      email: process.env.GATEWAY_EMAIL,
      token: process.env.GATEWAY_TOKEN
    })

    return response.data.token
  }

  async createTransaction(data: any) {
    const token = await this.login()

    const response = await axios.post(
      `${this.baseURL}/transactions`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  }
}