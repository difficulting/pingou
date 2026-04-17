import {
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const modActionTypeEnum = pgEnum("mod_action_type", [
	"ban",
	"kick",
	"mute",
	"warn",
	"restrict",
]);

export const modActions = pgTable("mod_actions", {
	id: serial("id").primaryKey(),
	type: modActionTypeEnum("type").notNull(),
	targetUserId: varchar("target_user_id", { length: 64 }).notNull(),
	moderatorId: varchar("moderator_id", { length: 64 }).notNull(),
	guildId: varchar("guild_id", { length: 64 }).notNull(),
	reason: text("reason").notNull(),
	duration: integer("duration"),
	extra: text("extra"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const modUsageLimits = pgTable("mod_usage_limits", {
	id: varchar("id", { length: 255 }).primaryKey(),
	moderatorId: varchar("moderator_id", { length: 64 }).notNull(),
	actionType: varchar("action_type", { length: 32 }).notNull(),
	usageCount: integer("usage_count").default(0).notNull(),
	resetsAt: timestamp("resets_at").notNull(),
});
