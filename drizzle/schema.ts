import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, unique, varchar, text, int, timestamp, longtext, datetime, mediumtext, tinyint, index, tinytext, decimal, float } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const Account = mysqlTable("Account", {
	id: varchar("id", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull().references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	type: varchar("type", { length: 191 }).notNull(),
	provider: varchar("provider", { length: 191 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
	refresh_token: text("refresh_token").default('NULL'),
	access_token: text("access_token").default('NULL'),
	expires_at: int("expires_at").default('NULL'),
	token_type: varchar("token_type", { length: 191 }).default('NULL'),
	scope: varchar("scope", { length: 191 }).default('NULL'),
	id_token: text("id_token").default('NULL'),
	session_state: varchar("session_state", { length: 191 }).default('NULL'),
},
(table) => {
	return {
		Account_userId_key: unique("Account_userId_key").on(table.userId),
		Account_provider_providerAccountId_key: unique("Account_provider_providerAccountId_key").on(table.provider, table.providerAccountId),
	}
});

export const article = mysqlTable("article", {
	article_id: bigint("article_id", { mode: "number" }).autoincrement().notNull(),
	title: varchar("title", { length: 255 }).default('NULL'),
	undertitle: varchar("undertitle", { length: 255 }).notNull(),
	content: text("content").default('NULL'),
	cover_image_path: varchar("cover_image_path", { length: 255 }).default('NULL'),
	gmember_id: varchar("gmember_id", { length: 191 }).default('NULL'),
	game_type: varchar("game_type", { length: 50 }).default('NULL'),
	summary: text("summary").default('NULL'),
	created_at: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const articles = mysqlTable("articles", {
	id: int("id").autoincrement().notNull(),
	content_id: int("content_id").default('NULL'),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content").default('NULL'),
	timestamp: timestamp("timestamp", { mode: 'string' }).default('current_timestamp()').notNull(),
	cover_image_path: varchar("cover_image_path", { length: 255 }).default('NULL'),
	game_type: varchar("game_type", { length: 255 }).default('NULL'),
	summary: text("summary").default('NULL'),
});

export const audiences = mysqlTable("audiences", {
	audience_id: int("audience_id").autoincrement().notNull(),
	audience_name: varchar("audience_name", { length: 255 }).notNull(),
});

export const ban_list = mysqlTable("ban_list", {
	id: int("id").autoincrement().notNull(),
	player_name: varchar("player_name", { length: 45 }).notNull(),
},
(table) => {
	return {
		player_name_UNIQUE: unique("player_name_UNIQUE").on(table.player_name),
	}
});

export const bug = mysqlTable("bug", {
	id: varchar("id", { length: 191 }).notNull(),
	title: varchar("title", { length: 191 }).notNull(),
	content: longtext("content").notNull(),
	timestamp: datetime("timestamp", { mode: 'string', fsp: 3 }).default('current_timestamp(3)').notNull(),
	createdById: varchar("createdById", { length: 191 }).notNull().references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});

export const build = mysqlTable("build", {
	build_id: int("build_id").autoincrement().notNull(),
	title: varchar("title", { length: 255 }).default('NULL'),
	content: text("content").default('NULL'),
	cover_image_path: varchar("cover_image_path", { length: 255 }).default('NULL'),
	gmember_id: varchar("gmember_id", { length: 191 }).default('NULL'),
	game_type: varchar("game_type", { length: 50 }).default('NULL'),
	summary: text("summary").default('NULL'),
	created_at: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const builds = mysqlTable("builds", {
	id: int("id").autoincrement().notNull(),
	content_id: int("content_id").default('NULL'),
	title: varchar("title", { length: 255 }).notNull(),
	content: mediumtext("content").default('NULL'),
	timestamp: timestamp("timestamp", { mode: 'string' }).default('current_timestamp()').notNull(),
	cover_image_path: varchar("cover_image_path", { length: 255 }).default('NULL'),
	game_type: varchar("game_type", { length: 255 }).default('NULL'),
	summary: text("summary").default('NULL'),
});

export const build_audience_mapping = mysqlTable("build_audience_mapping", {
	id: int("id").autoincrement().notNull(),
	build_id: int("build_id").default('NULL'),
	audience_id: int("audience_id").default('NULL'),
});

export const characters = mysqlTable("characters", {
	character_uid: int("character_uid").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	char_name: varchar("char_name", { length: 255 }).notNull(),
	class_name: varchar("class_name", { length: 255 }).default('NULL'),
	fact_id: int("fact_id").default('NULL'),
	game_id: int("game_id").notNull(),
	misc_info: text("misc_info").default('NULL'),
	trial_parse: int("trial_parse").default('NULL'),
});

export const contents = mysqlTable("contents", {
	content_id: int("content_id").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).default('NULL'),
	timestamp: timestamp("timestamp", { mode: 'string' }).default('current_timestamp()').notNull(),
	type_id: int("type_id").default('NULL'),
});

export const content_access = mysqlTable("content_access", {
	id: int("id").autoincrement().notNull(),
	content_id: int("content_id").default('NULL'),
	rank_role: varchar("rank_role", { length: 255 }).default('NULL'),
});

export const content_types = mysqlTable("content_types", {
	type_id: int("type_id").autoincrement().notNull(),
	type_name: varchar("type_name", { length: 255 }).notNull(),
});

export const discord_aliases = mysqlTable("discord_aliases", {
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	alias_uid: int("alias_uid").autoincrement().notNull(),
	alias_nickname: varchar("alias_nickname", { length: 255 }).default('NULL'),
	alias_disc_name: varchar("alias_disc_name", { length: 255 }).default('NULL'),
});

export const discord_join_leave = mysqlTable("discord_join_leave", {
	action_uid: int("action_uid").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	action: int("action").notNull(),
	timestamp: datetime("timestamp", { mode: 'string'}).notNull(),
});

export const discord_message = mysqlTable("discord_message", {
	message_uid: bigint("message_uid", { mode: "number" }).autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	nickname: varchar("nickname", { length: 255 }).notNull(),
	channel_name: varchar("channel_name", { length: 255 }).notNull(),
	content: text("content").notNull(),
	timestamp: datetime("timestamp", { mode: 'string'}).notNull(),
	old_content: text("old_content").default('NULL'),
});

export const discord_user = mysqlTable("discord_user", {
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	disc_nickname: varchar("disc_nickname", { length: 255 }).notNull(),
	ingame_name: varchar("ingame_name", { length: 255 }).notNull(),
	highest_rank_role: int("highest_rank_role").notNull(),
});

export const eso = mysqlTable("eso", {
	userId: varchar("userId", { length: 191 }).notNull().references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	rank: varchar("rank", { length: 191 }).default(''none'').notNull(),
	raid: tinyint("raid").default(0),
	raidlead: tinyint("raidlead").default(0),
	mentor: tinyint("mentor").default(0),
},
(table) => {
	return {
		eso_userId_key: unique("eso_userId_key").on(table.userId),
	}
});

export const eso_event = mysqlTable("eso_event", {
	event_uid: int("event_uid").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	event_type: varchar("event_type", { length: 255 }).notNull(),
	attendee_cnt: int("attendee_cnt").notNull(),
	duration: int("duration").notNull(),
	revenue: int("revenue").notNull(),
	start_timestamp: datetime("start_timestamp", { mode: 'string'}).notNull(),
	notes: text("notes").notNull(),
});

export const eso_event_unqiue = mysqlTable("eso_event_unqiue", {
	event_uid: int("event_uid").notNull(),
	attendee_num: int("attendee_num").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
});

export const eso_raid = mysqlTable("eso_raid", {
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	trial: int("trial").notNull(),
	difficulty: int("difficulty").notNull(),
	clears: int("clears").notNull(),
	wipes: int("wipes").notNull(),
	duration: int("duration").notNull(),
	raid_uid: int("raid_uid").autoincrement().notNull(),
});

export const eso_raid_unique = mysqlTable("eso_raid_unique", {
	raid_uid: int("raid_uid").notNull(),
	attendee_num: int("attendee_num").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
});

export const eso_user = mysqlTable("eso_user", {
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	eso_id: varchar("eso_id", { length: 255 }).notNull(),
	tier_tank: int("tier_tank").default('NULL'),
	tier_healer: int("tier_healer").default('NULL'),
	tier_dps: int("tier_dps").default('NULL'),
	parse: int("parse").default(1).notNull(),
});

export const events = mysqlTable("events", {
	event_id: int("event_id").autoincrement().notNull(),
	event_type: varchar("event_type", { length: 255 }).notNull(),
	date_time: datetime("date_time", { mode: 'string'}).notNull(),
	duration: int("duration").notNull(),
	game: varchar("game", { length: 255 }).notNull(),
	details: text("details").notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	repeat_event: tinyint("repeat_event").default('NULL'),
	req_tank: int("req_tank").default('NULL'),
	req_heal: int("req_heal").default('NULL'),
	req_dps: int("req_dps").default('NULL'),
	req_parse: int("req_parse").default('NULL'),
});

export const event_signups = mysqlTable("event_signups", {
	event_id: int("event_id").notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	role: int("role").default('NULL'),
	parse: int("parse").notNull(),
	signup_uid: int("signup_uid").autoincrement().notNull(),
});

export const ffxiv = mysqlTable("ffxiv", {
	userId: varchar("userId", { length: 191 }).notNull().references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	rank: varchar("rank", { length: 191 }).default(''none'').notNull(),
	raid: tinyint("raid").default(0),
	raidlead: tinyint("raidlead").default(0),
	mentor: tinyint("mentor").default(0),
},
(table) => {
	return {
		ffxiv_userId_key: unique("ffxiv_userId_key").on(table.userId),
	}
});

export const guides = mysqlTable("guides", {
	id: int("id").autoincrement().notNull(),
	content_id: int("content_id").default('NULL'),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content").default('NULL'),
	timestamp: timestamp("timestamp", { mode: 'string' }).default('current_timestamp()').notNull(),
	cover_image_path: varchar("cover_image_path", { length: 255 }).default('NULL'),
	game_type: varchar("game_type", { length: 255 }).default('NULL'),
	summary: text("summary").default('NULL'),
});

export const guide_audience_mapping = mysqlTable("guide_audience_mapping", {
	id: int("id").autoincrement().notNull(),
	guide_id: int("guide_id").default('NULL'),
	audience_id: int("audience_id").default('NULL'),
});

export const guild_names = mysqlTable("guild_names", {
	guild_id: int("guild_id").notNull(),
	guild_name: varchar("guild_name", { length: 255 }).notNull(),
});

export const mcmmo_cooldowns = mysqlTable("mcmmo_cooldowns", {
	user_id: int("user_id").notNull(),
	taming: int("taming").default(0).notNull(),
	mining: int("mining").default(0).notNull(),
	woodcutting: int("woodcutting").default(0).notNull(),
	repair: int("repair").default(0).notNull(),
	unarmed: int("unarmed").default(0).notNull(),
	herbalism: int("herbalism").default(0).notNull(),
	excavation: int("excavation").default(0).notNull(),
	archery: int("archery").default(0).notNull(),
	swords: int("swords").default(0).notNull(),
	axes: int("axes").default(0).notNull(),
	acrobatics: int("acrobatics").default(0).notNull(),
	blast_mining: int("blast_mining").default(0).notNull(),
	chimaera_wing: int("chimaera_wing").default(0).notNull(),
	crossbows: int("crossbows").default(0).notNull(),
	tridents: int("tridents").default(0).notNull(),
	maces: int("maces").default(0).notNull(),
});

export const mcmmo_experience = mysqlTable("mcmmo_experience", {
	user_id: int("user_id").notNull(),
	taming: int("taming").default(0).notNull(),
	mining: int("mining").default(0).notNull(),
	woodcutting: int("woodcutting").default(0).notNull(),
	repair: int("repair").default(0).notNull(),
	unarmed: int("unarmed").default(0).notNull(),
	herbalism: int("herbalism").default(0).notNull(),
	excavation: int("excavation").default(0).notNull(),
	archery: int("archery").default(0).notNull(),
	swords: int("swords").default(0).notNull(),
	axes: int("axes").default(0).notNull(),
	acrobatics: int("acrobatics").default(0).notNull(),
	fishing: int("fishing").default(0).notNull(),
	alchemy: int("alchemy").default(0).notNull(),
	crossbows: int("crossbows").default(0).notNull(),
	tridents: int("tridents").default(0).notNull(),
	maces: int("maces").default(0).notNull(),
});

export const mcmmo_huds = mysqlTable("mcmmo_huds", {
	user_id: int("user_id").notNull(),
	mobhealthbar: varchar("mobhealthbar", { length: 50 }).default('NULL'),
	scoreboardtips: int("scoreboardtips").default(0).notNull(),
});

export const mcmmo_skills = mysqlTable("mcmmo_skills", {
	user_id: int("user_id").notNull(),
	taming: int("taming").default(0).notNull(),
	mining: int("mining").default(0).notNull(),
	woodcutting: int("woodcutting").default(0).notNull(),
	repair: int("repair").default(0).notNull(),
	unarmed: int("unarmed").default(0).notNull(),
	herbalism: int("herbalism").default(0).notNull(),
	excavation: int("excavation").default(0).notNull(),
	archery: int("archery").default(0).notNull(),
	swords: int("swords").default(0).notNull(),
	axes: int("axes").default(0).notNull(),
	acrobatics: int("acrobatics").default(0).notNull(),
	fishing: int("fishing").default(0).notNull(),
	alchemy: int("alchemy").default(0).notNull(),
	crossbows: int("crossbows").default(0).notNull(),
	tridents: int("tridents").default(0).notNull(),
	maces: int("maces").default(0).notNull(),
	total: int("total").default(0).notNull(),
});

export const mcmmo_users = mysqlTable("mcmmo_users", {
	id: int("id").autoincrement().notNull(),
	user: varchar("user", { length: 40 }).default('NULL'),
	uuid: varchar("uuid", { length: 36 }).default('NULL'),
	lastlogin: bigint("lastlogin", { mode: "number" }).notNull(),
},
(table) => {
	return {
		user_idx: index("user_index").on(table.user),
		uuid: unique("uuid").on(table.uuid),
	}
});

export const minecraft_user = mysqlTable("minecraft_user", {
	mc_uid: int("mc_uid").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 255 }).default('NULL'),
	mc_name: varchar("mc_name", { length: 255 }).notNull(),
	disc_name: varchar("disc_name", { length: 255 }).default('NULL'),
	IP: varchar("IP", { length: 255 }).notNull(),
	secret_key: varchar("secret_key", { length: 255 }).notNull(),
	total_play_seconds: bigint("total_play_seconds", { mode: "number" }).notNull(),
	seconds_this_week: bigint("seconds_this_week", { mode: "number" }).default('NULL'),
	last_seen: varchar("last_seen", { length: 255 }).default('NULL'),
});

export const not_interested = mysqlTable("not_interested", {
	id: int("id").autoincrement().notNull(),
	player_name: varchar("player_name", { length: 45 }).notNull(),
},
(table) => {
	return {
		player_name_UNIQUE: unique("player_name_UNIQUE").on(table.player_name),
	}
});

export const parse_records = mysqlTable("parse_records", {
	parse_uid: int("parse_uid").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 255 }).notNull(),
	disc_nickname: varchar("disc_nickname", { length: 255 }).default('NULL'),
	char_name: varchar("char_name", { length: 255 }).notNull(),
	class: int("class").notNull(),
	damage: int("damage").notNull(),
	timestamp: datetime("timestamp", { mode: 'string'}).default('current_timestamp()').notNull(),
	patch_number: int("patch_number").default(42).notNull(),
});

export const post = mysqlTable("post", {
	id: varchar("id", { length: 191 }).notNull(),
	title: varchar("title", { length: 191 }).notNull(),
	summary: text("summary").notNull(),
	content: longtext("content").notNull(),
	image: varchar("image", { length: 255 }).default('NULL'),
	timestamp: datetime("timestamp", { mode: 'string', fsp: 3 }).default('current_timestamp(3)').notNull(),
	updatedAt: datetime("updatedAt", { mode: 'string', fsp: 3 }).notNull(),
	createdById: varchar("createdById", { length: 191 }).notNull().references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});

export const post_modification = mysqlTable("post_modification", {
	id: varchar("id", { length: 191 }).notNull(),
	image: text("image").default('NULL'),
	postId: varchar("postId", { length: 191 }).notNull().references(() => post.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	published: varchar("published", { length: 191 }).default(''Published by modById'').notNull(),
	modById: varchar("modById", { length: 191 }).notNull().references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	ori_content: text("ori_content").notNull(),
	ori_summary: text("ori_summary").notNull(),
	ori_title: varchar("ori_title", { length: 191 }).notNull(),
},
(table) => {
	return {
		post_modification_postId_key: unique("post_modification_postId_key").on(table.postId),
	}
});

export const post_permission = mysqlTable("post_permission", {
	id: varchar("id", { length: 191 }).notNull(),
	postId: varchar("postId", { length: 191 }).notNull().references(() => post.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	guild_public: tinyint("guild_public").default(0).notNull(),
	eso: tinyint("eso").default(0).notNull(),
	ffxiv: tinyint("ffxiv").default(0).notNull(),
	swtor: tinyint("swtor").default(0).notNull(),
	staff: tinyint("staff").default(0).notNull(),
	officer: tinyint("officer").default(0).notNull(),
	raid: tinyint("raid").default(0).notNull(),
	beginner: tinyint("beginner").default(0).notNull(),
	intermediate: tinyint("intermediate").default(0).notNull(),
	advanced: tinyint("advanced").default(0).notNull(),
	published: tinyint("published").default(0).notNull(),
	type: varchar("type", { length: 191 }).notNull(),
	tgc_guild: tinyint("tgc_guild").default(0).notNull(),
	tgc_member: tinyint("tgc_member").default(0).notNull(),
},
(table) => {
	return {
		post_permission_postId_key: unique("post_permission_postId_key").on(table.postId),
	}
});

export const rank_role_mapping = mysqlTable("rank_role_mapping", {
	rank_role_id: int("rank_role_id").notNull(),
	rank_role: varchar("rank_role", { length: 60 }).default('NULL'),
});

export const rewards = mysqlTable("rewards", {
	id: varchar("id", { length: 255 }).default('NULL'),
	playTime: bigint("playTime", { mode: "number" }),
	uses: bigint("uses", { mode: "number" }).default(-1),
	votes: bigint("votes", { mode: "number" }),
	referredTo: tinytext("referredTo").default('NULL'),
	join_notification: tinyint("join_notification").default(1),
	live_notifications: tinyint("live_notifications").default(1),
	join_auto_claim: tinyint("join_auto_claim").default(0),
	exampleVoteRewardCollected: bigint("exampleVoteRewardCollected", { mode: "number" }),
	exampleVoteReward: bigint("exampleVoteReward", { mode: "number" }).default(-1),
	exampleStreakRewardCollected: bigint("exampleStreakRewardCollected", { mode: "number" }),
	exampleStreakReward: bigint("exampleStreakReward", { mode: "number" }),
	exampleStreakRewardCurrentStreak: bigint("exampleStreakRewardCurrentStreak", { mode: "number" }),
	examplePurchasableRewardCollected: bigint("examplePurchasableRewardCollected", { mode: "number" }),
	examplePurchasableReward: bigint("examplePurchasableReward", { mode: "number" }).default(-1),
	exampleAdventCalendarCollected: bigint("exampleAdventCalendarCollected", { mode: "number" }),
	exampleAdventCalendar: varchar("exampleAdventCalendar", { length: 255 }).default(''000000000000000000000000''),
	exampleTimeLimitedRewardCollected: bigint("exampleTimeLimitedRewardCollected", { mode: "number" }),
	exampleTimeLimitedReward: bigint("exampleTimeLimitedReward", { mode: "number" }),
	exampleRenewablePlayTimeRewardCollected: bigint("exampleRenewablePlayTimeRewardCollected", { mode: "number" }),
	exampleRenewablePlayTimeReward: bigint("exampleRenewablePlayTimeReward", { mode: "number" }).default(-1),
	exampleOneTimeRewardCollected: bigint("exampleOneTimeRewardCollected", { mode: "number" }),
	exampleOneTimeReward: bigint("exampleOneTimeReward", { mode: "number" }),
	exampleStreakFixedRewardCollected: bigint("exampleStreakFixedRewardCollected", { mode: "number" }),
	exampleStreakFixedRewardCurrentStreak: tinytext("exampleStreakFixedRewardCurrentStreak").default('NULL'),
	exampleStreakFixedReward: tinytext("exampleStreakFixedReward").default('NULL'),
	exampleTimeRewardCollected: bigint("exampleTimeRewardCollected", { mode: "number" }),
	exampleTimeReward: bigint("exampleTimeReward", { mode: "number" }).default(1717181630076),
	exampleTimeFixedRewardCollected: bigint("exampleTimeFixedRewardCollected", { mode: "number" }),
	exampleTimeFixedReward: tinytext("exampleTimeFixedReward").default('NULL'),
	exampleRenewableVoteRewardCollected: bigint("exampleRenewableVoteRewardCollected", { mode: "number" }),
	exampleRenewableVoteReward: bigint("exampleRenewableVoteReward", { mode: "number" }),
	exampleStreakVoteRewardCollected: bigint("exampleStreakVoteRewardCollected", { mode: "number" }),
	exampleStreakVoteRewardVotes: bigint("exampleStreakVoteRewardVotes", { mode: "number" }),
	exampleStreakVoteReward: bigint("exampleStreakVoteReward", { mode: "number" }).default(1717181632255),
	exampleStreakVoteRewardCurrentStreak: bigint("exampleStreakVoteRewardCurrentStreak", { mode: "number" }),
	exampleRePurchasableRewardCollected: bigint("exampleRePurchasableRewardCollected", { mode: "number" }),
	exampleRePurchasableReward: bigint("exampleRePurchasableReward", { mode: "number" }).default(1717181633048),
	exampleReferralRewardCollected: bigint("exampleReferralRewardCollected", { mode: "number" }),
	exampleReferralReward: bigint("exampleReferralReward", { mode: "number" }).default(-1),
	examplePlayTimeRewardCollected: bigint("examplePlayTimeRewardCollected", { mode: "number" }),
	examplePlayTimeReward: bigint("examplePlayTimeReward", { mode: "number" }).default(-1),
	exampleRenewableReferralRewardCollected: bigint("exampleRenewableReferralRewardCollected", { mode: "number" }),
	exampleRenewableReferralReward: bigint("exampleRenewableReferralReward", { mode: "number" }),
});

export const Session = mysqlTable("Session", {
	id: varchar("id", { length: 191 }).notNull(),
	sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull().references(() => User.id),
	expires: datetime("expires", { mode: 'string', fsp: 3 }).notNull(),
},
(table) => {
	return {
		user_idx: index("user_idx").on(table.userId),
		Session_sessionToken_key: unique("Session_sessionToken_key").on(table.sessionToken),
	}
});

export const situation_disciplinary = mysqlTable("situation_disciplinary", {
	action_uid: int("action_uid").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	punish_type: int("punish_type").notNull(),
	probation_weeks: int("probation_weeks").default('NULL'),
	timestamp: datetime("timestamp", { mode: 'string'}).notNull(),
	report: text("report").default('NULL'),
});

export const situation_report = mysqlTable("situation_report", {
	report_uid: int("report_uid").autoincrement().notNull(),
	action_uid: int("action_uid").default('NULL'),
	timestamp: datetime("timestamp", { mode: 'string'}).notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	content: text("content").notNull(),
});

export const staff = mysqlTable("staff", {
	userId: varchar("userId", { length: 191 }).notNull().references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	admin: tinyint("admin").default(0),
	specialist: tinyint("specialist").default(0),
	representative: tinyint("representative").default(0),
	highcouncil: tinyint("highcouncil").default(0),
	guildmaster: tinyint("guildmaster").default(0),
	juniorofficer: tinyint("juniorofficer").default(0),
	officer: tinyint("officer").default(0),
	seniorofficer: tinyint("seniorofficer").default(0),
},
(table) => {
	return {
		staff_userId_key: unique("staff_userId_key").on(table.userId),
	}
});

export const staff_admin = mysqlTable("staff_admin", {
	task_uid: int("task_uid").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	duty_type: int("duty_type").notNull(),
	timestamp: datetime("timestamp", { mode: 'string'}).notNull(),
	action_target: int("action_target").default('NULL'),
});

export const staff_duty = mysqlTable("staff_duty", {
	duty_uid: int("duty_uid").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 45 }).notNull().references(() => discord_user.gmember_id, { onDelete: "restrict", onUpdate: "restrict" } ),
	duty_type: int("duty_type").notNull().references(() => staff_point_chart.task_id, { onDelete: "restrict", onUpdate: "restrict" } ),
	timestamp: datetime("timestamp", { mode: 'string'}).notNull(),
	target: int("target").default('NULL'),
	eso_target_user: varchar("eso_target_user", { length: 255 }).default('NULL'),
	message_content: text("message_content").default('NULL'),
	description: text("description").default('NULL'),
});

export const staff_ff_swtor = mysqlTable("staff_ff_swtor", {
	task_uid: int("task_uid").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	timestamp: datetime("timestamp", { mode: 'string'}).notNull(),
	duty_id: int("duty_id").notNull(),
});

export const staff_point_chart = mysqlTable("staff_point_chart", {
	task_id: int("task_id").notNull(),
	task_name: varchar("task_name", { length: 255 }).notNull(),
	point_value: int("point_value").notNull(),
	task_description: text("task_description").default('NULL'),
});

export const staff_point_log = mysqlTable("staff_point_log", {
	uid: int("uid").autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 191 }).notNull(),
	cnt_points: int("cnt_points").notNull(),
	timestamp: datetime("timestamp", { mode: 'string'}).notNull(),
});

