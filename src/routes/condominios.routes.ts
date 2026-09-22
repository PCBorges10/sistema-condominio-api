import { FastifyInstance } from 'fastify'
import { db } from '../database/connection.js'

interface CondominioBody {
  nome: string
  cnpj: string
  endereco: string
  numero: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  telefone: string
  email: string
}

interface CondominioParams {
  id: string
}

export async function condominiosRoutes(app: FastifyInstance) {
  app.get('/condominios', async () => {
    const [rows] = await db.query('SELECT * FROM condominios')

    return rows
  })

  app.get<{ Params: CondominioParams }>('/condominios/:id', async (request, reply) => {
    const { id } = request.params

    const [rows] = await db.query(
      'SELECT * FROM condominios WHERE id = ?',
      [id]
    )

    return rows
  })
  app.put<{ Params: CondominioParams; Body: CondominioBody }>(
    '/condominios/:id',
    async (request, reply) => {
      const { id } = request.params
      const {
        nome,
        cnpj,
        endereco,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        telefone,
        email
      } = request.body
      await db.execute(
        `UPDATE condominios
   SET nome = ?, cnpj = ?, endereco = ?, numero = ?, bairro = ?,
       cidade = ?, estado = ?, cep = ?, telefone = ?, email = ?
   WHERE id = ?`,
        [
          nome,
          cnpj,
          endereco,
          numero,
          bairro,
          cidade,
          estado,
          cep,
          telefone,
          email,
          id
        ]
      )

      return reply.send({
        message: 'Condomínio atualizado com sucesso!'
      })
    }
  )
  app.delete<{ Params: CondominioParams }>('/condominios/:id', async (request, reply) => {
    const { id } = request.params

    await db.execute(
      'DELETE FROM condominios WHERE id = ?',
      [id]
    )

    return reply.send({
      message: 'Condomínio removido com sucesso!'
    })
  })
  app.post<{ Body: CondominioBody }>('/condominios', async (request, reply) => {
    const {
      nome,
      cnpj,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      telefone,
      email
    } = request.body

    await db.execute(
      `INSERT INTO condominios
  (nome, cnpj, endereco, numero, bairro, cidade, estado, cep, telefone, email)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        cnpj,
        endereco,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        telefone,
        email
      ]
    )

    return reply.status(201).send({
      message: 'Condomínio cadastrado com sucesso!'
    })
  })
}