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
      featuredImage: insertPost.featuredImage || null,
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
        featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Environmental Management Excellence: ISO 14001:2015 Implementation Guide",
        titleAr: "التميز في الإدارة البيئية: دليل تطبيق معيار أيزو 14001:2015",
        slug: "iso-14001-environmental-management-guide",
        excerpt: "Discover how ISO 14001:2015 helps organizations minimize environmental impact while achieving business objectives in the GCC region.",
        excerptAr: "اكتشف كيف يساعد معيار أيزو 14001:2015 المؤسسات على تقليل التأثير البيئي مع تحقيق الأهداف التجارية في منطقة دول مجلس التعاون الخليجي.",
        content: "Environmental responsibility is no longer optional for modern businesses. ISO 14001:2015 provides a systematic framework for environmental management that helps organizations reduce their environmental footprint while improving operational efficiency.",
        contentAr: "لم تعد المسؤولية البيئية اختيارية للشركات الحديثة. يوفر معيار أيزو 14001:2015 إطار عمل منهجي للإدارة البيئية يساعد المؤسسات على تقليل بصمتها البيئية مع تحسين الكفاءة التشغيلية.",
        author: "Dr. Fatima Al-Zahra",
        authorAr: "د. فاطمة الزهراء",
        category: "Environmental Management",
        categoryAr: "الإدارة البيئية",
        tags: ["ISO 14001", "Environmental Management", "Sustainability", "GCC"],
        tagsAr: ["أيزو 14001", "الإدارة البيئية", "الاستدامة", "دول مجلس التعاون"],
        published: true,
        metaTitle: "ISO 14001:2015 Environmental Management Guide for GCC - Asas ISO",
        metaTitleAr: "دليل الإدارة البيئية أيزو 14001:2015 لدول مجلس التعاون - أساس أيزو",
        metaDescription: "Complete guide to implementing ISO 14001:2015 environmental management systems in GCC organizations with practical insights.",
        metaDescriptionAr: "دليل شامل لتطبيق أنظمة الإدارة البيئية أيزو 14001:2015 في مؤسسات دول مجلس التعاون مع رؤى عملية.",
        featuredImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Workplace Safety Revolution: ISO 45001:2018 for GCC Industries",
        titleAr: "ثورة السلامة في مكان العمل: معيار أيزو 45001:2018 لصناعات دول مجلس التعاون",
        slug: "iso-45001-workplace-safety-gcc-industries",
        excerpt: "Transform your workplace safety culture with ISO 45001:2018. Essential guidance for oil & gas, construction, and manufacturing sectors in the Gulf region.",
        excerptAr: "غيّر ثقافة السلامة في مكان عملك مع معيار أيزو 45001:2018. إرشادات أساسية لقطاعات النفط والغاز والبناء والتصنيع في منطقة الخليج.",
        content: "The Gulf region thriving industrial sectors—from oil & gas to construction—face unique occupational health and safety challenges. ISO 45001:2018 provides the framework to create safer, healthier workplaces while maintaining operational excellence.",
        contentAr: "تواجه القطاعات الصناعية المزدهرة في منطقة الخليج - من النفط والغاز إلى البناء - تحديات فريدة في مجال الصحة والسلامة المهنية. يوفر معيار أيزو 45001:2018 الإطار لإنشاء أماكن عمل أكثر أماناً وصحة مع الحفاظ على التميز التشغيلي.",
        author: "Eng. Mohammed Al-Rashid",
        authorAr: "م. محمد الراشد",
        category: "Occupational Health & Safety",
        categoryAr: "الصحة والسلامة المهنية",
        tags: ["ISO 45001", "Workplace Safety", "Oil & Gas", "Construction", "Manufacturing"],
        tagsAr: ["أيزو 45001", "سلامة مكان العمل", "النفط والغاز", "البناء", "التصنيع"],
        published: true,
        metaTitle: "ISO 45001:2018 Workplace Safety Guide for GCC Industries - Asas ISO",
        metaTitleAr: "دليل سلامة مكان العمل أيزو 45001:2018 لصناعات دول مجلس التعاون - أساس أيزو",
        metaDescription: "Comprehensive ISO 45001:2018 implementation guide for oil & gas, construction, and manufacturing industries in the Gulf region.",
        metaDescriptionAr: "دليل تطبيق شامل لمعيار أيزو 45001:2018 لصناعات النفط والغاز والبناء والتصنيع في منطقة الخليج.",
        featuredImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Cybersecurity Excellence: ISO 27001:2022 for Digital Transformation in the Gulf",
        titleAr: "التميز في الأمن السيبراني: معيار أيزو 27001:2022 للتحول الرقمي في الخليج",
        slug: "iso-27001-cybersecurity-digital-transformation-gulf",
        excerpt: "Navigate the digital landscape securely with ISO 27001:2022. Essential cybersecurity framework for banking, government, and tech sectors in the GCC.",
        excerptAr: "تنقل في المشهد الرقمي بأمان مع معيار أيزو 27001:2022. إطار الأمن السيبراني الأساسي للمصارف والحكومة وقطاعات التكنولوجيا في دول مجلس التعاون.",
        content: "As GCC nations accelerate their digital transformation initiatives—from Saudi Arabia Vision 2030 to UAE Vision 2071—the need for robust cybersecurity frameworks becomes critical. ISO 27001:2022 provides the foundation for information security management that enables secure digital growth.",
        contentAr: "مع تسريع دول مجلس التعاون الخليجي لمبادرات التحول الرقمي - من رؤية السعودية 2030 إلى رؤية الإمارات 2071 - تصبح الحاجة إلى أطر الأمن السيبراني القوية بالغة الأهمية. يوفر معيار أيزو 27001:2022 الأساس لإدارة أمن المعلومات الذي يمكن النمو الرقمي الآمن.",
        author: "Dr. Khalid Al-Mansoori",
        authorAr: "د. خالد المنصوري",
        category: "Information Security",
        categoryAr: "أمن المعلومات",
        tags: ["ISO 27001", "Cybersecurity", "Digital Transformation", "Information Security", "GCC"],
        tagsAr: ["أيزو 27001", "الأمن السيبراني", "التحول الرقمي", "أمن المعلومات", "دول مجلس التعاون"],
        published: true,
        metaTitle: "ISO 27001:2022 Cybersecurity Guide for GCC Digital Transformation - Asas ISO",
        metaTitleAr: "دليل الأمن السيبراني أيزو 27001:2022 للتحول الرقمي في دول مجلس التعاون - أساس أيزو",
        metaDescription: "Comprehensive ISO 27001:2022 cybersecurity framework for banking, government, and technology sectors in the Gulf region digital transformation.",
        metaDescriptionAr: "إطار الأمن السيبراني الشامل أيزو 27001:2022 للقطاعات المصرفية والحكومية والتكنولوجيا في التحول الرقمي لمنطقة الخليج.",
        featuredImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Food Safety Excellence: ISO 22000:2018 Implementation in GCC Food Industries",
        titleAr: "التميز في سلامة الغذاء: تطبيق معيار أيزو 22000:2018 في صناعات الغذاء في دول مجلس التعاون",
        slug: "iso-22000-food-safety-gcc-food-industries",
        excerpt: "Ensure food safety throughout the supply chain with ISO 22000:2018. Essential guide for restaurants, food manufacturing, and retail businesses in the Gulf region.",
        excerptAr: "اضمن سلامة الغذاء في جميع مراحل سلسلة التوريد مع معيار أيزو 22000:2018. دليل أساسي للمطاعم وتصنيع الأغذية وشركات التجزئة في منطقة الخليج.",
        content: "The Gulf region food industry is experiencing unprecedented growth, driven by population expansion, tourism development, and economic diversification. With this growth comes increased responsibility for food safety. ISO 22000:2018 provides a comprehensive framework for managing food safety throughout the entire food chain, from farm to fork.",
        contentAr: "تشهد صناعة الأغذية في منطقة الخليج نمواً غير مسبوق، مدفوعاً بالتوسع السكاني وتطوير السياحة والتنويع الاقتصادي. مع هذا النمو تأتي مسؤولية متزايدة عن سلامة الغذاء. يوفر معيار أيزو 22000:2018 إطاراً شاملاً لإدارة سلامة الغذاء في جميع مراحل سلسلة الغذاء، من المزرعة إلى المائدة.",
        author: "Chef Omar Al-Ansari",
        authorAr: "الشيف عمر الأنصاري",
        category: "Food Safety",
        categoryAr: "سلامة الغذاء",
        tags: ["ISO 22000", "Food Safety", "HACCP", "Food Manufacturing", "Restaurants"],
        tagsAr: ["أيزو 22000", "سلامة الغذاء", "الهاسب", "تصنيع الأغذية", "المطاعم"],
        published: true,
        metaTitle: "ISO 22000:2018 Food Safety Management for GCC Food Industries - Asas ISO",
        metaTitleAr: "إدارة سلامة الغذاء أيزو 22000:2018 لصناعات الأغذية في دول مجلس التعاون - أساس أيزو",
        metaDescription: "Comprehensive guide to implementing ISO 22000:2018 food safety management systems for restaurants, food manufacturing, and retail businesses in the Gulf region.",
        metaDescriptionAr: "دليل شامل لتطبيق أنظمة إدارة سلامة الغذاء أيزو 22000:2018 للمطاعم وتصنيع الأغذية وشركات التجزئة في منطقة الخليج.",
        featuredImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Business Continuity Management: ISO 22301:2019 for GCC Organizations",
        titleAr: "إدارة استمرارية الأعمال: معيار أيزو 22301:2019 لمؤسسات دول مجلس التعاون",
        slug: "iso-22301-business-continuity-management-gcc",
        excerpt: "Build resilient organizations with ISO 22301:2019. Essential business continuity framework for protecting operations against disruptions in the Gulf region.",
        excerptAr: "بناء مؤسسات مقاومة مع معيار أيزو 22301:2019. إطار استمرارية الأعمال الأساسي لحماية العمليات من الاضطرابات في منطقة الخليج.",
        content: "In an increasingly interconnected world, GCC organizations face diverse risks—from natural disasters and cyber attacks to supply chain disruptions and economic volatility. ISO 22301:2019 provides the framework to build organizational resilience and ensure business continuity in the face of any disruption.",
        contentAr: "في عالم متزايد الترابط، تواجه مؤسسات دول مجلس التعاون مخاطر متنوعة - من الكوارث الطبيعية والهجمات السيبرانية إلى اضطرابات سلسلة التوريد والتقلبات الاقتصادية. يوفر معيار أيزو 22301:2019 الإطار لبناء المرونة المؤسسية وضمان استمرارية الأعمال في مواجهة أي اضطراب.",
        author: "Dr. Sarah Al-Mahmoud",
        authorAr: "د. سارة المحمود",
        category: "Business Continuity",
        categoryAr: "استمرارية الأعمال",
        tags: ["ISO 22301", "Business Continuity", "Risk Management", "Crisis Management", "GCC"],
        tagsAr: ["أيزو 22301", "استمرارية الأعمال", "إدارة المخاطر", "إدارة الأزمات", "دول مجلس التعاون"],
        published: true,
        metaTitle: "ISO 22301:2019 Business Continuity Management for GCC Organizations - Asas ISO",
        metaTitleAr: "إدارة استمرارية الأعمال أيزو 22301:2019 لمؤسسات دول مجلس التعاون - أساس أيزو",
        metaDescription: "Comprehensive guide to implementing ISO 22301:2019 business continuity management systems for building organizational resilience in the Gulf region.",
        metaDescriptionAr: "دليل شامل لتطبيق أنظمة إدارة استمرارية الأعمال أيزو 22301:2019 لبناء المرونة المؤسسية في منطقة الخليج.",
        featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
