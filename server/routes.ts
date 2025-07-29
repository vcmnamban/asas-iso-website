import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema, 
  insertConsultationRequestSchema, 
  insertChatMessageSchema,
  insertQuoteRequestSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ success: true, id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Consultation request submission
  app.post("/api/consultation", async (req, res) => {
    try {
      const validatedData = insertConsultationRequestSchema.parse(req.body);
      const request = await storage.createConsultationRequest(validatedData);
      res.json({ success: true, id: request.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit consultation request" });
      }
    }
  });

  // Quote request submission
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const request = await storage.createQuoteRequest(validatedData);
      res.json({ success: true, id: request.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit quote request" });
      }
    }
  });

  // Chat message submission
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      
      // Generate AI response based on user message
      const userMessage = validatedData.userMessage.toLowerCase();
      let botResponse = "Thank you for your question. I can help you with information about our ISO training courses. ";
      
      if (userMessage.includes("iso 9001") || userMessage.includes("quality")) {
        botResponse += "ISO 9001:2015 is our Quality Management Systems course. We offer Awareness Training, Implementation Workshop, and Internal Auditor Training. ";
      } else if (userMessage.includes("iso 14001") || userMessage.includes("environmental")) {
        botResponse += "ISO 14001:2015 is our Environmental Management Systems course. We offer three levels of training. ";
      } else if (userMessage.includes("iso 45001") || userMessage.includes("safety") || userMessage.includes("health")) {
        botResponse += "ISO 45001:2018 is our Occupational Health & Safety Management course. Very popular in the GCC region. ";
      } else if (userMessage.includes("iso 27001") || userMessage.includes("security") || userMessage.includes("information")) {
        botResponse += "ISO 27001:2022 is our Information Security Management course. Essential for tech companies. ";
      } else if (userMessage.includes("schedule") || userMessage.includes("training") || userMessage.includes("course")) {
        botResponse += "We offer In-house training and Online live sessions. ";
      } else if (userMessage.includes("price") || userMessage.includes("cost") || userMessage.includes("quote")) {
        botResponse += "For pricing information, please use our contact form or schedule a free consultation. ";
      } else if (userMessage.includes("location") || userMessage.includes("kuwait") || userMessage.includes("saudi") || userMessage.includes("oman")) {
        botResponse += "We're based in Kuwait and serve the entire GCC region including Saudi Arabia and Oman. ";
      }
      
      botResponse += "Would you like me to connect you with our training specialist? Please provide your name and email.";
      
      const messageWithResponse = {
        ...validatedData,
        botResponse
      };
      
      const message = await storage.createChatMessage(messageWithResponse);
      res.json({ success: true, response: botResponse, id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process chat message" });
      }
    }
  });

  // Get chat history
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
