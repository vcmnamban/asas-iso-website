import { 
  contactSubmissions, 
  consultationRequests, 
  chatMessages,
  type ContactSubmission,
  type InsertContactSubmission,
  type ConsultationRequest,
  type InsertConsultationRequest,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";

export interface IStorage {
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Consultation requests
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequests(): Promise<ConsultationRequest[]>;
  
  // Chat messages
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private consultationRequests: Map<number, ConsultationRequest>;
  private chatMessages: Map<number, ChatMessage>;
  private currentContactId: number;
  private currentConsultationId: number;
  private currentChatId: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.consultationRequests = new Map();
    this.chatMessages = new Map();
    this.currentContactId = 1;
    this.currentConsultationId = 1;
    this.currentChatId = 1;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const submission: ContactSubmission = {
      id,
      fullName: insertSubmission.fullName,
      companyName: insertSubmission.companyName,
      email: insertSubmission.email,
      phone: insertSubmission.phone || '',
      country: insertSubmission.country,
      isoStandard: insertSubmission.isoStandard || '',
      message: insertSubmission.message || '',
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async createConsultationRequest(insertRequest: InsertConsultationRequest): Promise<ConsultationRequest> {
    const id = this.currentConsultationId++;
    const request: ConsultationRequest = {
      id,
      fullName: insertRequest.fullName,
      companyName: insertRequest.companyName,
      email: insertRequest.email,
      phone: insertRequest.phone || '',
      country: insertRequest.country,
      isoStandard: insertRequest.isoStandard || '',
      preferredDate: insertRequest.preferredDate || '',
      message: insertRequest.message || '',
      createdAt: new Date(),
    };
    this.consultationRequests.set(id, request);
    return request;
  }

  async getConsultationRequests(): Promise<ConsultationRequest[]> {
    return Array.from(this.consultationRequests.values());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const message: ChatMessage = {
      id,
      sessionId: insertMessage.sessionId,
      userMessage: insertMessage.userMessage,
      botResponse: insertMessage.botResponse || '',
      userEmail: insertMessage.userEmail || '',
      userName: insertMessage.userName || '',
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(msg => msg.sessionId === sessionId);
  }
}

export const storage = new MemStorage();
