import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
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
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { SEOHead } from '@/components/common/seo-head';
import { ISO_STANDARDS, TRAINING_LEVELS } from '@/lib/constants';

export default function ISOCourses() {
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const categories = [
    { id: 'all', name: isRTL ? 'جميع المعايير' : 'All Standards' },
    { id: 'management', name: isRTL ? 'أنظمة الإدارة' : 'Management Systems' },
    { id: 'security', name: isRTL ? 'الأمن والسلامة' : 'Security & Safety' },
    { id: 'technology', name: isRTL ? 'التكنولوجيا' : 'Technology' },
  ];

  const filteredStandards = selectedCategory === 'all' 
    ? ISO_STANDARDS 
    : ISO_STANDARDS.filter(standard => {
        if (selectedCategory === 'management') {
          return ['iso-9001', 'iso-14001', 'iso-22301'].includes(standard.id);
        }
        if (selectedCategory === 'security') {
          return ['iso-45001', 'iso-27001'].includes(standard.id);
        }
        if (selectedCategory === 'technology') {
          return ['iso-20000', 'iso-22000', 'iso-17025'].includes(standard.id);
        }
        return true;
      });

  return (
    <>
      <SEOHead
        title="ISO Training Courses - Asas ISO | Kuwait, Saudi Arabia, Oman"
        description="Comprehensive ISO training courses including ISO 9001, 14001, 45001, 27001, and more. Professional training for Kuwait, Saudi Arabia, and Oman."
        keywords="ISO training courses, ISO 9001 training Kuwait, ISO 14001 Saudi Arabia, ISO 45001 Oman, ISO certification training"
      />

      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'دورات تدريب الأيزو' : 'ISO Training Courses'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {isRTL 
                ? 'برامج تدريب شاملة على معايير الأيزو مصممة للمهنيين في منطقة دول مجلس التعاون الخليجي'
                : 'Comprehensive ISO standards training programs designed for professionals in the GCC region'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {isRTL ? 'مدربون معتمدون' : 'Certified Trainers'}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {isRTL ? 'محتوى إقليمي' : 'Regional Content'}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {isRTL ? 'نهج عملي' : 'Practical Approach'}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Training Overview */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {TRAINING_LEVELS.map((level) => (
              <Card key={level.id} className="border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isRTL ? 
                      (level.id === 'awareness' ? 'التدريب التوعوي' : 
                       level.id === 'implementation' ? 'ورشة التنفيذ' : 
                       'تدريب المراجع الداخلي') 
                      : level.name
                    }
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{level.duration}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{level.description}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{level.target}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'استكشف دوراتنا' : 'Explore Our Courses'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {isRTL 
                ? 'اختر من مجموعة شاملة من دورات تدريب الأيزو المصممة للصناعات الرئيسية'
                : 'Choose from our comprehensive range of ISO training courses designed for key industries'
              }
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* ISO Standards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStandards.map((standard) => {
              const IconComponent = iconMap[standard.id as keyof typeof iconMap];
              const colorClass = colorMap[standard.color as keyof typeof colorMap];
              
              // Skip rendering if icon or color is undefined
              if (!IconComponent || !colorClass) {
                console.warn(`Missing icon or color for standard: ${standard.id}`);
                return null;
              }
              
              return (
                <Card key={standard.id} className="card-hover bg-white border-border">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{standard.code}</h3>
                    <p className="text-muted-foreground mb-4">{standard.name}</p>
                    <p className="text-sm text-muted-foreground mb-4">{standard.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          {isRTL ? 'الصناعات الرئيسية:' : 'Key Industries:'}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {standard.industries.slice(0, 2).map((industry) => (
                            <Badge key={industry} variant="secondary" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                          {standard.industries.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{standard.industries.length - 2} {isRTL ? 'المزيد' : 'more'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          {isRTL ? 'الفوائد الرئيسية:' : 'Key Benefits:'}
                        </h4>
                        <div className="space-y-1">
                          {standard.benefits.slice(0, 2).map((benefit) => (
                            <div key={benefit} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-muted-foreground">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {(standard as any).specializedTrainings && (
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            {isRTL ? 'دورات متخصصة:' : 'Specialized Trainings:'}
                          </h4>
                          <div className="space-y-1">
                            {(standard as any).specializedTrainings.slice(0, 2).map((training: string) => (
                              <div key={training} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                <span className="text-xs text-muted-foreground leading-tight">{training}</span>
                              </div>
                            ))}
                            {(standard as any).specializedTrainings.length > 2 && (
                              <div className="text-xs text-primary font-medium">
                                +{(standard as any).specializedTrainings.length - 2} {isRTL ? 'المزيد' : 'more'}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Link href={`/iso-courses/${standard.id}`}>
                        <Button className="w-full">
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </Link>
                      <div className="text-center">
                        <span className="text-xs text-muted-foreground">
                          {isRTL ? 'متوفر بثلاث مستويات تدريب' : 'Available in 3 training levels'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'هل تحتاج إلى مساعدة في اختيار الدورة المناسبة؟' : 'Need Help Choosing the Right Course?'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {isRTL 
              ? 'فريقنا من الخبراء هنا لمساعدتك في اختيار أفضل برنامج تدريب لمؤسستك'
              : 'Our team of experts is here to help you choose the best training program for your organization'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <Button size="lg" className="btn-primary">
                {isRTL ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="btn-outline">
                {isRTL ? 'اتصل بنا' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
