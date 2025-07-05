import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Globe, Target, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { SEOHead } from '@/components/common/seo-head';

export default function About() {
  const { t, isRTL } = useLanguage();

  return (
    <>
      <SEOHead
        title="About Asas ISO - Leading ISO Training Company in Kuwait | GCC Region"
        description="Learn about Asas ISO's mission to build quality and safety standards across the GCC region. Professional ISO training based in Kuwait."
        keywords="About Asas ISO, ISO training Kuwait, GCC ISO certification, Kuwait training company"
      />

      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'من نحن' : 'About Asas ISO'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {isRTL 
                ? 'نحن نبني الأساس لمعايير الجودة والسلامة في منطقة دول مجلس التعاون الخليجي'
                : 'We build the foundation for quality and safety standards across the GCC region'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {isRTL ? 'مهمتنا' : 'Our Mission'}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isRTL 
                  ? 'في أساس أيزو، مهمتنا هي بناء الأساس لمعايير الجودة والسلامة في جميع أنحاء منطقة دول مجلس التعاون الخليجي. نحن ملتزمون بتمكين المؤسسات من خلال برامج التدريب المهنية على الأيزو التي تحقق نتائج قابلة للقياس.'
                  : 'At Asas ISO, our mission is to build the foundation for quality and safety standards across the GCC region. We are committed to empowering organizations through professional ISO training programs that deliver measurable results.'
                }
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isRTL 
                  ? 'تسجيلنا الرسمي ومقرنا في الكويت يعكس التزامنا بالتنمية المحلية والإقليمية، مما يضمن أن برامج التدريب الخاصة بنا تتماشى مع احتياجات الأعمال الفريدة في المنطقة.'
                  : 'Our official registration and base in Kuwait reflects our commitment to local and regional development, ensuring our training programs align with the unique business needs of the region.'
                }
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="text-sm">
                  {isRTL ? 'مسجلة في الكويت' : 'Registered in Kuwait'}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {isRTL ? 'تخدم دول مجلس التعاون الخليجي' : 'Serving GCC Region'}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {isRTL ? 'شركة تدريب مهنية' : 'Professional Training Company'}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-hover">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">7+</h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'معايير أيزو' : 'ISO Standards'}
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">500+</h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'المهنيين المدربين' : 'Professionals Trained'}
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">6</h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'دول دول مجلس التعاون الخليجي' : 'GCC Countries'}
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">100%</h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'معدل النجاح' : 'Success Rate'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'قيمنا' : 'Our Values'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'القيم الأساسية التي توجه نهجنا في التدريب والتطوير المهني'
                : 'Core values that guide our approach to training and professional development'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'التميز' : 'Excellence'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'نحن نسعى للحصول على أعلى معايير الجودة في جميع برامج التدريب لدينا'
                    : 'We strive for the highest standards of quality in all our training programs'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'النزاهة' : 'Integrity'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'نحن نعمل بشفافية وصدق، مما يضمن ثقة عملائنا وشركائنا'
                    : 'We operate with transparency and honesty, ensuring the trust of our clients and partners'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'التعاون' : 'Collaboration'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'نؤمن بقوة الشراكة والعمل معًا لتحقيق النجاح المشترك'
                    : 'We believe in the power of partnership and working together to achieve mutual success'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'التركيز على النتائج' : 'Results-Focused'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'نركز على تحقيق نتائج قابلة للقياس والتأثير الإيجابي على أعمال عملائنا'
                    : 'We focus on delivering measurable results and positive impact on our clients\' businesses'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'الخبرة الإقليمية' : 'Regional Expertise'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'نحن نفهم السياق الثقافي والتجاري الفريد لمنطقة دول مجلس التعاون الخليجي'
                    : 'We understand the unique cultural and business context of the GCC region'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'التحسين المستمر' : 'Continuous Improvement'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'نحن نسعى باستمرار لتحسين برامجنا ومواكبة أحدث معايير الأيزو'
                    : 'We continuously strive to improve our programs and stay current with the latest ISO standards'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'فريقنا من الخبراء' : 'Our Expert Team'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'فريق من المدربين المعتمدين دوليًا مع خبرة واسعة في أسواق الكويت والمملكة العربية السعودية وعمان'
                : 'A team of internationally certified trainers with extensive experience in Kuwait, Saudi Arabia, and Oman markets'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member Placeholders */}
            <Card className="bg-white border-border">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isRTL ? 'أحمد الخبير' : 'Ahmed Al-Khabeer'}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {isRTL ? 'كبير المدربين - الأيزو 9001 و 14001' : 'Senior Trainer - ISO 9001 & 14001'}
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{isRTL ? 'مدرب معتمد دوليًا' : 'Internationally Certified'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{isRTL ? '15+ سنة خبرة' : '15+ Years Experience'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{isRTL ? 'خبرة في الشرق الأوسط' : 'Middle East Expertise'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-border">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isRTL ? 'فاطمة الخبيرة' : 'Fatima Al-Khabeera'}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {isRTL ? 'مدربة أول - الأيزو 45001 و 27001' : 'Lead Trainer - ISO 45001 & 27001'}
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{isRTL ? 'مدربة معتمدة دوليًا' : 'Internationally Certified'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{isRTL ? '12+ سنة خبرة' : '12+ Years Experience'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{isRTL ? 'خبرة في دول الخليج' : 'GCC Region Expertise'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-border">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isRTL ? 'محمد الخبير' : 'Mohammed Al-Khabeer'}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {isRTL ? 'مدرب خبير - الأيزو 22301 و 20000' : 'Expert Trainer - ISO 22301 & 20000'}
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{isRTL ? 'مدرب معتمد دوليًا' : 'Internationally Certified'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{isRTL ? '10+ سنة خبرة' : '10+ Years Experience'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{isRTL ? 'خبرة في التكنولوجيا' : 'Technology Expertise'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'لماذا تختار أساس أيزو' : 'Why Choose Asas ISO'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'الأسباب التي تجعلنا الخيار الأول لتدريب الأيزو في منطقة دول مجلس التعاون الخليجي'
                : 'The reasons that make us the first choice for ISO training in the GCC region'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isRTL ? 'مسجلة رسميًا في الكويت' : 'Officially Registered in Kuwait'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL 
                      ? 'شركة مسجلة رسميًا في الكويت مع جميع التراخيص والشهادات اللازمة'
                      : 'Officially registered company in Kuwait with all necessary licenses and certifications'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isRTL ? 'فهم عميق للثقافة المحلية' : 'Deep Understanding of Local Culture'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL 
                      ? 'نحن نفهم البيئة التجارية والثقافية الفريدة في منطقة دول مجلس التعاون الخليجي'
                      : 'We understand the unique business and cultural environment of the GCC region'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isRTL ? 'تركيز على الصناعات الرئيسية' : 'Focus on Key Industries'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL 
                      ? 'خبرة متخصصة في الطاقة والبناء والتكنولوجيا والقطاعات الحيوية الأخرى'
                      : 'Specialized expertise in energy, construction, technology, and other vital sectors'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isRTL ? 'مدربون معتمدون دوليًا' : 'Internationally Certified Trainers'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL 
                      ? 'فريق من المدربين المعتمدين دوليًا مع خبرة واسعة في المنطقة'
                      : 'Team of internationally certified trainers with extensive regional experience'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isRTL ? 'نهج عملي مثبت' : 'Proven Practical Approach'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL 
                      ? 'منهجية تدريب مثبتة تركز على التطبيق العملي والنتائج القابلة للقياس'
                      : 'Proven training methodology focused on practical application and measurable results'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isRTL ? 'دعم مستمر بعد التدريب' : 'Ongoing Post-Training Support'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL 
                      ? 'دعم مستمر لعملائنا بعد انتهاء البرامج التدريبية لضمان نجاح التطبيق'
                      : 'Continued support for our clients after training programs to ensure successful implementation'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
