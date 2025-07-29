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
                <div className="space-y-4 mb-8">
                  {TRAINING_LEVELS.map((level, index) => (
                    <div key={level.id} className="flex items-start gap-4 p-4 bg-secondary/10 rounded-lg">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h5 className="font-semibold">{level.name}</h5>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {level.duration}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{level.description}</p>
                        <p className="text-xs text-primary font-medium">
                          <Users className="w-3 h-3 inline mr-1" />
                          {level.target}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {(standard as any).specializedTrainings && (
                    <>
                      <div className="mt-6 mb-2">
                        <h5 className="text-lg font-semibold text-primary">
                          {isRTL ? 'الدورات المتخصصة' : 'Specialized Training Courses'}
                        </h5>
                      </div>
                      {(standard as any).specializedTrainings.map((training: string, index: number) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-secondary/10 rounded-lg">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {TRAINING_LEVELS.length + index + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold mb-1">{training}</h5>
                            <p className="text-sm text-muted-foreground">
                              {isRTL ? 'دورة متخصصة مصممة لتعميق الفهم في هذا المجال المحدد' : 'Specialized course designed to deepen understanding in this specific area'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
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

      {/* Training Levels */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'مستويات التدريب المتاحة' : 'Available Training Levels'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'اختر مستوى التدريب المناسب لاحتياجات مؤسستك'
                : 'Choose the training level that suits your organization\'s needs'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRAINING_LEVELS.map((level, index) => (
              <Card key={level.id} className="bg-white border-border">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {isRTL ? 
                      (level.id === 'awareness' ? 'التدريب التوعوي' : 
                       level.id === 'implementation' ? 'ورشة التنفيذ' : 
                       'تدريب المراجع الداخلي') 
                      : level.name
                    }
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{level.duration}</span>
                  </div>
                  <p className="text-muted-foreground mb-6">{level.description}</p>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{level.target}</span>
                  </div>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      {isRTL ? 'استفسر عن هذا المستوى' : 'Inquire About This Level'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
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
