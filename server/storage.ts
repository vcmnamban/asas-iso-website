import { 
  contactSubmissions, 
  consultationRequests, 
  chatMessages,
  quoteRequests,
  blogPosts,
  adminUsers,
  type ContactSubmission,
  type InsertContactSubmission,
  type ConsultationRequest,
  type InsertConsultationRequest,
  type ChatMessage,
  type InsertChatMessage,
  type QuoteRequest,
  type InsertQuoteRequest,
  type BlogPost,
  type InsertBlogPost,
  type AdminUser,
  type InsertAdminUser
} from "@shared/schema";
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';

export interface IStorage {
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Consultation requests
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequests(): Promise<ConsultationRequest[]>;
  
  // Quote requests
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;
  
  // Chat messages
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  
  // Blog posts
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  updateBlogPost(id: number, post: InsertBlogPost): Promise<BlogPost | null>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Admin users
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  getAdminUserByEmail(email: string): Promise<AdminUser | null>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private consultationRequests: Map<number, ConsultationRequest>;
  private quoteRequests: Map<number, QuoteRequest>;
  private chatMessages: Map<number, ChatMessage>;
  private blogPosts: Map<number, BlogPost>;
  private adminUsers: Map<number, AdminUser>;
  private currentContactId: number;
  private currentConsultationId: number;
  private currentQuoteId: number;
  private currentChatId: number;
  private currentBlogId: number;
  private currentAdminId: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.consultationRequests = new Map();
    this.quoteRequests = new Map();
    this.chatMessages = new Map();
    this.blogPosts = new Map();
    this.adminUsers = new Map();
    this.currentContactId = 1;
    this.currentConsultationId = 1;
    this.currentQuoteId = 1;
    this.currentChatId = 1;
    this.currentBlogId = 1;
    this.currentAdminId = 1;
    
    // Create sample blog posts
    this.createSampleBlogPosts();
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

  async createQuoteRequest(insertRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteId++;
    const request: QuoteRequest = {
      id,
      companyName: insertRequest.companyName,
      contactPerson: insertRequest.contactPerson,
      email: insertRequest.email,
      phone: insertRequest.phone,
      industry: insertRequest.industry,
      companySize: insertRequest.companySize,
      country: insertRequest.country,
      trainingType: insertRequest.trainingType,
      isoStandards: insertRequest.isoStandards,
      participants: insertRequest.participants,
      preferredDates: insertRequest.preferredDates || '',
      additionalRequirements: insertRequest.additionalRequirements || '',
      createdAt: new Date(),
    };
    this.quoteRequests.set(id, request);
    return request;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
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

  // Blog Posts Methods
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogId++;
    const post: BlogPost = {
      id,
      ...insertPost,
      tags: insertPost.tags || null,
      tagsAr: insertPost.tagsAr || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values());
    return publishedOnly ? posts.filter(post => post.published) : posts;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = Array.from(this.blogPosts.values());
    return posts.find(post => post.slug === slug) || null;
  }

  async updateBlogPost(id: number, updateData: InsertBlogPost): Promise<BlogPost | null> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return null;
    
