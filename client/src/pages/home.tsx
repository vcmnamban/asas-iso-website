import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { 
  GraduationCap, 
  Calculator, 
  Calendar, 
  Medal, 
  Leaf, 
  Shield, 
  Lock, 
  RotateCcw, 
  Server, 
  Utensils,
  Star,
  CheckCircle,
  Award,
  Building,
  Target,
  Settings
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { SEOHead } from '@/components/common/seo-head';
import { ISO_STANDARDS, BLOG_POSTS } from '@/lib/constants';

export default function Home() {
  const { t, isRTL } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const iconMap = {
    'iso-9001': Medal,
    'iso-14001': Leaf,
    'iso-45001': Shield,
    'iso-27001': Lock,
    'iso-22301': RotateCcw,
    'iso-20000': Server,
    'iso-22000': Utensils,
  };

  const colorMap = {
    'blue': 'bg-blue-500',
    'green': 'bg-green-500',
    'orange': 'bg-orange-500',
    'red': 'bg-red-500',
    'purple': 'bg-purple-500',
    'indigo': 'bg-indigo-500',
    'teal': 'bg-teal-500',
  };

  return (
    <>
      <SEOHead
        title="Asas ISO - The Foundation for Your Certification Success | Kuwait"
        description="Professional ISO training company based in Kuwait, serving the GCC region with certified courses in ISO 9001, 14001, 45001, 27001, and more."
        keywords="Asas ISO, ISO training Kuwait, ISO internal auditor Saudi Arabia, ISO 45001 Oman, ISO certification GCC"
      />

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-10" 
             style={{
               backgroundImage: 'url(https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80)'
             }}></div>
        
        <div className="relative container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-slide-up">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
              <Button onClick={() => scrollToSection('services')} className="btn-primary">
                <GraduationCap className="mr-2 w-5 h-5" />
                {t('viewCourses')}
              </Button>
              <Button onClick={() => scrollToSection('contact')} variant="secondary" className="btn-secondary">
                <Calculator className="mr-2 w-5 h-5" />
                {t('requestQuote')}
              </Button>
              <Button onClick={() => scrollToSection('consultation')} variant="outline" className="btn-outline">
                <Calendar className="mr-2 w-5 h-5" />
                {t('scheduleConsultation')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core ISO Training Services */}
      <section id="services" className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {isRTL ? 'خدمات التدريب الأساسية على الأيزو' : 'Our Core ISO Training Services'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'برامج التدريب التأسيسي والمراجعة الداخلية المصممة لصناعات دول مجلس التعاون الخليجي الرئيسية'
                : 'Foundation and internal auditor training programs designed for the GCC region\'s key industries'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ISO_STANDARDS.map((standard) => {
              const IconComponent = iconMap[standard.id as keyof typeof iconMap];
              const colorClass = colorMap[standard.color as keyof typeof colorMap];
              
              return (
                <Card key={standard.id} className="card-hover bg-white border-border">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{standard.code}</h3>
                    <p className="text-muted-foreground mb-4">{standard.name}</p>
                    <div className="space-y-1 mb-6">
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4" />
                        {t('awarenessTraining')}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4" />
                        {t('implementationWorkshop')}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4" />
                        {t('internalAuditorTraining')}
                      </div>
                    </div>
                    <Link href={`/iso-courses/${standard.id}`}>
                      <Button className="w-full">
                        {t('learnMore')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Asas ISO */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'لماذا تختار أساس أيزو؟' : 'Why Choose Asas ISO?'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'بناء الأساس لمعايير الجودة والسلامة في جميع أنحاء منطقة دول مجلس التعاون الخليجي'
                : 'Building the foundation for quality and safety standards across the GCC region'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isRTL ? 'مدربون معتمدون وذوو خبرة' : 'Certified & Experienced Trainers'}
              </h3>
              <p className="text-muted-foreground">
                {isRTL 
                  ? 'يحمل مدربونا شهادات دولية مع خبرة إقليمية واسعة'
                  : 'Our trainers hold international certifications with extensive regional experience'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isRTL ? 'تدريب مخصص للصناعات الإقليمية' : 'Training Customized for Regional Industries'}
              </h3>
              <p className="text-muted-foreground">
                {isRTL 
                  ? 'محتوى مخصص لقطاعات الطاقة والبناء والتكنولوجيا في دول مجلس التعاون الخليجي'
                  : 'Tailored content for energy, construction, and technology sectors in the GCC'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isRTL ? 'خيارات تسليم مرنة' : 'Flexible Delivery Options'}
              </h3>
              <p className="text-muted-foreground">
                {isRTL 
                  ? 'تنسيقات التدريب الداخلي والمباشر والعام لتناسب احتياجات عملك'
                  : 'In-house, online, and public training formats to suit your business needs'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isRTL ? 'نهج عملي يركز على النتائج' : 'Practical, Results-Oriented Approach'}
              </h3>
              <p className="text-muted-foreground">
                {isRTL 
                  ? 'التركيز على التطبيق العملي والنتائج القابلة للقياس'
                  : 'Focus on real-world application and measurable outcomes'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'ما يقوله عملاؤنا' : 'What Our Clients Say'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'موثوق به من قبل المؤسسات الرائدة في جميع أنحاء منطقة دول مجلس التعاون الخليجي'
                : 'Trusted by leading organizations across the GCC region'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <div className="font-semibold">Ahmed Al-Rashid</div>
                    <div className="text-sm text-muted-foreground">Quality Manager, Kuwait Energy Co.</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "Asas ISO's training programs helped us achieve ISO 9001 certification ahead of schedule. Their practical approach and regional expertise made all the difference."
                </p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Al-Fares</div>
                    <div className="text-sm text-muted-foreground">HSE Director, Saudi Construction Ltd.</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "The ISO 45001 internal auditor training was exceptional. The trainers understood our industry challenges and provided relevant examples from the Saudi market."
                </p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <div className="font-semibold">Mohammed Al-Balushi</div>
                    <div className="text-sm text-muted-foreground">IT Manager, Oman Tech Solutions</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "Asas ISO's ISO 27001 training was perfectly tailored to our needs. The online delivery was seamless, and the content was highly relevant to our operations in Oman."
                </p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section id="blog" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'أحدث الأفكار' : 'Latest Insights'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'ابق على اطلاع بمعايير الأيزو وأفضل الممارسات في منطقة دول مجلس التعاون الخليجي'
                : 'Stay informed about ISO standards and best practices in the GCC region'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <Card key={post.id} className="card-hover bg-white border-border overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        {t('readMore')} →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="consultation" className="section-padding hero-gradient">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isRTL ? 'احجز استشارة مجانية مع خبير أساس أيزو' : 'Book a Free Consultation with an Asas ISO Expert'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {isRTL 
              ? 'احصل على تقييم شخصي للاحتياجات وخطة تدريب مخصصة وأسعار شفافة لمؤسستك'
              : 'Get a personalized needs assessment, customized training plan, and transparent pricing for your organization'
            }
          </p>
          <Link href="/consultation">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <Calendar className="mr-2 w-5 h-5" />
              {isRTL ? 'احجز استشارة' : 'Book Consultation'}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
