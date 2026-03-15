import { Router } from "express"
import { ClientsController } from "../controllers/ClientController"

const router = Router()
const controller = new ClientsController()

router.post("/", (req,res)=>controller.create(req,res))

router.get("/", controller.getClients)

router.get("/:id", controller.getById)

router.get("/:id/purchases", controller.purchases)

router.post("/update", (req,res)=>controller.update(req,res))


export default router