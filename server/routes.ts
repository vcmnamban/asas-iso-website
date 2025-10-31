import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema, 
  insertConsultationRequestSchema, 
  insertChatMessageSchema,
  insertQuoteRequestSchema,
  insertBlogPostSchema,
  insertAdminUserSchema
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
      
      let botResponse = "I'm sorry, I'm having trouble connecting right now. Please try again later.";
      
      // Call n8n webhook for AI response
      const webhookUrl = process.env.N8N_WEBHOOK_URL;
      
      if (webhookUrl) {
        try {
          const n8nResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'sendMessage',
              sessionId: validatedData.sessionId,
              chatInput: validatedData.userMessage
            })
          });

          if (n8nResponse.ok) {
            const n8nData = await n8nResponse.json();
            // n8n chat typically returns the response in the 'output' field
            botResponse = n8nData.output || n8nData.response || n8nData.message || botResponse;
          } else {
            console.error('n8n webhook error:', n8nResponse.status, n8nResponse.statusText);
          }
        } catch (fetchError) {
          console.error('Error calling n8n webhook:', fetchError);
          // Fallback to default message if webhook fails
        }
      } else {
        console.warn('N8N_WEBHOOK_URL not configured');
      }
      
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

  // Blog Posts API
  // Get all published blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const publishedOnly = req.query.published !== 'false'; // default to true
      
      let posts = await storage.getBlogPosts(publishedOnly);
      
      if (limit && limit > 0) {
        posts = posts.slice(0, limit);
      }
      
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get single blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const post = await storage.getBlogPostBySlug(slug);
      if (!post) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Admin Blog Management API
  // Get all blog posts (including drafts) - Admin only
  app.get("/api/admin/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(); // all posts
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Create new blog post - Admin only
  app.post("/api/admin/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json({ success: true, id: post.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid blog post data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create blog post" });
      }
    }
  });

  // Update blog post - Admin only
  app.put("/api/admin/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      if (!post) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      res.json({ success: true, post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid blog post data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update blog post" });
      }
    }
  });

  // Delete blog post - Admin only
  app.delete("/api/admin/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBlogPost(id);
      if (!success) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
