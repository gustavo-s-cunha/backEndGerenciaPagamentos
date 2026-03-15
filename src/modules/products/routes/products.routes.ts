import { Router } from "express"
import { ProductController } from "../controllers/ProductController"

const router = Router()
const controller = new ProductController()

router.post("/", (req,res)=>controller.create(req,res))

router.get("/", controller.getProducts)

router.get("/:id", controller.getById)

router.post("/update", (req,res)=>controller.update(req,res))

export default router