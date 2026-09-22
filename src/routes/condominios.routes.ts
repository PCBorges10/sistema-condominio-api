import { FastifyInstance } from 'fastify'

export async function condominiosRoutes(app: FastifyInstance) {
  app.get('/condominios', async () => {
    return []
  })
}