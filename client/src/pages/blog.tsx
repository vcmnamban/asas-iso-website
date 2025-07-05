import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  BookOpen, 
  User 
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { SEOHead } from '@/components/common/seo-head';
import { BLOG_POSTS } from '@/lib/constants';

export default function Blog() {
  const { id } = useParams();
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // If we have an ID, show single post view
  if (id) {
    const post = BLOG_POSTS.find(p => p.id === id);
    
    if (!post) {
      return (
        <div className="section-padding">
          <div className="container-max text-center">
            <h1 className="text-3xl font-bold mb-4">
              {isRTL ? 'المقال غير موجود' : 'Article Not Found'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {isRTL ? 'المقال المطلوب غير متوفر.' : 'The requested article is not available.'}
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                {isRTL ? 'العودة إلى المدونة' : 'Back to Blog'}
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <>
        <SEOHead
          title={`${post.title} | Asas ISO Blog`}
          description={post.excerpt}
          keywords={`${post.category}, ISO standards, GCC region, ${post.title}`}
        />

        {/* Single Post View */}
        <article className="section-padding bg-white">
          <div className="container-max max-w-4xl">
            <div className="mb-8">
              <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="w-4 h-4" />
                {isRTL ? 'العودة إلى المدونة' : 'Back to Blog'}
              </Link>
              
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{post.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.readTime}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <p className="text-lg text-muted-foreground">{post.excerpt}</p>
            </div>

            <div 
              className="h-64 md:h-80 bg-cover bg-center rounded-xl mb-8" 
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>

            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                {isRTL 
                  ? 'هذا المقال يستكشف الجوانب المهمة لتطبيق معايير الأيزو في منطقة دول مجلس التعاون الخليجي، مع التركيز على التحديات والفرص الفريدة في المنطقة.'
                  : 'This article explores the important aspects of implementing ISO standards in the GCC region, focusing on the unique challenges and opportunities in the area.'
                }
              </p>
              
              <h2 className="text-2xl font-bold mb-4">
                {isRTL ? 'مقدمة' : 'Introduction'}
              </h2>
              <p className="mb-6">
                {isRTL 
                  ? 'في عالم الأعمال اليوم، تلعب معايير الأيزو دورًا محوريًا في ضمان الجودة والسلامة والكفاءة. منطقة دول مجلس التعاون الخليجي، بنموها الاقتصادي السريع وتنوعها الصناعي، تقدم مشهدًا فريدًا لتطبيق هذه المعايير.'
                  : 'In today\'s business world, ISO standards play a pivotal role in ensuring quality, safety, and efficiency. The GCC region, with its rapid economic growth and industrial diversity, presents a unique landscape for implementing these standards.'
                }
              </p>
              
              <h2 className="text-2xl font-bold mb-4">
                {isRTL ? 'التحديات الرئيسية' : 'Key Challenges'}
              </h2>
              <p className="mb-6">
                {isRTL 
                  ? 'تواجه المؤسسات في المنطقة تحديات متعددة عند تطبيق معايير الأيزو، بما في ذلك التنوع الثقافي، واللوائح المحلية المختلفة، وسرعة التطور التكنولوجي.'
                  : 'Organizations in the region face multiple challenges when implementing ISO standards, including cultural diversity, varying local regulations, and rapid technological development.'
                }
              </p>
              
              <h2 className="text-2xl font-bold mb-4">
                {isRTL ? 'أفضل الممارسات' : 'Best Practices'}
              </h2>
              <p className="mb-6">
                {isRTL 
                  ? 'لضمان النجاح في تطبيق معايير الأيزو، يجب على المؤسسات التركيز على التدريب المناسب، والمشاركة الفعالة من الإدارة العليا، والتحسين المستمر.'
                  : 'To ensure success in ISO implementation, organizations should focus on proper training, effective top management engagement, and continuous improvement.'
                }
              </p>
              
              <h2 className="text-2xl font-bold mb-4">
                {isRTL ? 'الخلاصة' : 'Conclusion'}
              </h2>
              <p className="mb-6">
                {isRTL 
                  ? 'تطبيق معايير الأيزو في منطقة دول مجلس التعاون الخليجي يتطلب نهجًا مدروسًا يأخذ في الاعتبار الخصائص الفريدة للمنطقة. مع التدريب المناسب والدعم المهني، يمكن للمؤسسات تحقيق فوائد كبيرة من هذه المعايير.'
                  : 'Implementing ISO standards in the GCC region requires a thoughtful approach that considers the unique characteristics of the region. With proper training and professional support, organizations can achieve significant benefits from these standards.'
                }
              </p>
            </div>

            <div className="flex items-center justify-between pt-8 border-t">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  {isRTL ? 'شارك' : 'Share'}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {isRTL ? 'كاتب: فريق أساس أيزو' : 'Author: Asas ISO Team'}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
          <div className="container-max">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {isRTL ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost) => (
                <Card key={relatedPost.id} className="card-hover bg-white border-border overflow-hidden">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${relatedPost.image})` }}
                  ></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{relatedPost.category}</Badge>
                      <span className="text-sm text-muted-foreground">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <Link href={`/blog/${relatedPost.id}`}>
                      <Button variant="ghost" size="sm">
                        {t('readMore')} →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  // Blog listing view
  const categories = [
    { id: 'all', name: isRTL ? 'جميع المقالات' : 'All Articles' },
    { id: 'ISO 9001', name: 'ISO 9001' },
    { id: 'ISO 14001', name: 'ISO 14001' },
    { id: 'ISO 45001', name: 'ISO 45001' },
    { id: 'ISO 27001', name: 'ISO 27001' },
  ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title="Blog & Insights - ISO Standards in the GCC Region | Asas ISO"
        description="Latest insights and best practices for ISO standards implementation in Kuwait, Saudi Arabia, and Oman. Expert articles from Asas ISO."
        keywords="ISO blog, ISO insights GCC, ISO standards Kuwait, ISO best practices Saudi Arabia, ISO implementation Oman"
      />

      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'المدونة والأفكار' : 'Blog & Insights'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {isRTL 
                ? 'أحدث الأفكار وأفضل الممارسات لتطبيق معايير الأيزو في منطقة دول مجلس التعاون الخليجي'
                : 'Latest insights and best practices for ISO standards implementation in the GCC region'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? 'ابحث في المقالات...' : 'Search articles...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
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
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
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
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {isRTL ? 'لم يتم العثور على مقالات' : 'No Articles Found'}
              </h3>
              <p className="text-muted-foreground">
                {isRTL 
                  ? 'جرب تعديل مصطلحات البحث أو المرشحات'
                  : 'Try adjusting your search terms or filters'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'ابق على اطلاع' : 'Stay Updated'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {isRTL 
              ? 'اشترك في نشرتنا الإخبارية للحصول على أحدث الأفكار حول معايير الأيزو في منطقة دول مجلس التعاون الخليجي'
              : 'Subscribe to our newsletter for the latest insights on ISO standards in the GCC region'
            }
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input 
              placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              className="flex-1"
            />
            <Button>
              {isRTL ? 'اشترك' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