    const updatedPost: BlogPost = {
      ...existingPost,
      ...updateData,
      id: existingPost.id,
      createdAt: existingPost.createdAt,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Admin Users Methods
  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const id = this.currentAdminId++;
    const user: AdminUser = {
      id,
      ...insertUser,
      role: insertUser.role || null,
      role: insertUser.role || null,
      createdAt: new Date(),
    };
    this.adminUsers.set(id, user);
    return user;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | null> {
    const users = Array.from(this.adminUsers.values());
    return users.find(user => user.email === email) || null;
  }

  private async createSampleBlogPosts(): Promise<void> {
    // Sample blog posts for demonstration
    const samplePosts: InsertBlogPost[] = [
      {
        title: "Understanding ISO 9001:2015 Quality Management",
        titleAr: "فهم إدارة الجودة وفقاً لمعيار أيزو 9001:2015",
        slug: "understanding-iso-9001-2015-quality-management",
        excerpt: "A comprehensive guide to implementing ISO 9001:2015 quality management systems in your organization.",
        excerptAr: "دليل شامل لتطبيق أنظمة إدارة الجودة وفقاً لمعيار أيزو 9001:2015 في مؤسستك.",
        content: `ISO 9001:2015 is the international standard for quality management systems (QMS). It provides a framework for organizations to consistently deliver products and services that meet customer and regulatory requirements.

## Key Principles of ISO 9001:2015

1. **Customer Focus**: Understanding and meeting customer requirements
2. **Leadership**: Top management commitment and engagement
3. **Process Approach**: Managing activities as interconnected processes
4. **Continuous Improvement**: Ongoing enhancement of performance

## Implementation Steps

### Step 1: Gap Analysis
Conduct a thorough assessment of your current processes against ISO 9001:2015 requirements.

### Step 2: Documentation
Develop the necessary documented information required by the standard.

### Step 3: Training
Ensure all employees understand their roles in the QMS.

### Step 4: Internal Audit
Conduct regular internal audits to verify conformity.

For organizations in the GCC region, implementing ISO 9001:2015 provides competitive advantages and demonstrates commitment to quality.`,
        contentAr: `معيار أيزو 9001:2015 هو المعيار الدولي لأنظمة إدارة الجودة. يوفر إطار عمل للمؤسسات لتسليم المنتجات والخدمات بشكل متسق يلبي متطلبات العملاء والتنظيمية.

## المبادئ الأساسية لمعيار أيزو 9001:2015

1. **التركيز على العميل**: فهم وتلبية متطلبات العملاء
2. **القيادة**: التزام ومشاركة الإدارة العليا
3. **نهج العملية**: إدارة الأنشطة كعمليات مترابطة
4. **التحسين المستمر**: التعزيز المستمر للأداء

## خطوات التطبيق

### الخطوة 1: تحليل الفجوات
إجراء تقييم شامل للعمليات الحالية مقابل متطلبات أيزو 9001:2015.

### الخطوة 2: التوثيق
تطوير المعلومات المُوثقة المطلوبة بموجب المعيار.

### الخطوة 3: التدريب
ضمان فهم جميع الموظفين لأدوارهم في نظام إدارة الجودة.

### الخطوة 4: التدقيق الداخلي
إجراء تدقيقات داخلية منتظمة للتحقق من المطابقة.

للمؤسسات في منطقة دول مجلس التعاون الخليجي، يوفر تطبيق أيزو 9001:2015 مزايا تنافسية ويظهر الالتزام بالجودة.`,
        author: "Ahmad Al-Mansouri",
        authorAr: "أحمد المنصوري",
        category: "Quality Management",
        categoryAr: "إدارة الجودة",
        tags: ["ISO 9001", "Quality Management", "Implementation"],
        tagsAr: ["أيزو 9001", "إدارة الجودة", "التطبيق"],
        published: true,
        metaTitle: "ISO 9001:2015 Implementation Guide - Asas ISO Training",
        metaTitleAr: "دليل تطبيق أيزو 9001:2015 - تدريب أساس أيزو",
        metaDescription: "Learn how to implement ISO 9001:2015 quality management systems with our comprehensive guide for GCC organizations.",
        metaDescriptionAr: "تعلم كيفية تطبيق أنظمة إدارة الجودة أيزو 9001:2015 مع دليلنا الشامل للمؤسسات في دول مجلس التعاون الخليجي.",
        featuredImage: ""
      }
    ];

    for (const post of samplePosts) {
      await this.createBlogPost(post);
    }
  }
}

// Database Storage Implementation
export class DbStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    neonConfig.fetchConnectionCache = true;
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool);
  }

  // Contact submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [result] = await this.db.insert(contactSubmissions).values(submission).returning();
    return result;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await this.db.select().from(contactSubmissions);
  }

  // Consultation requests
  async createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest> {
    const [result] = await this.db.insert(consultationRequests).values(request).returning();
    return result;
  }

  async getConsultationRequests(): Promise<ConsultationRequest[]> {
    return await this.db.select().from(consultationRequests);
  }

  // Quote requests
  async createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest> {
    const [result] = await this.db.insert(quoteRequests).values(request).returning();
    return result;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return await this.db.select().from(quoteRequests);
  }

  // Chat messages
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [result] = await this.db.insert(chatMessages).values(message).returning();
    return result;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return await this.db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId));
  }

  // Blog posts
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const insertData = {
      ...post,
      tags: post.tags || null,
      tagsAr: post.tagsAr || null
    };
    const [result] = await this.db.insert(blogPosts).values(insertData).returning();
    return result;
  }

  async getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]> {
    if (publishedOnly) {
      return await this.db.select().from(blogPosts).where(eq(blogPosts.published, true));
    }
    return await this.db.select().from(blogPosts);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return posts[0] || null;
  }

  async updateBlogPost(id: number, updateData: InsertBlogPost): Promise<BlogPost | null> {
    const [result] = await this.db.update(blogPosts).set(updateData).where(eq(blogPosts.id, id)).returning();
    return result || null;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await this.db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Admin users
  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const insertData = {
      ...user,
      role: user.role || null
    };
    const [result] = await this.db.insert(adminUsers).values(insertData).returning();
    return result;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | null> {
    const users = await this.db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return users[0] || null;
  }
}

export const storage = new MemStorage();
