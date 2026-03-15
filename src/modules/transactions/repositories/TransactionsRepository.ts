import { db } from "../../../config/database"
import { v4 as uuid } from "uuid"

export class TransactionsRepository {

  async create(data: any) {
    return await db.transaction(async (trx) => {

      const client = await trx("clients")
        .where("email", data.email)
        .first()

      if (!client) {
        throw new Error("Client not found")
      }

      const transactionId = uuid()
      await trx("transactions")
        .insert({
          id: transactionId,
          id_client: client.id,
          external_id: null,
          gateway: data.gateway,
          status: data.status || "pending",
          amount: data.amount,
          card_last_numbers: data.card_last_numbers,
          type: data.type || ""
        })

      const transactionProducts = await Promise.all(
        data.products.map(async (p: any) => {

          await trx("products")
            .where({ id: p.id_product })
            .decrement("amount", p.quantity)

          return {
            transaction_id: transactionId,
            product_id: p.id_product,
            price: p.price,
            quantity: p.quantity
          }
        })
      )

      await trx("transaction_products").insert(transactionProducts)

      const transaction = await trx("transactions")
        .where("id", transactionId)
        .first()

      return transaction
    })
  }

  async getTransactions() {
    return db("transactions as t")
      .join("clients as c", "t.id_client", "c.id")
      .join("transaction_products as tp", "tp.transaction_id", "t.id")
      .join("products as p", "p.id", "tp.product_id")
      .groupBy("t.id")
      .select(
        "t.id as transaction_id",
        "c.name as name",
        "c.email as email",
        "t.numeroCartao",
        "t.status",
        "t.amount",
        "t.gateway",
        db.raw(`
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', p.id,
              'name', p.name,
              'quantity', tp.quantity,
              'quantity', tp.price
            )
          ) as products
        `)
      )
  }

  async getTransactionById(id: string) {
    return db("transactions as t")
      .join("clients as c", "t.id_client", "c.id")
      .join("transaction_products as tp", "tp.transaction_id", "t.id")
      .join("products as p", "p.id", "tp.product_id")
      .where({
        "t.id": id,
      })
      .groupBy("t.id")
      .select(
        "t.id as transaction_id",
        "c.name as name",
        "c.email as email",
        "t.numeroCartao",
        "t.status",
        "t.amount",
        "t.gateway",
        db.raw(`
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', p.id,
              'name', p.name,
              'quantity', tp.quantity,
              'quantity', tp.price
            )
          ) as products
        `)
      )
  }

  async chargeBack(id: string) {
    return await db.transaction(async (trx) => {
      const transaction = await trx("transactions")
        .where({ id })
        .first()

      if (!transaction) {
        throw new Error("Transaction not found")
      }

      const products = await trx("transaction_products")
        .where({ transaction_id: id })

      await Promise.all(
        products.map(async (p: any) => {
          await trx("products")
            .where({ id: p.product_id })
            .increment("amount", p.quantity)
        })
      )

      await trx("transactions")
        .where({ id })
        .update({ status: "charged_back" })

      // criar registro auxiliar para o "estorno"
      const transactionId = uuid()
      await trx("transactions")
        .insert({
          id: transactionId,
          id_client: transaction.id_client,
          external_id: transaction.id,
          gateway: transaction.gateway,
          status: "charged_back",
          amount: transaction.amount,
          card_last_numbers: transaction.card_last_numbers,
          type: "charge_back"
        })

      const newTransaction = await trx("transactions")
        .where("id", transactionId)
        .first()

      return newTransaction
    })
  }
}