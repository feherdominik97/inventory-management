import { defineEventHandler } from 'h3'
import sqlite3 from 'sqlite3'
import { readBody } from 'h3'

const db = new sqlite3.Database('./inventory.db')

export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const body = await readBody(event)

    return new Promise((resolve, reject) => {
        let query = 'UPDATE items SET '
        let values = []
        let updates = []

        if (body.name) {
            updates.push('name = ?')
            values.push(body.name)
        }
        if (body.quantity !== undefined) {
            updates.push('quantity = ?')
            values.push(body.quantity)
        }
        if (body.image_url) {
            updates.push('image_url = ?')
            values.push(body.image_url)
        }

        if (updates.length === 0) {
            return reject({ statusCode: 400, message: 'No fields provided for update' })
        }

        query += updates.join(', ') + ' WHERE id = ?'
        values.push(id)

        const stmt = db.prepare(query)
        stmt.run(values, function (err) {
            if (err) {
                reject({ statusCode: 500, message: 'Error updating item' })
            }
            if (this.changes === 0) {
                reject({ statusCode: 404, message: 'Item not found' })
            }
            resolve({ id, ...body })
        })
        stmt.finalize()
    })
})
