export const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'ISO Training',
    trainingServices: 'Training Services',
    blog: 'Insights',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Asas ISO: The Foundation for Your Certification Success',
    heroSubtitle: 'Proudly based in Kuwait, serving businesses across the GCC',
    viewCourses: 'View Our Courses',
    requestQuote: 'Request a Quote',
    scheduleConsultation: 'Schedule a Consultation',
    
    // Common
    learnMore: 'Learn More',
    readMore: 'Read More',
    getStarted: 'Get Started',
    contactUs: 'Contact Us',
    
    // ISO Standards
    qualityManagement: 'Quality Management Systems',
    environmentalManagement: 'Environmental Management Systems',
    occupationalHealthSafety: 'Occupational Health & Safety Management',
    informationSecurity: 'Information Security Management',
    businessContinuity: 'Business Continuity Management',
    itServiceManagement: 'IT Service Management',
    foodSafety: 'Food Safety Management',
    
    // Training Levels
    awarenessTraining: 'Awareness Training',
    implementationWorkshop: 'Implementation Workshop',
    internalAuditorTraining: 'Internal Auditor Training',
    
    // Company
    companyName: 'Asas ISO',
    companyTagline: 'The Foundation for Your Certification Success',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'تدريب الأيزو',
    trainingServices: 'خدمات التدريب',
    blog: 'المقالات',
    contact: 'اتصل بنا',
    
    // Hero Section
    heroTitle: 'أساس أيزو: الأساس لنجاح شهادتك',
    heroSubtitle: 'مقرها في الكويت بفخر، نخدم الشركات في جميع أنحاء دول مجلس التعاون الخليجي',
    viewCourses: 'اعرض دوراتنا',
    requestQuote: 'اطلب عرض أسعار',
    scheduleConsultation: 'حدد موعد استشارة',
    
    // Common
    learnMore: 'اعرف المزيد',
    readMore: 'اقرأ المزيد',
    getStarted: 'ابدأ الآن',
    contactUs: 'اتصل بنا',
    
    // ISO Standards
    qualityManagement: 'أنظمة إدارة الجودة',
    environmentalManagement: 'أنظمة الإدارة البيئية',
    occupationalHealthSafety: 'إدارة الصحة والسلامة المهنية',
    informationSecurity: 'إدارة أمن المعلومات',
    businessContinuity: 'إدارة استمرارية الأعمال',
    itServiceManagement: 'إدارة خدمات تقنية المعلومات',
    foodSafety: 'إدارة سلامة الغذاء',
    
    // Training Levels
    awarenessTraining: 'التدريب التوعوي',
    implementationWorkshop: 'ورشة التنفيذ',
    internalAuditorTraining: 'تدريب المراجع الداخلي',
    
    // Company
    companyName: 'أساس أيزو',
    companyTagline: 'الأساس لنجاح شهادتك',
  }
};

export type Language = 'en' | 'ar';
export type TranslationKey = keyof typeof translations.en;
