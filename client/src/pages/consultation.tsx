import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { 
  Search, 
  ClipboardList, 
  DollarSign, 
  Calendar, 
  CheckCircle,
  Clock,
  Users,
  Award
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { SEOHead } from '@/components/common/seo-head';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertConsultationRequestSchema } from '@shared/schema';
import { COUNTRIES, ISO_STANDARDS } from '@/lib/constants';
import { z } from 'zod';

// TypeScript declarations for Cal.com
declare global {
  interface Window {
    Cal: any;
  }
}

const consultationFormSchema = insertConsultationRequestSchema.extend({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  country: z.string().min(1, 'Please select a country'),
});

type ConsultationFormData = z.infer<typeof consultationFormSchema>;

export default function Consultation() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Cal.com embed with direct iframe approach
  useEffect(() => {
    const embedContainer = document.getElementById('my-cal-inline-30min');
    if (embedContainer && !embedContainer.innerHTML) {
      // Create iframe for more reliable embedding
      const iframe = document.createElement('iframe');
      iframe.src = 'https://cal.com/asasiso/30min?embed=true&theme=light';
      iframe.width = '100%';
      iframe.height = '600';
      iframe.frameBorder = '0';
      iframe.title = 'Asas ISO Consultation Booking';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
      iframe.allow = 'camera; microphone; geolocation';
      
      embedContainer.appendChild(iframe);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      country: '',
      isoStandard: '',
      preferredDate: '',
      message: ''
    }
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: ConsultationFormData) => {
      const response = await apiRequest('POST', '/api/consultation', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: isRTL ? 'تم حجز الاستشارة بنجاح' : 'Consultation booked successfully',
        description: isRTL 
          ? 'سيتواصل معك خبيرنا قريباً لتأكيد الموعد'
          : 'Our expert will contact you soon to confirm the appointment',
      });
      reset();
      setIsSubmitting(false);
    },
    onError: () => {
      toast({
        title: isRTL ? 'خطأ في الحجز' : 'Error booking consultation',
        description: isRTL 
          ? 'حدث خطأ أثناء حجز الاستشارة. يرجى المحاولة مرة أخرى.'
          : 'There was an error booking your consultation. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: ConsultationFormData) => {
    setIsSubmitting(true);
    consultationMutation.mutate(data);
  };

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

      {/* Consultation Benefits */}
      <section className="section-padding bg-white">
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

      {/* Booking Form */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <Card className="border-border">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">
                      {isRTL ? 'احجز استشارتك' : 'Book Your Consultation'}
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">
                          {isRTL ? 'الاسم الكامل' : 'Full Name'} *
                        </Label>
                        <Input
                          id="fullName"
                          {...register('fullName')}
                          placeholder={isRTL ? 'اسمك الكامل' : 'Your full name'}
                          className={errors.fullName ? 'border-destructive' : ''}
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="companyName">
                          {isRTL ? 'اسم الشركة' : 'Company Name'} *
                        </Label>
                        <Input
                          id="companyName"
                          {...register('companyName')}
                          placeholder={isRTL ? 'اسم شركتك' : 'Your company name'}
                          className={errors.companyName ? 'border-destructive' : ''}
                        />
                        {errors.companyName && (
                          <p className="text-sm text-destructive mt-1">{errors.companyName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">
                          {isRTL ? 'البريد الإلكتروني' : 'Email'} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder={isRTL ? 'your.email@company.com' : 'your.email@company.com'}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">
                          {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          placeholder={isRTL ? '+965 XXXX XXXX' : '+965 XXXX XXXX'}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="country">
                          {isRTL ? 'الدولة' : 'Country'} *
                        </Label>
                        <Select onValueChange={(value) => setValue('country', value)}>
                          <SelectTrigger className={errors.country ? 'border-destructive' : ''}>
                            <SelectValue placeholder={isRTL ? 'اختر الدولة' : 'Select country'} />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <div className="flex items-center gap-2">
                                  <span>{country.flag}</span>
                                  <span>{country.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.country && (
                          <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="isoStandard">
                          {isRTL ? 'معيار الأيزو المهتم به' : 'ISO Standard of Interest'}
                        </Label>
                        <Select onValueChange={(value) => setValue('isoStandard', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={isRTL ? 'اختر معيار الأيزو' : 'Select ISO standard'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple">
                              {isRTL ? 'معايير متعددة' : 'Multiple Standards'}
                            </SelectItem>
                            <SelectItem value="not-sure">
                              {isRTL ? 'غير متأكد' : 'Not Sure'}
                            </SelectItem>
                            {ISO_STANDARDS.map((standard) => (
                              <SelectItem key={standard.id} value={standard.id}>
                                {standard.code} - {standard.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="preferredDate">
                        {isRTL ? 'التاريخ المفضل للاستشارة' : 'Preferred Consultation Date'}
                      </Label>
                      <Input
                        id="preferredDate"
                        {...register('preferredDate')}
                        placeholder={isRTL ? 'أي وقت هذا الأسبوع، الصباح المفضل، إلخ.' : 'Anytime this week, mornings preferred, etc.'}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">
                        {isRTL ? 'تفاصيل إضافية' : 'Additional Details'}
                      </Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder={isRTL ? 'أخبرنا عن احتياجات التدريب الخاصة بك أو أي أسئلة محددة...' : 'Tell us about your training needs or any specific questions...'}
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {isRTL ? 'جاري الحجز...' : 'Booking...'}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {isRTL ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Consultation Details */}
            <div className="space-y-8">
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {isRTL ? 'تفاصيل الاستشارة' : 'Consultation Details'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {isRTL ? 'المدة' : 'Duration'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {isRTL ? '30-45 دقيقة' : '30-45 minutes'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {isRTL ? 'النوع' : 'Type'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {isRTL ? 'مكالمة فيديو أو هاتفية' : 'Video or phone call'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {isRTL ? 'التكلفة' : 'Cost'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {isRTL ? 'مجانية تماماً' : 'Completely Free'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {isRTL ? 'المستشار' : 'Consultant'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {isRTL ? 'خبير أيزو معتمد' : 'Certified ISO expert'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-gradient-to-br from-secondary/5 to-primary/5">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {isRTL ? 'لماذا تختار أساس أيزو؟' : 'Why Choose Asas ISO?'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-sm">
                        {isRTL ? 'مدربون معتمدون دولياً مع خبرة في المنطقة' : 'Internationally certified trainers with regional expertise'}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-sm">
                        {isRTL ? 'برامج تدريب مخصصة للصناعات الإقليمية' : 'Training programs customized for regional industries'}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-sm">
                        {isRTL ? 'خيارات تسليم مرنة (داخلي، عام، أونلاين)' : 'Flexible delivery options (in-house, public, online)'}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-sm">
                        {isRTL ? 'نهج عملي يركز على النتائج' : 'Practical, results-oriented approach'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cal.com Integration */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {isRTL ? 'أو احجز مباشرة' : 'Or Book Directly'}
                  </h3>
                  <div className="bg-muted rounded-xl p-8">
                    <div className="text-center mb-6">
                      <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        {isRTL ? 'احجز استشارة مجانية في الوقت المناسب لك' : 'Book a free consultation at your convenience'}
                      </p>
                    </div>
                    
                    {/* Cal.com Embed */}
                    <div className="cal-embed-container" style={{ minHeight: '600px', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{width:'100%',height:'600px'}} id="my-cal-inline-30min"></div>
                    </div>
                    
                    {/* Fallback Button */}
                    <div className="text-center mt-4">
                      <Button 
                        variant="outline"
                        onClick={() => window.open('https://cal.com/asasiso/30min', '_blank')}
                        className="w-full"
                      >
                        {isRTL ? 'افتح في نافذة جديدة' : 'Open in New Window'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
