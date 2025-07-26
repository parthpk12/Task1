const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL, // for Render PostgreSQL
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  // fallback if DATABASE_URL not set (for local)
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect()
  .then(() => console.log("✅ PostgreSQL DB connected"))
  .catch((err) =>
    console.error("❌ PostgreSQL connection error:", err.message)
  );

module.exports = db;

// const mysql = require("mysql2/promise");
// require("dotenv").config();

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// db.getConnection()
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.error("DB connection error:", err.message));

// module.exports = db;
