import { useParams, Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Medal, 
  Leaf, 
  Shield, 
  Lock, 
  RotateCcw, 
  Server, 
  Utensils,
  Microscope,
  Clock,
  Users,
  CheckCircle,
  ArrowLeft,
  Building,
  Target,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { SEOHead } from '@/components/common/seo-head';
import { ISO_STANDARDS, TRAINING_LEVELS } from '@/lib/constants';

export default function ISODetail() {
  const { id } = useParams();
  const { t, isRTL } = useLanguage();

  const standard = ISO_STANDARDS.find(s => s.id === id);

  if (!standard) {
    return (
      <div className="section-padding">
        <div className="container-max text-center">
          <h1 className="text-3xl font-bold mb-4">
            {isRTL ? 'المعيار غير موجود' : 'Standard Not Found'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isRTL ? 'المعيار المطلوب غير متوفر.' : 'The requested standard is not available.'}
          </p>
          <Link href="/iso-courses">
            <Button>
              <ArrowLeft className="mr-2 w-4 h-4" />
              {isRTL ? 'العودة إلى الدورات' : 'Back to Courses'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const iconMap = {
    'iso-9001': Medal,
    'iso-14001': Leaf,
    'iso-45001': Shield,
    'iso-27001': Lock,
    'iso-22301': RotateCcw,
    'iso-20000': Server,
    'iso-22000': Utensils,
    'iso-17025': Microscope,
  };

  const colorMap = {
    'blue': 'bg-blue-500',
    'green': 'bg-green-500',
    'orange': 'bg-orange-500',
    'red': 'bg-red-500',
    'purple': 'bg-purple-500',
    'indigo': 'bg-indigo-500',
    'teal': 'bg-teal-500',
    'cyan': 'bg-cyan-500',
  };

  const IconComponent = iconMap[standard.id as keyof typeof iconMap];
  const colorClass = colorMap[standard.color as keyof typeof colorMap];

  return (
    <>
      <SEOHead
        title={`${standard.code} Training - ${standard.name} | Asas ISO`}
        description={`Professional ${standard.code} training in Kuwait, Saudi Arabia, and Oman. ${standard.description}`}
        keywords={`${standard.code} training, ${standard.name}, ISO training Kuwait, ${standard.id} certification`}
      />

      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 ${colorClass} rounded-full flex items-center justify-center`}>
                <IconComponent className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{standard.code}</h1>
            <h2 className="text-2xl md:text-3xl text-blue-100 mb-6">{standard.name}</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {standard.description}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="container-max py-4 px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              {isRTL ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href="/iso-courses" className="hover:text-primary">
              {isRTL ? 'دورات الأيزو' : 'ISO Courses'}
            </Link>
            <span>/</span>
            <span className="text-foreground">{standard.code}</span>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6">
                {isRTL ? 'نظرة عامة على الدورة' : 'Course Overview'}
              </h3>
              <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  {standard.description}
                </p>

                <h4 className="text-xl font-semibold mb-4">
                  {isRTL ? 'طرق التدريب المتاحة' : 'Available Training Methods'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="w-5 h-5 text-primary" />
                      <h5 className="font-semibold">{isRTL ? 'التدريب الداخلي' : 'In-house Training'}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'تدريب مخصص في موقع عملك مع محتوى مصمم خصيصاً لاحتياجاتك' : 'Customized training at your location with content tailored to your specific needs'}
                    </p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Server className="w-5 h-5 text-primary" />
                      <h5 className="font-semibold">{isRTL ? 'التدريب الإلكتروني' : 'Online Training'}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'تدريب تفاعلي عبر الإنترنت مع جلسات مباشرة ومواد تعليمية شاملة' : 'Interactive online training with live sessions and comprehensive learning materials'}
                    </p>
                  </div>
                </div>

                <h4 className="text-xl font-semibold mb-4">
                  {isRTL ? 'مستويات التدريب' : 'Training Levels'}
                </h4>
                <div className="training-cards-grid mb-8">
                  {TRAINING_LEVELS.map((level, index) => (
                    <Card key={level.id} className="bg-white border-border hover:border-primary hover:shadow-lg transition-all duration-300 group training-card">
                      <div className="card-content-fixed">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-primary/90 transition-colors">
                              {index + 1}
                            </div>
                            <Badge variant="outline" className="text-xs group-hover:border-primary group-hover:text-primary transition-colors">
                              <Clock className="w-3 h-3 mr-1" />
                              {level.duration}
                            </Badge>
                          </div>
                          <h5 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors leading-tight">{level.name}</h5>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{level.description}</p>
                          <div className="flex items-center gap-2 mb-4">
                            <Users className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors leading-relaxed">{level.target}</span>
                          </div>
                        </div>
                        <Link href="/contact">
                          <Button variant="outline" size="sm" className="w-full group-hover:border-primary group-hover:text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                            {isRTL ? 'استفسر عن هذه الدورة' : 'Inquire About This Course'}
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                  
                  {(standard as any).specializedTrainings && (
                    <div className="mt-8">
                      <h5 className="text-lg font-semibold text-primary mb-6">
                        {isRTL ? 'الدورات المتخصصة' : 'Specialized Training Courses'}
                      </h5>
                      <div className="training-cards-grid">
                        {(standard as any).specializedTrainings.map((training: string, index: number) => {
                        // Define specialized training details based on the training name
                        const getTrainingDetails = (trainingName: string) => {
                          // Common training details for different types
                          const commonDetails = {
                            duration: '1-2 Days',
                            target: isRTL ? 'جميع الموظفين والعاملين' : 'All employees and staff members'
                          };

                          // Specific descriptions based on training type
                          if (trainingName.toLowerCase().includes('root cause') || trainingName.toLowerCase().includes('corrective')) {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'تدريب شامل على تحليل الأسباب الجذرية وتطبيق الإجراءات التصحيحية الفعالة'
                                : 'Comprehensive training on root cause analysis and implementing effective corrective actions'
                            };
                          } else if (trainingName.toLowerCase().includes('process mapping') || trainingName.toLowerCase().includes('process-based')) {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'تدريب على رسم العمليات والتفكير القائم على العمليات لتحسين الأداء'
                                : 'Training on process mapping and process-based thinking for performance improvement'
                            };
                          } else if (trainingName.toLowerCase().includes('environmental') || trainingName.toLowerCase().includes('aspect')) {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'تدريب على تحديد وتقييم الجوانب والآثار البيئية'
                                : 'Training on identifying and evaluating environmental aspects and impacts'
                            };
                          } else if (trainingName.toLowerCase().includes('hira') || trainingName.toLowerCase().includes('hazard')) {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'تدريب على تحديد المخاطر وتقييم المخاطر في مكان العمل'
                                : 'Training on hazard identification and risk assessment in the workplace'
                            };
                          } else if (trainingName.toLowerCase().includes('fire safety') || trainingName.toLowerCase().includes('emergency')) {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'تدريب على إجراءات السلامة من الحرائق والاستجابة للطوارئ'
                                : 'Training on fire safety procedures and emergency response protocols'
                            };
                          } else if (trainingName.toLowerCase().includes('cybersecurity') || trainingName.toLowerCase().includes('information security')) {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'تدريب على أسس الأمن السيبراني وحماية المعلومات'
                                : 'Training on cybersecurity fundamentals and information protection'
                            };
                          } else if (trainingName.toLowerCase().includes('haccp') || trainingName.toLowerCase().includes('food safety')) {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'تدريب على نظام تحليل المخاطر ونقاط التحكم الحرجة'
                                : 'Training on Hazard Analysis and Critical Control Points system'
                            };
                          } else if (trainingName.toLowerCase().includes('business continuity') || trainingName.toLowerCase().includes('bia')) {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'تدريب على تحليل تأثير الأعمال واستمرارية العمليات'
                                : 'Training on business impact analysis and operational continuity'
                            };
                          } else if (trainingName.toLowerCase().includes('service desk') || trainingName.toLowerCase().includes('incident')) {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'تدريب على إدارة خدمة المساعدة والاستجابة للحوادث'
                                : 'Training on service desk management and incident response'
                            };
                          } else if (trainingName.toLowerCase().includes('measurement') || trainingName.toLowerCase().includes('uncertainty')) {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'تدريب على قياس عدم اليقين في القياسات والاختبارات'
                                : 'Training on measurement uncertainty in testing and calibration'
                            };
                          } else {
                            return {
                              ...commonDetails,
                              description: isRTL 
                                ? 'دورة متخصصة مصممة لتعميق الفهم في هذا المجال المحدد'
                                : 'Specialized course designed to deepen understanding in this specific area'
                            };
                          }
                        };

                        const details = getTrainingDetails(training);

                        return (
                          <Card key={index} className="bg-white border-border hover:border-primary hover:shadow-lg transition-all duration-300 group training-card">
                            <div className="card-content-fixed">
                              <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-primary/90 transition-colors">
                                    {TRAINING_LEVELS.length + index + 1}
                                  </div>
                                  <Badge variant="outline" className="text-xs group-hover:border-primary group-hover:text-primary transition-colors">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {details.duration}
                                  </Badge>
                                </div>
                                <h5 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors leading-tight">{training}</h5>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{details.description}</p>
                                <div className="flex items-center gap-2 mb-4">
                                  <Users className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                  <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors leading-relaxed">{details.target}</span>
                                </div>
                              </div>
                              <Link href="/contact">
                                <Button variant="outline" size="sm" className="w-full group-hover:border-primary group-hover:text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                                  {isRTL ? 'استفسر عن هذه الدورة' : 'Inquire About This Course'}
                                </Button>
                              </Link>
                            </div>
                          </Card>
                        );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <h4 className="text-xl font-semibold mb-4">
                  {isRTL ? 'الفوائد الرئيسية' : 'Key Benefits'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {standard.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-semibold mb-4">
                  {isRTL ? 'الصناعات المستهدفة' : 'Target Industries'}
                </h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {standard.industries.map((industry) => (
                    <Badge key={industry} variant="secondary" className="flex items-center gap-2">
                      <Building className="w-3 h-3" />
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Card className="border-border sticky top-4">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-4">
                    {isRTL ? 'تفاصيل الدورة' : 'Course Details'}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {isRTL ? 'مستويات التدريب' : 'Training Levels'}
                        </div>
                        <div className="text-sm text-muted-foreground">3 levels available</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {isRTL ? 'طرق التسليم' : 'Delivery Methods'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {isRTL ? 'داخلي، أونلاين' : 'In-house, Online'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {isRTL ? 'الشهادة' : 'Certification'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {isRTL ? 'شهادة إتمام' : 'Certificate of completion'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <Link href="/contact">
                      <Button className="w-full">
                        {isRTL ? 'سجل الآن' : 'Register Now'}
                      </Button>
                    </Link>
                    <Link href="/consultation">
                      <Button variant="outline" className="w-full">
                        {isRTL ? 'احجز استشارة' : 'Book Consultation'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>



      {/* Related Courses */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'دورات ذات صلة' : 'Related Courses'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'استكشف دورات الأيزو الأخرى التي قد تهم مؤسستك'
                : 'Explore other ISO courses that might interest your organization'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ISO_STANDARDS.filter(s => s.id !== standard.id).slice(0, 3).map((relatedStandard) => {
              const RelatedIcon = iconMap[relatedStandard.id as keyof typeof iconMap];
              const relatedColorClass = colorMap[relatedStandard.color as keyof typeof colorMap];
              
              return (
                <Card key={relatedStandard.id} className="card-hover bg-white border-border">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${relatedColorClass} rounded-full flex items-center justify-center mb-4`}>
                      <RelatedIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{relatedStandard.code}</h3>
                    <p className="text-muted-foreground mb-4">{relatedStandard.name}</p>
                    <Link href={`/iso-courses/${relatedStandard.id}`}>
                      <Button variant="outline" size="sm">
                        {isRTL ? 'عرض التفاصيل' : 'View Details'}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
