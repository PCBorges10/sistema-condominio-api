import { FastifyInstance } from 'fastify'
import { db } from '../database/connection.js'

export async function condominiosRoutes(app: FastifyInstance) {
  app.get('/condominios', async () => {
    const [rows] = await db.query('SELECT * FROM condominios')

    return rows
  })
}