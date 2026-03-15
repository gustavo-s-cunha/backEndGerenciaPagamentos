import { Router } from "express"
import { UserController } from "../controllers/UserController"

const router = Router()
const controller = new UserController()

router.post("/", (req,res)=>controller.create(req,res))

export default router