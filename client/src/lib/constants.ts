export const ISO_STANDARDS = [
  {
    id: 'iso-9001',
    code: 'ISO 9001:2015',
    name: 'Quality Management Systems',
    icon: '🏆',
    color: 'blue',
    description: 'Establish quality management systems that consistently meet customer and regulatory requirements.',
    industries: ['Manufacturing', 'Service Industries', 'Healthcare', 'Education', 'Trading and Contracting Companies'],
    benefits: [
      'Improved customer satisfaction',
      'Better operational efficiency',
      'Enhanced credibility',
      'Reduced waste and costs'
    ],
    specializedTrainings: [
      'Root Cause Analysis & Corrective Action',
      'Process Mapping & Process-Based Thinking'
    ]
  },
  {
    id: 'iso-14001',
    code: 'ISO 14001:2015',
    name: 'Environmental Management Systems',
    icon: '🌱',
    color: 'green',
    description: 'Manage environmental responsibilities and reduce environmental impact systematically.',
    industries: ['Manufacturing', 'Oil & Gas', 'Construction Companies', 'Energy', 'Trading and Contracting Companies'],
    benefits: [
      'Reduced environmental impact',
      'Compliance with regulations',
      'Cost savings through efficiency',
      'Enhanced reputation'
    ],
    specializedTrainings: [
      'Environmental Aspect and Impact Assessment'
    ]
  },
  {
    id: 'iso-45001',
    code: 'ISO 45001:2018',
    name: 'Occupational Health & Safety Management',
    icon: '🛡️',
    color: 'orange',
    description: 'Protect workers and create safe, healthy working environments.',
    industries: ['Construction Companies', 'Oil & Gas', 'Manufacturing', 'Mining', 'Trading and Contracting Companies'],
    benefits: [
      'Reduced workplace injuries',
      'Lower insurance costs',
      'Improved employee morale',
      'Legal compliance'
    ],
    specializedTrainings: [
      'Hazard Identification and Risk Assessment (HIRA)',
      'Fire Saftey and Fire Fighting Techniques',
      'Behavior‑Based Safety (BBS)',
      'Emergency Preparedness and Response'
    ]
  },
  {
    id: 'iso-27001',
    code: 'ISO 27001:2022',
    name: 'Information Security Management',
    icon: '🔒',
    color: 'red',
    description: 'Protect information assets and manage cybersecurity risks effectively.',
    industries: ['Technology', 'Financial Services', 'Government', 'Healthcare', 'Oil & Gas'],
    benefits: [
      'Enhanced data protection',
      'Reduced security incidents',
      'Competitive advantage',
      'Regulatory compliance'
    ],
    specializedTrainings: [
      'Information Security Risk Assessment & Treatment',
      'Cybersecurity Fundamentals for Staff',
      'Personal Identifiable Information (PII) Protection',
      'Cloud Security Awareness'
    ]
  },
  {
    id: 'iso-22301',
    code: 'ISO 22301:2019',
    name: 'Business Continuity Management',
    icon: '🔄',
    color: 'purple',
    description: 'Ensure business continuity and resilience against disruptions.',
    industries: ['All Industries', 'Financial Services', 'Government', 'Healthcare', 'Oil & Gas', 'Trading and Contracting Companies'],
    benefits: [
      'Faster recovery from disruptions',
      'Reduced downtime costs',
      'Enhanced reputation',
      'Stakeholder confidence'
    ],
    specializedTrainings: [
      'Business Impact Analysis (BIA) Training',
      'Risk Assessment & Continuity Strategy Development',
      'Developing and Testing Business Continuity Plans (BCP)'
    ]
  },
  {
    id: 'iso-20000',
    code: 'ISO 20000-1:2018',
    name: 'IT Service Management',
    icon: '💻',
    color: 'indigo',
    description: 'Deliver high-quality IT services that meet business and customer needs.',
    industries: ['Technology', 'Financial Services', 'Telecommunications', 'Government', 'Oil & Gas'],
    benefits: [
      'Improved service quality',
      'Better customer satisfaction',
      'Reduced IT costs',
      'Enhanced efficiency'
    ],
    specializedTrainings: [
      'Service Desk and Incident Management'
    ]
  },
  {
    id: 'iso-22000',
    code: 'ISO 22000:2018',
    name: 'Food Safety Management',
    icon: '🍽️',
    color: 'teal',
    description: 'Ensure food safety throughout the entire food chain.',
    industries: ['Food Manufacturing', 'Restaurants', 'Retail', 'Agriculture', 'Trading and Contracting Companies'],
    benefits: [
      'Enhanced food safety',
      'Reduced contamination risks',
      'Market access',
      'Consumer confidence'
    ],
    specializedTrainings: [
      'Hazard Analysis and Critical Control Points (HACCP)',
      'PRP (Pre-Requisite Programs) and GHP (Good Hygiene Practices)',
      'Food Safety Culture and Behavior Training'
    ]
  },
  {
    id: 'iso-17025',
    code: 'ISO 17025:2017',
    name: 'Testing and Calibration Laboratories',
    icon: '🔬',
    color: 'cyan',
    description: 'Demonstrate competence and reliability of testing and calibration laboratories.',
    industries: ['Laboratories', 'Healthcare', 'Manufacturing', 'Environmental Testing', 'Oil & Gas'],
    benefits: [
      'Enhanced credibility and competence',
      'International recognition',
      'Improved quality of results',
      'Market access and compliance'
    ],
    specializedTrainings: [
      'Measurement Uncertainty and Statistical Analysis',
      'Test Method Validation and Verification',
      'Sampling Techniques and Handling Procedures'
    ]
  }
];

