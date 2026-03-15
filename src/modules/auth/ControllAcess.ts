import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { db } from "../../config/database"

export class AuthControllAcess {
  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await db("users")
      .where({ email })
      .first()

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials"
      })
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials"
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d"
      }
    )

    return res.json({
      token
    })
  }
}