import { FastifyInstance } from 'fastify'
import { db } from '../database/connection.js'

interface MoradorBody {
    nome: string
    cpf: string
    telefone: string
    email: string
    tipo: string
    unidade_id: number
}

interface MoradorParams {
    id: string
}
export async function moradoresRoutes(app: FastifyInstance) {
    app.get('/moradores', async () => {
        const [rows] = await db.query('SELECT * FROM moradores')

        return rows
    })
    app.get<{ Params: MoradorParams }>('/moradores/:id', async (request, reply) => {
        const { id } = request.params

        const [rows] = await db.query(
            'SELECT * FROM moradores WHERE id = ?',
            [id]
        )

        return rows
    })
    app.put<{ Params: MoradorParams; Body: MoradorBody }>(
        '/moradores/:id',
        async (request, reply) => {
            const { id } = request.params

            const {
                nome,
                cpf,
                telefone,
                email,
                tipo,
                unidade_id
            } = request.body

            await db.execute(
                `UPDATE moradores
       SET nome = ?, cpf = ?, telefone = ?, email = ?, tipo = ?, unidade_id = ?
       WHERE id = ?`,
                [
                    nome,
                    cpf,
                    telefone,
                    email,
                    tipo,
                    unidade_id,
                    id
                ]
            )

            return reply.send({
                message: 'Morador atualizado com sucesso!'
            })
        }
    )
    app.delete<{ Params: MoradorParams }>('/moradores/:id', async (request, reply) => {
        const { id } = request.params

        await db.execute(
            'DELETE FROM moradores WHERE id = ?',
            [id]
        )

        return reply.send({
            message: 'Morador removido com sucesso!'
        })
    })
    app.post<{ Body: MoradorBody }>('/moradores', async (request, reply) => {
        const {
            nome,
            cpf,
            telefone,
            email,
            tipo,
            unidade_id
        } = request.body

        await db.execute(
            `INSERT INTO moradores
    (nome, cpf, telefone, email, tipo, unidade_id)
    VALUES (?, ?, ?, ?, ?, ?)`,
            [
                nome,
                cpf,
                telefone,
                email,
                tipo,
                unidade_id
            ]
        )

        return reply.status(201).send({
            message: 'Morador cadastrado com sucesso!'
        })
    })
}
