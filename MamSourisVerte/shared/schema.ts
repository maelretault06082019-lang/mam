import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const preRegistrations = pgTable("pre_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  childFirstName: text("child_first_name").notNull(),
  childLastName: text("child_last_name").notNull(),
  childBirthDate: text("child_birth_date").notNull(),
  childGender: text("child_gender"),
  parentName: text("parent_name").notNull(),
  parentPhone: text("parent_phone").notNull(),
  parentEmail: text("parent_email").notNull(),
  address: text("address"),
  startDate: text("start_date"),
  careType: text("care_type"),
  monday: boolean("monday").default(false),
  tuesday: boolean("tuesday").default(false),
  wednesday: boolean("wednesday").default(false),
  thursday: boolean("thursday").default(false),
  friday: boolean("friday").default(false),
  comments: text("comments"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPreRegistrationSchema = createInsertSchema(preRegistrations).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertPreRegistration = z.infer<typeof insertPreRegistrationSchema>;
export type PreRegistration = typeof preRegistrations.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
