import { Request, Response, NextFunction } from "express"
import { db } from "../../config/database"

export function roleMiddleware(roles: string[]) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized"
      })
    }
    const role = await db("roles")
      .where({ id: user.role_id })
      .first()

    if (!role || !roles.includes(role.name)) {
      return res.status(403).json({
        error: "Forbidden"
      })
    }

    return next()
  }
}