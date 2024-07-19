import { relations } from "drizzle-orm/relations";
import { User, Account, bug, eso, ffxiv, post, post_modification, post_permission, Session, staff, staff_point_chart, staff_duty, discord_user, swtor } from "./schema";

export const AccountRelations = relations(Account, ({one}) => ({
	User: one(User, {
		fields: [Account.userId],
		references: [User.id]
	}),
}));

export const UserRelations = relations(User, ({many}) => ({
	Accounts: many(Account),
	bugs: many(bug),
	esos: many(eso),
	ffxivs: many(ffxiv),
	posts: many(post),
	post_modifications: many(post_modification),
	Sessions: many(Session),
	staff: many(staff),
	swtors: many(swtor),
}));

export const bugRelations = relations(bug, ({one}) => ({
	User: one(User, {
		fields: [bug.createdById],
		references: [User.id]
	}),
}));

export const esoRelations = relations(eso, ({one}) => ({
	User: one(User, {
		fields: [eso.userId],
		references: [User.id]
	}),
}));

export const ffxivRelations = relations(ffxiv, ({one}) => ({
	User: one(User, {
		fields: [ffxiv.userId],
		references: [User.id]
	}),
}));

export const postRelations = relations(post, ({one, many}) => ({
	User: one(User, {
		fields: [post.createdById],
		references: [User.id]
	}),
	post_modifications: many(post_modification),
	post_permissions: many(post_permission),
}));

export const post_modificationRelations = relations(post_modification, ({one}) => ({
	User: one(User, {
		fields: [post_modification.modById],
		references: [User.id]
	}),
	post: one(post, {
		fields: [post_modification.postId],
		references: [post.id]
	}),
}));

export const post_permissionRelations = relations(post_permission, ({one}) => ({
	post: one(post, {
		fields: [post_permission.postId],
		references: [post.id]
	}),
}));

export const SessionRelations = relations(Session, ({one}) => ({
	User: one(User, {
		fields: [Session.userId],
		references: [User.id]
	}),
}));

export const staffRelations = relations(staff, ({one}) => ({
	User: one(User, {
		fields: [staff.userId],
		references: [User.id]
	}),
}));

export const staff_dutyRelations = relations(staff_duty, ({one}) => ({
	staff_point_chart: one(staff_point_chart, {
		fields: [staff_duty.duty_type],
		references: [staff_point_chart.task_id]
	}),
	discord_user: one(discord_user, {
		fields: [staff_duty.gmember_id],
		references: [discord_user.gmember_id]
	}),
}));

export const staff_point_chartRelations = relations(staff_point_chart, ({many}) => ({
	staff_duties: many(staff_duty),
}));

export const discord_userRelations = relations(discord_user, ({many}) => ({
	staff_duties: many(staff_duty),
}));

export const swtorRelations = relations(swtor, ({one}) => ({
	User: one(User, {
		fields: [swtor.userId],
		references: [User.id]
	}),
}));