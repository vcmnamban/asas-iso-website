import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  Building, 
  Monitor, 
  CheckCircle, 
  DollarSign
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { SEOHead } from '@/components/common/seo-head';

export default function TrainingServices() {
  const { t, isRTL } = useLanguage();

  const deliveryMethods = [
    {
      id: 'in-house',
      title: isRTL ? 'التدريب الداخلي' : 'In-House Training',
      description: isRTL 
        ? 'تدريب مهني يتم إجراؤه في مقر عملك عبر الكويت والمملكة العربية السعودية وعمان ودول مجلس التعاون الخليجي الأخرى'
        : 'Professional training conducted at your premises across Kuwait, Saudi Arabia, Oman, and other GCC countries',
      icon: Building,
      color: 'blue',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        isRTL ? 'مخصص لصناعتك' : 'Customized to your industry',
        isRTL ? 'نهج يركز على الفريق' : 'Team-focused approach',
        isRTL ? 'فعال من حيث التكلفة للمجموعات' : 'Cost-effective for groups',
        isRTL ? 'جدولة مرنة' : 'Flexible scheduling'
      ],
      features: [
        isRTL ? 'تدريب في الموقع' : 'On-site training',
        isRTL ? 'مواد مخصصة' : 'Customized materials',
        isRTL ? 'محتوى خاص بالصناعة' : 'Industry-specific content',
        isRTL ? 'دعم ما بعد التدريب' : 'Post-training support'
      ]
    },

    {
      id: 'online',
      title: isRTL ? 'التدريب المباشر عبر الإنترنت' : 'Online Live Training',
      description: isRTL 
        ? 'جلسات افتراضية بقيادة المدرب يمكن الوصول إليها من أي مكان في منطقة دول مجلس التعاون الخليجي'
        : 'Virtual instructor-led sessions accessible from anywhere in the GCC region',
      icon: Monitor,
      color: 'purple',
      image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: [
        isRTL ? 'جلسات تفاعلية' : 'Interactive sessions',
        isRTL ? 'تسجيل متوفر' : 'Recording provided',
        isRTL ? 'مواد رقمية' : 'Digital materials',
        isRTL ? 'إمكانية الوصول العالمية' : 'Global accessibility'
      ],
      features: [
        isRTL ? 'تدريب افتراضي' : 'Virtual training',
        isRTL ? 'أدوات تفاعلية' : 'Interactive tools',
        isRTL ? 'جلسات مسجلة' : 'Recorded sessions',
        isRTL ? 'دعم تقني' : 'Technical support'
      ]
    }
  ];



  return (
    <>
      <SEOHead
        title="Training Services - Flexible ISO Training Delivery | Asas ISO"
        description="Choose from in-house or online ISO training delivery methods. Professional training across Kuwait, Saudi Arabia, and Oman."
        keywords="ISO training services, in-house training Kuwait, online ISO training, corporate training GCC"
      />

      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'خدمات التدريب' : 'Training Services'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {isRTL 
                ? 'تنسيقات تسليم تدريب مرنة لتلبية احتياجات مؤسستك'
                : 'Flexible training delivery formats to meet your organization\'s needs'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Training Methods */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'طرق التسليم' : 'Delivery Methods'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'اختر طريقة التدريب التي تناسب احتياجات عملك وميزانيتك'
                : 'Choose the training method that fits your business needs and budget'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {deliveryMethods.map((method) => (
              <Card key={method.id} className="card-hover bg-white border-border overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${method.image})` }}
                ></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-${method.color}-500 rounded-full flex items-center justify-center`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{method.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{method.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium mb-2">
                        {isRTL ? 'الفوائد الرئيسية:' : 'Key Benefits:'}
                      </h4>
                      <div className="space-y-2">
                        {method.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">
                        {isRTL ? 'الميزات:' : 'Features:'}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {method.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/contact">
                    <Button className={`w-full bg-${method.color}-600 hover:bg-${method.color}-700`}>
                      {isRTL ? 'اطلب معلومات' : 'Request Information'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Pricing Information */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'معلومات التسعير' : 'Pricing Information'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'أسعار تنافسية وشفافة لجميع طرق التدريب'
                : 'Competitive and transparent pricing for all training methods'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'التدريب الداخلي' : 'In-House Training'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isRTL 
                    ? 'أسعار خاصة للمجموعات الكبيرة'
                    : 'Special rates for large groups'
                  }
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {isRTL ? 'لا توجد تكاليف سفر للمشاركين' : 'No travel costs for participants'}
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {isRTL ? 'محتوى مخصص' : 'Customized content'}
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {isRTL ? 'جدولة مرنة' : 'Flexible scheduling'}
                  </li>
                </ul>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    {isRTL ? 'احصل على عرض أسعار' : 'Get Quote'}
                  </Button>
                </Link>
              </CardContent>
            </Card>



            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <Monitor className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  {isRTL ? 'التدريب عبر الإنترنت' : 'Online Training'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isRTL 
                    ? 'مريح وفعال من حيث التكلفة'
                    : 'Convenient and cost-effective'
                  }
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {isRTL ? 'الوصول من أي مكان' : 'Access from anywhere'}
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {isRTL ? 'تسجيلات الجلسات' : 'Session recordings'}
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {isRTL ? 'مواد رقمية' : 'Digital materials'}
                  </li>
                </ul>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    {isRTL ? 'احصل على معلومات' : 'Get Info'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'هل تحتاج إلى مساعدة في اختيار طريقة التدريب المناسبة؟' : 'Need Help Choosing the Right Training Method?'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {isRTL 
              ? 'تحدث مع خبرائنا للعثور على أفضل حل تدريب لمؤسستك'
              : 'Speak with our experts to find the best training solution for your organization'
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
