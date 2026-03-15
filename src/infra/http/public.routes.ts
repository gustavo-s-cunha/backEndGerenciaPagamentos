import { Router } from "express"
import { AuthControllAcess } from "../../modules/auth/ControllAcess"
import { TransactionsController } from "../../modules/transactions/controllers/TransactionsController"

const router = Router()

const authController = new AuthControllAcess()
const transactionsController = new TransactionsController()

router.post("/login", authController.login)

router.post(
  "/transactions/purchase",
  transactionsController.create
)

export default router