import { Router } from "express"
import { TransactionsController } from "../controllers/TransactionsController"

const router = Router()
const controller = new TransactionsController()

router.post("/", controller.create)
router.get("/", controller.getTransactions)
router.get("/:id", controller.getTransactionById)

router.post("/:id/charge_back", controller.chargeBack)

export default router