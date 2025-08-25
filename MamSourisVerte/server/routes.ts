import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPreRegistrationSchema, insertContactMessageSchema } from "@shared/schema";
import { sendPreRegistrationEmail, sendContactEmail } from "./email";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Pre-registration routes
  app.post("/api/pre-registration", async (req, res) => {
    try {
      const validatedData = insertPreRegistrationSchema.parse(req.body);
      const preRegistration = await storage.createPreRegistration(validatedData);
      
      // Envoyer l'email de notification
      try {
        await sendPreRegistrationEmail(preRegistration);
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        // On continue même si l'email échoue
      }
      
      res.json(preRegistration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        console.error('Erreur lors de la création de la pré-inscription:', error);
        res.status(500).json({ message: "Erreur interne du serveur" });
      }
    }
  });

  app.get("/api/pre-registrations", async (req, res) => {
    try {
      const preRegistrations = await storage.getPreRegistrations();
      res.json(preRegistrations);
    } catch (error) {
      console.error('Erreur lors de la récupération des pré-inscriptions:', error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  });

  // Contact message routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Envoyer l'email de notification
      try {
        await sendContactEmail(contactMessage);
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        // On continue même si l'email échoue
      }
      
      res.json(contactMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        console.error('Erreur lors de la création du message de contact:', error);
        res.status(500).json({ message: "Erreur interne du serveur" });
      }
    }
  });

  app.get("/api/contact-messages", async (req, res) => {
    try {
      const contactMessages = await storage.getContactMessages();
      res.json(contactMessages);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages de contact:', error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