export const TRAINING_LEVELS = [
  {
    id: 'awareness',
    name: 'Awareness Training',
    duration: '1 Day',
    description: 'Introduction to ISO standards for all employees',
    target: 'All employees and staff members'
  },
  {
    id: 'implementation',
    name: 'Implementation Workshop',
    duration: '2-3 Days',
    description: 'Practical guide for managers and implementation teams',
    target: 'Managers and implementation teams'
  },
  {
    id: 'internal-auditor',
    name: 'Internal Auditor Training',
    duration: '3-5 Days',
    description: 'Comprehensive training to conduct internal audits',
    target: 'Internal auditors and quality professionals'
  }
];

export const COUNTRIES = [
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'OTHER', name: 'Other', flag: '🌍' }
];

export const COMPANY_INFO = {
  name: 'Asas ISO',
  tagline: 'The Foundation for Your Certification Success',
  description: 'Professional ISO training company based in Kuwait, serving the GCC region',
  parentCompany: 'Al Noor International Consultants',
  parentWebsite: 'https://alnoor-consultants.com/',
  address: '5th Floor, Panasonic Tower, Qibla, Kuwait City',
  phone: '+965 69668726',
  email: 'support@asasiso.com',
  linkedin: 'linkedin.com/company/asas-iso',
  website: 'www.asasiso.com'
};

export const BLOG_POSTS = [
  {
    id: 'iso-9001-kuwait',
    title: 'Building a Strong Foundation with ISO 9001: A Guide for Kuwaiti Businesses',
    excerpt: 'Learn how Kuwaiti businesses can leverage ISO 9001 to enhance their competitive edge in the regional market...',
    category: 'ISO 9001',
    readTime: '5 min read',
    date: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'iso-27001-saudi',
    title: 'The Rise of ISO 27001 in Saudi Arabia\'s Tech Sector',
    excerpt: 'Discover how Saudi technology companies are implementing ISO 27001 to meet Vision 2030 cybersecurity requirements...',
    category: 'ISO 27001',
    readTime: '7 min read',
    date: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'iso-45001-oman',
    title: 'ISO 45001 Implementation in Oman\'s Industrial Sector',
    excerpt: 'A comprehensive look at how Omani industries are adopting ISO 45001 to enhance workplace safety standards...',
    category: 'ISO 45001',
    readTime: '6 min read',
    date: '2024-03-05',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];
