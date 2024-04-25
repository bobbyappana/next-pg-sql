import { Pool } from "pg";

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_PG_USER,
  host: process.env.NEXT_PUBLIC_PG_HOST,
  database: process.env.NEXT_PUBLIC_PG_DATABASE,
  password: process.env.NEXT_PUBLIC_PG_PASSWORD,
  port: process.env.NEXT_PUBLIC_PORT,
});

export default async function executeQuery(query, values = []) {
  // console.log("DB query", query, values);
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      // console.log("DB result", result);
      return result;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
