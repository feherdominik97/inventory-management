import sqlite3 from 'sqlite3'
import { defineEventHandler } from 'h3'

const dbName = process.env.DB_NAME || './inventory.db'
const db = new sqlite3.Database(dbName)

export default defineEventHandler(async (event) => {
    return new Promise((resolve, reject) => {
        const { id } = event.context.params

        if(!Number.isInteger(parseInt(id)))
            reject({ statusCode: 500, statusMessage: 'Error fetching item' })

        db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject({ statusCode: 500, statusMessage: 'Error fetching item' })
            }
            if (!row) {
                reject({ statusCode: 404, statusMessage: 'Item not found' })
            }
            resolve(row)
        })
    })
})