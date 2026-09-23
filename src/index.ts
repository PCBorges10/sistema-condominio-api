import Fastify from 'fastify'
import { condominiosRoutes } from './routes/condominios.routes.js'
import { unidadesRoutes } from './routes/unidades.routes.js'
import { moradoresRoutes } from './routes/moradores.routes.js'

const app = Fastify({ logger: true })

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