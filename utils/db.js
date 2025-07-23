const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
  console.log("Using PostgreSQL database configuration.");
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      logging: false,
    }
  );
  console.log("Using MySQL database configuration (local).");
}
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { connectDB, sequelize };

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
