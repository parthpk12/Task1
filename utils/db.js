const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Parth12@patel",
  database: "product_test",
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