export const staff_status_change = mysqlTable("staff_status_change", {
	transaction_id: int("transaction_id").autoincrement().notNull(),
	status_update: int("status_update").notNull(),
	training_type: int("training_type").default('NULL'),
	trainer_gmember_id: int("trainer_gmember_id").default('NULL'),
	timestamp: datetime("timestamp", { mode: 'string'}).notNull(),
});

export const swtor = mysqlTable("swtor", {
	userId: varchar("userId", { length: 191 }).notNull().references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	rank: varchar("rank", { length: 191 }).default(''none'').notNull(),
	raid: tinyint("raid").default(0),
	raidlead: tinyint("raidlead").default(0),
	mentor: tinyint("mentor").default(0),
},
(table) => {
	return {
		swtor_userId_key: unique("swtor_userId_key").on(table.userId),
	}
});

export const User = mysqlTable("User", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	email: varchar("email", { length: 191 }).notNull(),
	emailVerified: datetime("emailVerified", { mode: 'string', fsp: 3 }).default('NULL'),
	image: varchar("image", { length: 191 }).notNull(),
	role: varchar("role", { length: 191 }).default(''guest'').notNull(),
	tgc_guild_member: tinyint("tgc_guild_member").default(0).notNull(),
},
(table) => {
	return {
		User_name_key: unique("User_name_key").on(table.name),
		User_email_key: unique("User_email_key").on(table.email),
	}
});

