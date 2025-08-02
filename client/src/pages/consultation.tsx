import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  ClipboardList, 
  DollarSign, 
  Calendar, 
  CheckCircle,
  Clock,
  Users,
  Award,
  Phone,
  Mail
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { SEOHead } from '@/components/common/seo-head';

// TypeScript declarations for Cal.com
declare global {
  interface Window {
    Cal: any;
  }
}

export default function Consultation() {
  const { t, isRTL } = useLanguage();

  // Initialize Cal.com embed with direct iframe approach
  useEffect(() => {
    const embedContainer = document.getElementById('my-cal-inline-30min');
    if (embedContainer && !embedContainer.innerHTML) {
      // Create iframe for more reliable embedding
      const iframe = document.createElement('iframe');
      iframe.src = 'https://cal.com/asasiso/30min?embed=true&theme=light';
      iframe.width = '100%';
      iframe.height = '280';
      iframe.frameBorder = '0';
      iframe.title = 'Asas ISO Consultation Booking';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
      iframe.allow = 'camera; microphone; geolocation';
      
      embedContainer.appendChild(iframe);
    }
  }, []);

  const consultationBenefits = [
    {
      icon: Search,
      title: isRTL ? 'تقييم الاحتياجات' : 'Needs Assessment',
      description: isRTL 
        ? 'سنحلل وضعك الحالي ونحدد مجالات التحسين'
        : 'We\'ll analyze your current state and identify areas for improvement'
    },
    {
      icon: ClipboardList,
      title: isRTL ? 'خطة تدريب مخصصة' : 'Customized Training Plan',
      description: isRTL 
        ? 'احصل على خارطة طريق تدريب مخصصة لمؤسستك'
        : 'Receive a tailored training roadmap for your organization'
    },
    {
      icon: DollarSign,
      title: isRTL ? 'تسعير شفاف' : 'Transparent Pricing',
      description: isRTL 
        ? 'أسعار واضحة ومقدمة بدون تكاليف خفية'
        : 'Clear, upfront pricing with no hidden costs'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: isRTL ? 'احجز استشارتك' : 'Book Your Consultation',
      description: isRTL 
        ? 'املأ النموذج أدناه أو اتصل بنا مباشرة'
        : 'Fill out the form below or call us directly'
    },
    {
      step: 2,
      title: isRTL ? 'مكالمة الاستشارة' : 'Consultation Call',
      description: isRTL 
        ? 'جلسة مدتها 30 دقيقة مع خبير أساس أيزو'
        : '30-minute session with an Asas ISO expert'
    },
    {
      step: 3,
      title: isRTL ? 'اقتراح مخصص' : 'Customized Proposal',
      description: isRTL 
        ? 'احصل على اقتراح تدريب مفصل مع الأسعار'
        : 'Receive a detailed training proposal with pricing'
    },
    {
      step: 4,
      title: isRTL ? 'ابدأ التدريب' : 'Start Training',
      description: isRTL 
        ? 'ابدأ رحلة شهادة الأيزو مع فريقنا'
        : 'Begin your ISO certification journey with our team'
    }
  ];

  return (
    <>
      <SEOHead
        title="Book Free Consultation - Asas ISO Expert Training Advice | Kuwait"
        description="Book a free consultation with Asas ISO experts. Get personalized training recommendations, needs assessment, and transparent pricing for your organization."
        keywords="free ISO consultation Kuwait, Asas ISO expert advice, ISO training consultation GCC, professional ISO assessment"
      />

      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'احجز استشارة مجانية مع خبير أساس أيزو' : 'Book a Free Consultation with an Asas ISO Expert'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {isRTL 
                ? 'احصل على تقييم شخصي للاحتياجات وخطة تدريب مخصصة وأسعار شفافة لمؤسستك'
                : 'Get a personalized needs assessment, customized training plan, and transparent pricing for your organization'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Cal.com Booking Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {isRTL ? 'احجز استشارتك المجانية' : 'Book Your Free Consultation'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {isRTL 
                  ? 'اختر الوقت المناسب لك واحصل على استشارة شخصية مع خبير أساس أيزو'
                  : 'Choose a convenient time and get personalized advice from an Asas ISO expert'
                }
              </p>
            </div>

            {/* Cal.com Integration - Full Width */}
            <div className="mb-8">
              <Card className="border-border">
                <CardContent className="p-8">
                  <div className="cal-embed-container" style={{ height: '280px', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{width:'100%',height:'280px'}} id="my-cal-inline-30min"></div>
                  </div>
                  
                  {/* Fallback Button */}
                  <div className="text-center mt-6">
                    <Button 
                      variant="outline"
                      onClick={() => window.open('https://cal.com/asasiso/30min', '_blank')}
                      className="px-8 py-3"
                    >
                      {isRTL ? 'افتح في نافذة جديدة' : 'Open in New Window'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Why Choose Us & Contact Info - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    {isRTL ? 'لماذا تختار أساس أيزو؟' : 'Why Choose Asas ISO?'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-base">
                        {isRTL ? 'مدربون معتمدون دولياً مع خبرة في المنطقة' : 'Internationally certified trainers with regional expertise'}
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-base">
                        {isRTL ? 'برامج تدريب مخصصة للصناعات الإقليمية' : 'Training programs customized for regional industries'}
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-base">
                        {isRTL ? 'خيارات تسليم مرنة (داخلي وأونلاين)' : 'Flexible delivery options (in-house and online)'}
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-base">
                        {isRTL ? 'نهج عملي يركز على النتائج' : 'Practical, results-oriented approach'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    {isRTL ? 'أو تواصل معنا مباشرة' : 'Or Contact Us Directly'}
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 justify-center">
                      <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                      <a href="tel:+96569668726" className="text-lg hover:text-primary transition-colors font-medium">
                        +965 69668726
                      </a>
                    </div>
                    <div className="flex items-center gap-4 justify-center">
                      <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                      <a href="mailto:support@asasiso.com" className="text-lg hover:text-primary transition-colors font-medium">
                        support@asasiso.com
                      </a>
                    </div>
                    <div className="flex items-start gap-4 justify-center">
                      <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div className="text-center">
                        <p className="text-lg font-medium">{isRTL ? 'الأحد - الخميس: 9ص - 6م' : 'Sunday - Thursday: 9AM - 6PM'}</p>
                        <p className="text-base text-muted-foreground">{isRTL ? 'توقيت الكويت (GMT+3)' : 'Kuwait Time (GMT+3)'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Benefits */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'ما ستحصل عليه من الاستشارة' : 'What You\'ll Get from the Consultation'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'استشارتنا المجانية مصممة لفهم احتياجاتك وتقديم التوجيه المهني'
                : 'Our free consultation is designed to understand your needs and provide professional guidance'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {consultationBenefits.map((benefit, index) => (
              <Card key={index} className="border-border text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'كيف تعمل العملية' : 'How the Process Works'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'عملية بسيطة من أربع خطوات للحصول على التدريب المناسب لمؤسستك'
                : 'A simple four-step process to get the right training for your organization'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="bg-white border-border text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
