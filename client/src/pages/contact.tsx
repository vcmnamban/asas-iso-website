import { useState } from 'react';
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
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Clock,
  MessageCircle,
  Send
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { SEOHead } from '@/components/common/seo-head';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertContactSubmissionSchema } from '@shared/schema';
import { COMPANY_INFO, COUNTRIES, ISO_STANDARDS } from '@/lib/constants';
import { z } from 'zod';

const contactFormSchema = insertContactSubmissionSchema.extend({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  country: z.string().min(1, 'Please select a country'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      country: '',
      isoStandard: '',
      message: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: isRTL ? 'تم إرسال الرسالة بنجاح' : 'Message sent successfully',
        description: isRTL 
          ? 'سيتواصل معك فريقنا قريباً'
          : 'Our team will get back to you soon',
      });
      reset();
      setIsSubmitting(false);
    },
    onError: () => {
      toast({
        title: isRTL ? 'خطأ في الإرسال' : 'Error sending message',
        description: isRTL 
          ? 'حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.'
          : 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <>
      <SEOHead
        title="Contact Us - Get in Touch with Asas ISO | Kuwait Office"
        description="Contact Asas ISO for professional ISO training services in Kuwait, Saudi Arabia, and Oman. Get quotes, schedule consultations, and learn more."
        keywords="contact Asas ISO, ISO training Kuwait contact, Asas ISO office Kuwait, ISO consultation GCC"
      />

      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'اتصل بنا' : 'Contact Us'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {isRTL 
                ? 'هل أنت مستعد لبدء رحلة شهادة الأيزو؟ تواصل مع فريقنا'
                : 'Ready to start your ISO certification journey? Get in touch with our team'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">
                {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {isRTL ? 'مكتب الكويت' : 'Kuwait Office'}
                    </h3>
                    <p className="text-muted-foreground">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {isRTL ? 'الهاتف' : 'Phone'}
                    </h3>
                    <a 
                      href={`tel:${COMPANY_INFO.phone}`} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </h3>
                    <a 
                      href={`mailto:${COMPANY_INFO.email}`} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">LinkedIn</h3>
                    <a 
                      href={`https://${COMPANY_INFO.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {COMPANY_INFO.linkedin}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {isRTL ? 'ساعات العمل' : 'Business Hours'}
                    </h3>
                    <div className="text-muted-foreground">
                      <p>
                        {isRTL ? 'الأحد - الخميس: 8:00 ص - 5:00 م' : 'Sunday - Thursday: 8:00 AM - 5:00 PM'}
                      </p>
                      <p>
                        {isRTL ? 'السبت: 9:00 ص - 1:00 م' : 'Saturday: 9:00 AM - 1:00 PM'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {isRTL ? 'موقعنا' : 'Our Location'}
                  </h3>
                  <div className="bg-muted rounded-xl h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {isRTL ? 'خريطة جوجل - موقع مكتب الكويت' : 'Google Maps - Kuwait Office Location'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {isRTL ? 'التكامل مع خرائط جوجل' : 'Google Maps Integration'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-border">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">
                      {isRTL ? 'أرسل لنا رسالة' : 'Send us a Message'}
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
                      <Label htmlFor="message">
                        {isRTL ? 'الرسالة' : 'Message'}
                      </Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder={isRTL ? 'أخبرنا عن احتياجات التدريب الخاصة بك...' : 'Tell us about your training needs...'}
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
                          {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'إجابات على الأسئلة الأكثر شيوعاً حول خدمات التدريب لدينا'
                : 'Answers to the most common questions about our training services'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">
                  {isRTL ? 'كم تستغرق دورات التدريب؟' : 'How long do the training courses take?'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'تتراوح مدة دوراتنا من يوم واحد للتدريب التوعوي إلى 5 أيام لتدريب المراجع الداخلي، حسب مستوى التدريب ومعيار الأيزو.'
                    : 'Our courses range from 1 day for awareness training to 5 days for internal auditor training, depending on the training level and ISO standard.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">
                  {isRTL ? 'هل تقدمون شهادات؟' : 'Do you provide certificates?'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'نعم، نقدم شهادات إتمام معتمدة لجميع المشاركين الذين يكملون بنجاح برامج التدريب لدينا.'
                    : 'Yes, we provide certified completion certificates for all participants who successfully complete our training programs.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">
                  {isRTL ? 'هل يمكن تخصيص التدريب لصناعتنا؟' : 'Can training be customized for our industry?'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'بالتأكيد! نحن متخصصون في تخصيص برامج التدريب لتناسب الاحتياجات المحددة لصناعتك وبيئة عملك.'
                    : 'Absolutely! We specialize in customizing training programs to suit your specific industry needs and work environment.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">
                  {isRTL ? 'ما هي طرق الدفع المتاحة؟' : 'What payment methods are available?'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'نقبل التحويلات البنكية والشيكات وطرق الدفع الإلكتروني المختلفة. تتوفر خطط دفع مرنة للشركات.'
                    : 'We accept bank transfers, checks, and various electronic payment methods. Flexible payment plans are available for corporate clients.'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
