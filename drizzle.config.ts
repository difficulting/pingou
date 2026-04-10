import { defineConfig } from "drizzle-kit";

const POSTGRES_URL = process.env.POSTGRES_URL;

if (!POSTGRES_URL) {
	throw new Error("Missing env variable: POSTGRES_URL");
}

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/database/schemas/*",
	out: "./drizzle",
	dbCredentials: {
		url: POSTGRES_URL,
	},
});
