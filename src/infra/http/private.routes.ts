import { Router } from 'express'
import usersRouter from '../../modules/users/routes/users.routes'
import transactionsRoutes from '../../modules/transactions/routes/transactions.routes';
import clientsRoutes from '../../modules/clients/routes/clients.routes'
import productsRoutes from '../../modules/products/routes/products.routes'
import gatewaysRoutes from '../../modules/gateways/routes/gateways.routes'

import { authMiddleware } from "../../shared/middlewares/auth"
import { roleMiddleware } from "../../shared/middlewares/role"

const apiRouter = Router()

apiRouter.use(authMiddleware)

// private routes
apiRouter.use(
  "/users",
  roleMiddleware(["ADMIN"]),
  usersRouter
)

apiRouter.use(
  "/gateways",
  roleMiddleware(["ADMIN"]),
  gatewaysRoutes
)

apiRouter.use(
  "/products",
  roleMiddleware(["ADMIN", "MANAGER"]),
  productsRoutes
)
apiRouter.use(
  "/clients",
  roleMiddleware(["ADMIN", "MANAGER", "FINANCE"]),
  clientsRoutes
)
apiRouter.use(
  "/transactions",
  roleMiddleware(["ADMIN", "FINANCE"]),
  transactionsRoutes
)

export default apiRouter