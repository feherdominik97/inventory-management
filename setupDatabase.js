import sqlite3 from "sqlite3";

const dbName = process.env.DB_NAME || './inventory.db';
const db = new sqlite3.Database(dbName)

const items = [
    { id: 1, name: "T-Shirt", image_url: "/images/t_shirts.jpg", quantity: 15 },
    { id: 2, name: "Jeans", image_url: "/images/t_shirts.jpg", quantity: 8 },
    { id: 3, name: "Sneakers", image_url: "/images/t_shirts.jpg", quantity: 20 },
    { id: 4, name: "Hoodie", image_url: "/images/t_shirts.jpg", quantity: 12 },
    { id: 5, name: "Cap", image_url: "/images/t_shirts.jpg", quantity: 25 },
    { id: 6, name: "Sunglasses", image_url: "/images/t_shirts.jpg", quantity: 18 },
    { id: 7, name: "Backpack", image_url: "/images/t_shirts.jpg", quantity: 10 },
    { id: 8, name: "Leather Wallet", image_url: "/images/t_shirts.jpg", quantity: 7 },
    { id: 9, name: "Watch", image_url: "/images/t_shirts.jpg", quantity: 5 },
    { id: 10, name: "Running Shoes", image_url: "/images/t_shirts.jpg", quantity: 14 },
    { id: 11, name: "Sweatpants", image_url: "/images/t_shirts.jpg", quantity: 9 },
    { id: 12, name: "Denim Jacket", image_url: "/images/t_shirts.jpg", quantity: 11 },
    { id: 13, name: "Scarf", image_url: "/images/t_shirts.jpg", quantity: 22 },
    { id: 14, name: "Beanie", image_url: "/images/t_shirts.jpg", quantity: 17 },
    { id: 15, name: "Flip Flops", image_url: "/images/t_shirts.jpg", quantity: 30 },
    { id: 16, name: "Sports Jacket", image_url: "/images/t_shirts.jpg", quantity: 6 },
    { id: 17, name: "Gloves", image_url: "/images/t_shirts.jpg", quantity: 13 },
    { id: 18, name: "Belt", image_url: "/images/t_shirts.jpg", quantity: 19 },
    { id: 19, name: "Tie", image_url: "/images/t_shirts.jpg", quantity: 16 },
    { id: 20, name: "Dress Shirt", image_url: "/images/t_shirts.jpg", quantity: 8 },
    { id: 21, name: "Cargo Pants", image_url: "/images/t_shirts.jpg", quantity: 9 },
    { id: 22, name: "Winter Coat", image_url: "/images/t_shirts.jpg", quantity: 5 },
    { id: 23, name: "Suit", image_url: "/images/t_shirts.jpg", quantity: 3 },
    { id: 24, name: "Vest", image_url: "/images/t_shirts.jpg", quantity: 12 },
    { id: 25, name: "Polo Shirt", image_url: "/images/t_shirts.jpg", quantity: 14 },
    { id: 26, name: "Cardigan", image_url: "/images/t_shirts.jpg", quantity: 7 },
    { id: 27, name: "Overalls", image_url: "/images/t_shirts.jpg", quantity: 4 },
    { id: 28, name: "Dress", image_url: "/images/t_shirts.jpg", quantity: 10 },
    { id: 29, name: "Tote Bag", image_url: "/images/t_shirts.jpg", quantity: 15 },
    { id: 30, name: "Sandals", image_url: "/images/t_shirts.jpg", quantity: 21 }
]

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS items`)
    db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

    const stmt = db.prepare('INSERT OR REPLACE INTO items (id, name, image_url, quantity) VALUES (?, ?, ?, ?)')

    items.forEach(item => {
        stmt.run(item.id, item.name, item.image_url, item.quantity)
    })

    stmt.finalize()
    console.log("Database seeded with items.")
})

db.close()
