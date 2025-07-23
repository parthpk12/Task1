const mysql = require("mysql2/promise");
require("dotenv").config();


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.getConnection()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err.message));

module.exports = db;

//  async function main(){
//   const db = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Parth12@patel",
//     database: "product_test",
//   });
//   console.log("DB connected");
//   return db;
//  }

// module.exports = main;
