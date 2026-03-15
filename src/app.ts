import express from 'express'
import router from './infra/http/public.routes'
import apiRouter from './infra/http/private.routes'
import { errorHandler } from "./shared/middlewares/errorHandler"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json('API online');
});

app.use(router);
app.use(apiRouter);
app.use(errorHandler)

export default app