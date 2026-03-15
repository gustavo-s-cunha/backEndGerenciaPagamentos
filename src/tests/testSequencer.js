import Sequencer from "@jest/test-sequencer"
// const Sequencer = require("@jest/test-sequencer").default

const order = [
  "UserService.spec.ts",
  "ClientService.spec.ts",
  "ProductService.spec.ts",
  "GatewayService.spec.ts",
  "TransactionService.spec.ts",
]

export default class CustomSequencer extends Sequencer {
  sort(tests) {
    return tests.sort((a, b) => {
      const aIndex = order.findIndex(name => a.path.includes(name))
      const bIndex = order.findIndex(name => b.path.includes(name))

      if (aIndex === -1 && bIndex === -1) return 0
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1

      return aIndex - bIndex
    })
  }
}