import { preRegistrations, contactMessages, type PreRegistration, type InsertPreRegistration, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Pre-registration methods
  createPreRegistration(preRegistration: InsertPreRegistration): Promise<PreRegistration>;
  getPreRegistrations(): Promise<PreRegistration[]>;
  getPreRegistration(id: string): Promise<PreRegistration | undefined>;
  
  // Contact message methods
  createContactMessage(contactMessage: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createPreRegistration(insertPreRegistration: InsertPreRegistration): Promise<PreRegistration> {
    const [preRegistration] = await db
      .insert(preRegistrations)
      .values(insertPreRegistration)
      .returning();
    return preRegistration;
  }

  async getPreRegistrations(): Promise<PreRegistration[]> {
    return await db.select().from(preRegistrations);
  }

  async getPreRegistration(id: string): Promise<PreRegistration | undefined> {
    const [preRegistration] = await db.select().from(preRegistrations).where(eq(preRegistrations.id, id));
    return preRegistration || undefined;
  }

  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db
      .insert(contactMessages)
      .values(insertContactMessage)
      .returning();
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    const [contactMessage] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return contactMessage || undefined;
  }
}

export const storage = new DatabaseStorage();
