import Fastify from 'fastify'
import cors from '@fastify/cors'
import { condominiosRoutes } from './routes/condominios.routes.js'
import { unidadesRoutes } from './routes/unidades.routes.js'
import { moradoresRoutes } from './routes/moradores.routes.js'

const app = Fastify({ logger: true })

app.register(cors, {
  origin: [
    'http://localhost:3001',
    'http://127.0.0.1:3001'
  ],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

app.register(condominiosRoutes)
app.register(unidadesRoutes)
app.register(moradoresRoutes)

app.get('/', async () => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await app.listen({ port: 3000, host: 'localhost' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()