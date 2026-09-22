import { FastifyInstance } from 'fastify'
import { db } from '../database/connection.js'

interface UnidadeBody {
    numero: string
    bloco: string
    andar: number
    condominio_id: number
}

interface UnidadeParams {
    id: string
}
export async function unidadesRoutes(app: FastifyInstance) {
    app.get('/unidades', async () => {
        const [rows] = await db.query('SELECT * FROM unidades')

        return rows
    })
    app.get<{ Params: UnidadeParams }>('/unidades/:id', async (request, reply) => {
        const { id } = request.params

        const [rows] = await db.query(
            'SELECT * FROM unidades WHERE id = ?',
            [id]
        )

        return rows
    })

    app.put<{ Params: UnidadeParams; Body: UnidadeBody }>(
        '/unidades/:id',
        async (request, reply) => {
            const { id } = request.params
            const {
                numero,
                bloco,
                andar,
                condominio_id
            } = request.body

            await db.execute(
                `UPDATE unidades
       SET numero = ?, bloco = ?, andar = ?, condominio_id = ?
       WHERE id = ?`,
                [
                    numero,
                    bloco,
                    andar,
                    condominio_id,
                    id
                ]
            )

            return reply.send({
                message: 'Unidade atualizada com sucesso!'
            })
        }
    )
    app.delete<{ Params: UnidadeParams }>('/unidades/:id', async (request, reply) => {
        const { id } = request.params

        await db.execute(
            'DELETE FROM unidades WHERE id = ?',
            [id]
        )

        return reply.send({
            message: 'Unidade removida com sucesso!'
        })
    })
    app.post<{ Body: UnidadeBody }>('/unidades', async (request, reply) => {
        const {
            numero,
            bloco,
            andar,
            condominio_id
        } = request.body

        await db.execute(
            `INSERT INTO unidades
    (numero, bloco, andar, condominio_id)
    VALUES (?, ?, ?, ?)`,
            [
                numero,
                bloco,
                andar,
                condominio_id
            ]
        )

        return reply.status(201).send({
            message: 'Unidade cadastrada com sucesso!'
        })
    })
}
