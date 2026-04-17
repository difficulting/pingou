import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const cooldowns = pgTable("cooldowns", {
	id: varchar("id", { length: 255 }).primaryKey(),
	userId: varchar("user_id", { length: 64 }).notNull(),
	key: varchar("key", { length: 128 }).notNull(),
	expiresAt: timestamp("expires_at").notNull(),
});
