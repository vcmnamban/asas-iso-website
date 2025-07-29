import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { SEOHead } from '@/components/common/seo-head';
import { Calculator, Users, Building, MapPin, Mail, Phone, CheckCircle } from 'lucide-react';

const quoteSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(8, 'Valid phone number is required'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().min(1, 'Please select company size'),
  country: z.string().min(1, 'Please select a country'),
  trainingType: z.string().min(1, 'Please select training type'),
  isoStandards: z.array(z.string()).min(1, 'Please select at least one ISO standard'),
  participants: z.string().min(1, 'Number of participants is required'),
  preferredDates: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const industries = [
  'Oil & Gas',
  'Construction & Infrastructure',
  'Trading & Logistics',
  'Manufacturing',
  'Healthcare',
  'Financial Services',
  'Technology',
  'Government',
  'Education',
  'Hospitality',
  'Other'
];

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
];

const gccCountries = [
  'Kuwait',
  'Saudi Arabia',
  'UAE',
  'Qatar',
  'Bahrain',
  'Oman'
];

const trainingTypes = [
  'In-House Training',
  'Online Training',
  'Hybrid Training',
  'Consultation Only'
];

const isoStandards = [
  { id: 'iso-9001', name: 'ISO 9001:2015 - Quality Management' },
  { id: 'iso-14001', name: 'ISO 14001:2015 - Environmental Management' },
  { id: 'iso-45001', name: 'ISO 45001:2018 - Occupational Health & Safety' },
  { id: 'iso-27001', name: 'ISO 27001:2022 - Information Security' },
  { id: 'iso-22000', name: 'ISO 22000:2018 - Food Safety Management' },
  { id: 'iso-20000', name: 'ISO 20000-1:2018 - IT Service Management' },
  { id: 'iso-22301', name: 'ISO 22301:2019 - Business Continuity' },
  { id: 'iso-17025', name: 'ISO 17025:2017 - Testing & Calibration' },
  { id: 'iso-37001', name: 'ISO 37001:2016 - Anti-Bribery Management' },
  { id: 'iso-50001', name: 'ISO 50001:2018 - Energy Management' }
];

