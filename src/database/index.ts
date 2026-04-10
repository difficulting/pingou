import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const POSTGRES_URL = process.env.POSTGRES_URL;

if (!POSTGRES_URL) {
	throw new Error("Missing env variable: POSTGRES_URL");
}

const pool = new Pool({
	connectionString: POSTGRES_URL,
});

export const db = drizzle(pool);

pool.query(`SELECT 1`).catch((err) => {
	console.error("Error connecting to database:", err);
	process.exit(1);
});
