const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

console.log("Loaded DB URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Postgres connected!");
  } catch (err) {
    console.error("Postgres connection error:", err);
  }
};

module.exports = { pool, connectDB };