export default function Quote() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const isRTL = language === 'ar';

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      industry: '',
      companySize: '',
      country: '',
      trainingType: '',
      isoStandards: [],
      participants: '',
      preferredDates: '',
      additionalRequirements: '',
    },
  });

  const submitQuote = useMutation({
    mutationFn: (data: QuoteFormData) => apiRequest('POST', '/api/quotes', data),
    onSuccess: () => {
      toast({
        title: isRTL ? 'تم الإرسال بنجاح' : 'Quote Request Submitted',
        description: isRTL 
          ? 'سنتواصل معكم قريباً مع عرض أسعار مفصل'
          : 'We will contact you soon with a detailed quote',
      });
      form.reset();
      setSelectedStandards([]);
    },
    onError: (error: any) => {
      console.error('Quote submission error:', error);
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL 
          ? 'حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى'
          : 'Failed to submit quote request. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    console.log('Form data:', data);
    console.log('Selected standards:', selectedStandards);
    const submitData = { ...data, isoStandards: selectedStandards };
    console.log('Submit data:', submitData);
    submitQuote.mutate(submitData);
  };

  const handleStandardChange = (standardId: string, checked: boolean) => {
    const newStandards = checked 
      ? [...selectedStandards, standardId]
      : selectedStandards.filter(id => id !== standardId);
    
    setSelectedStandards(newStandards);
    form.setValue('isoStandards', newStandards);
  };

  return (
    <>
      <SEOHead
        title={isRTL ? 'طلب عرض سعر - أساس الأيزو' : 'Request a Quote - Asas ISO'}
        description={isRTL 
          ? 'احصل على عرض سعر مخصص لاحتياجات التدريب على الأيزو لشركتك'
          : 'Get a customized quote for your organization\'s ISO training needs'}
        keywords="ISO training quote, Kuwait training prices, GCC ISO certification cost"
      />

      <div className="min-h-screen bg-gradient-to-br from-secondary/5 to-primary/5">
        {/* Header Section */}
        <section className="bg-primary text-white py-16">
          <div className="container-max text-center">
            <Calculator className="w-16 h-16 mx-auto mb-6 text-blue-100" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isRTL ? 'طلب عرض سعر' : 'Request a Quote'}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {isRTL 
                ? 'احصل على عرض سعر مخصص ومفصل لاحتياجات التدريب على الأيزو لمؤسستك'
                : 'Get a customized and detailed quote for your organization\'s ISO training needs'
              }
            </p>
          </div>
        </section>

        {/* Quote Form Section */}
        <section className="section-padding">
          <div className="container-max max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {isRTL ? 'معلومات طلب العرض' : 'Quote Request Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Company Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Building className="w-5 h-5" />
                          {isRTL ? 'معلومات الشركة' : 'Company Information'}
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{isRTL ? 'اسم الشركة' : 'Company Name'}</FormLabel>
                              <FormControl>
                                <Input placeholder={isRTL ? 'اسم شركتك' : 'Your company name'} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{isRTL ? 'الصناعة' : 'Industry'}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={isRTL ? 'اختر الصناعة' : 'Select industry'} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {industries.map((industry) => (
                                    <SelectItem key={industry} value={industry}>
                                      {industry}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="companySize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{isRTL ? 'حجم الشركة' : 'Company Size'}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={isRTL ? 'اختر حجم الشركة' : 'Select company size'} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {companySizes.map((size) => (
                                    <SelectItem key={size} value={size}>
                                      {size}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{isRTL ? 'الدولة' : 'Country'}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={isRTL ? 'اختر الدولة' : 'Select country'} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {gccCountries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          {isRTL ? 'معلومات التواصل' : 'Contact Information'}
                        </h3>

                        <FormField
                          control={form.control}
                          name="contactPerson"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{isRTL ? 'اسم المسؤول' : 'Contact Person'}</FormLabel>
                              <FormControl>
                                <Input placeholder={isRTL ? 'الاسم الكامل' : 'Full name'} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder={isRTL ? 'example@company.com' : 'example@company.com'} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{isRTL ? 'رقم الهاتف' : 'Phone Number'}</FormLabel>
                              <FormControl>
                                <Input placeholder={isRTL ? '+965 xxxx xxxx' : '+965 xxxx xxxx'} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="participants"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{isRTL ? 'عدد المشاركين' : 'Number of Participants'}</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder={isRTL ? 'عدد الأشخاص' : 'Number of people'} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Training Requirements */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        {isRTL ? 'متطلبات التدريب' : 'Training Requirements'}
                      </h3>

                      <FormField
                        control={form.control}
                        name="trainingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isRTL ? 'نوع التدريب' : 'Training Type'}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={isRTL ? 'اختر نوع التدريب' : 'Select training type'} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {trainingTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* ISO Standards Selection */}
                      <div>
                        <FormLabel className="text-base font-medium">
                          {isRTL ? 'معايير الأيزو المطلوبة' : 'Required ISO Standards'}
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          {isoStandards.map((standard) => (
                            <div key={standard.id} className="flex items-center space-x-2 space-x-reverse">
                              <Checkbox
                                id={standard.id}
                                checked={selectedStandards.includes(standard.id)}
                                onCheckedChange={(checked) => handleStandardChange(standard.id, checked as boolean)}
                              />
                              <label
                                htmlFor={standard.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {standard.name}
                              </label>
                            </div>
                          ))}
                        </div>
                        {form.formState.errors.isoStandards && (
                          <p className="text-sm text-destructive mt-2">
                            {form.formState.errors.isoStandards.message}
                          </p>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name="preferredDates"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isRTL ? 'التواريخ المفضلة' : 'Preferred Dates'}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={isRTL ? 'مثال: يناير 2025 أو مرونة في التوقيت' : 'e.g., January 2025 or flexible timing'} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="additionalRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isRTL ? 'متطلبات إضافية' : 'Additional Requirements'}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={isRTL 
                                  ? 'أي متطلبات خاصة أو معلومات إضافية تريد إضافتها...'
                                  : 'Any special requirements or additional information you\'d like to include...'
                                }
                                className="resize-none"
                                rows={4}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="btn-primary"
                        disabled={submitQuote.isPending}
                      >
                        {submitQuote.isPending 
                          ? (isRTL ? 'جاري الإرسال...' : 'Submitting...') 
                          : (isRTL ? 'طلب عرض السعر' : 'Submit Quote Request')
                        }
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">
                    {isRTL ? 'استجابة سريعة' : 'Quick Response'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL 
                      ? 'نستجيب لطلبات العروض خلال 24 ساعة'
                      : 'We respond to quote requests within 24 hours'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">
                    {isRTL ? 'أسعار شفافة' : 'Transparent Pricing'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL 
                      ? 'عروض أسعار مفصلة وشفافة بدون رسوم خفية'
                      : 'Detailed and transparent quotes with no hidden fees'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">
                    {isRTL ? 'حلول مخصصة' : 'Customized Solutions'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL 
                      ? 'برامج تدريب مصممة خصيصاً لاحتياجات شركتك'
                      : 'Training programs tailored specifically to your company needs'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}