import sqlite3 from 'sqlite3'
import { defineEventHandler } from 'h3'

const dbName = process.env.DB_NAME || './inventory.db'
const db = new sqlite3.Database(dbName)

export default defineEventHandler(async (event) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM items", [], (err, rows) => {
            if (err) {
                reject({ status: 500, statusMessage: "Error fetching items" })
            }
            resolve(rows)
        })
    })
})