export const velothi_waivers = mysqlTable("velothi_waivers", {
	gmember_id: varchar("gmember_id", { length: 255 }).notNull(),
	nickname: varchar("nickname", { length: 255 }).default('NULL'),
	waiver: tinyint("waiver").default('NULL'),
	las: decimal("las", { precision: 10, scale: 0 }).default('NULL'),
	special_class: int("special_class").default('NULL'),
	uid: int("uid").autoincrement().notNull(),
	record_date: datetime("record_date", { mode: 'string'}).default('current_timestamp()').notNull(),
});

export const VerificationToken = mysqlTable("VerificationToken", {
	identifier: varchar("identifier", { length: 191 }).notNull(),
	token: varchar("token", { length: 191 }).notNull(),
	expires: datetime("expires", { mode: 'string', fsp: 3 }).notNull(),
},
(table) => {
	return {
		VerificationToken_token_key: unique("VerificationToken_token_key").on(table.token),
		VerificationToken_identifier_token_key: unique("VerificationToken_identifier_token_key").on(table.identifier, table.token),
	}
});

export const voice_sessions = mysqlTable("voice_sessions", {
	voice_session_id: varchar("voice_session_id", { length: 100 }).notNull(),
	gmember_id: varchar("gmember_id", { length: 45 }).default('NULL'),
	channel_id: varchar("channel_id", { length: 45 }).default('NULL'),
	start_time: datetime("start_time", { mode: 'string'}).default('NULL'),
	end_time: datetime("end_time", { mode: 'string'}).default('NULL'),
	duration: float("duration").default('NULL'),
});

export const voice_time = mysqlTable("voice_time", {
	conn_uid: bigint("conn_uid", { mode: "number" }).autoincrement().notNull(),
	gmember_id: varchar("gmember_id", { length: 255 }).notNull(),
	nick: varchar("nick", { length: 255 }).notNull(),
	connection_time: time("connection_time", { fsp: 6 }).notNull(),
	new_channel: varchar("new_channel", { length: 255 }).default('NULL'),
	old_channel: varchar("old_channel", { length: 255 }).default('NULL'),
	n_users: text("n_users").default('NULL'),
	o_users: text("o_users").default('NULL'),
});