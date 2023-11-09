const fs = require("fs")
require("dotenv").config()

const db = require("./connect")

const sql = fs.readFileSync("./database/setup.sql").toString()

(async () => {
  try {
    await db.query(sql)
    db.end()
    console.log("Database seeded")
  } catch (err) {
    console.log(err)
  }
})()
