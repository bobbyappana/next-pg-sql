import { db } from "@vercel/postgres";

export default async function executeQuery(query, values = []) {
  // console.log("DB query", query, values);
  try {
    const client = await db.connect();

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
