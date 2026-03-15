import { Router } from "express"
import { CreateGatewaysController } from "../controllers/CreateGatewaysController"

const router = Router()
const controller = new CreateGatewaysController()

router.post("/", (req,res)=>controller.handle(req,res))

export default router