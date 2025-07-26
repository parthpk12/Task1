const db = require("./db");

const init = async () => {
  try {
    // Create users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100)
      );
    `);

    // Create roles table
    await db.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100)
      );
    `);

    // Create user_roles table
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_roles (
        user_id INT,
        role_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
      );
    `);

    // Create products table
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        description TEXT,
        price DECIMAL(10,2)
      );
    `);

    // Create stock table
    await db.query(`
      CREATE TABLE IF NOT EXISTS stock (
        id SERIAL PRIMARY KEY,
        product_id INT,
        quantity INT,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);

    // Insert roles if not already inserted
    await db.query(`
      INSERT INTO roles (title)
      SELECT title FROM (VALUES 
        ('Admin'), 
        ('Product manager'), 
        ('Order manager')
      ) AS new_roles(title)
      WHERE NOT EXISTS (
        SELECT 1 FROM roles WHERE roles.title = new_roles.title
      );
    `);

    console.log("✅ Tables created and roles inserted");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error initializing DB:", err.message);
    process.exit(1);
  }
};

init();
