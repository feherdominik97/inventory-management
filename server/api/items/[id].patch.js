import { defineEventHandler } from 'h3'
import sqlite3 from 'sqlite3'
import { readBody } from 'h3'

const db = new sqlite3.Database('./inventory.db')

export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const body = await readBody(event)

    return new Promise(async (resolve, reject) => {
        let query = 'UPDATE items SET '
        let values = []
        let updates = []

        if(!Number.isInteger(parseInt(id)))
            reject({ statusCode: 500, statusMessage: 'Error fetching item' })

        const promise = await $fetch(`/api/items/${id}`)
        const item = JSON.parse(JSON.stringify(promise))
        if(!body.force && body.last_updated < item.last_updated)
            reject({ statusCode: 409, statusMessage: 'Conflict in update' })

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
        if (body.last_updated) {
            updates.push('last_updated = ?')
            values.push(body.last_updated)
        }

        if (updates.length === 0) {
            return reject({ statusCode: 400, statusMessage: 'No fields provided for update' })
        }

        query += updates.join(', ') + ' WHERE id = ?'
        values.push(id)

        const stmt = db.prepare(query)
        stmt.run(values, function (err) {
            if (err) {
                reject({ statusCode: 500, statusMessage: 'Error updating item' })
            }
            if (this.changes === 0) {
                reject({ statusCode: 404, statusMessage: 'Item not found' })
            }
            resolve({ id, ...body })
        })
        stmt.finalize()
    })
})
