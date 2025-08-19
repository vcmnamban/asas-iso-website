import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, User, Tag, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { SEOHead } from "@/components/common/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";

export default function BlogPage() {
  const { t, isRTL, language } = useLanguage();

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async (): Promise<BlogPost[]> => {
      const response = await fetch('/api/blog');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg text-muted-foreground">
              {isRTL ? 'جاري تحميل المقالات...' : 'Loading blog posts...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max section-padding">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {isRTL ? 'خطأ في تحميل المقالات' : 'Error Loading Blog Posts'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'يرجى المحاولة مرة أخرى لاحقاً' : 'Please try again later'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="ISO Training Blog - Expert Insights & Industry Updates | Asas ISO"
        description="Stay updated with the latest ISO training insights, industry news, and expert guidance for quality management, environmental standards, and more."
        keywords="ISO blog, training insights, quality management articles, environmental standards news, Asas ISO expertise"
      />

      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container-max section-padding">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'مدونة تدريب أساس أيزو' : 'Asas ISO Training Blog'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {isRTL 
                ? 'اكتشف أحدث الأفكار والإرشادات المتخصصة في معايير الأيزو وأفضل الممارسات في إدارة الجودة'
                : 'Discover the latest insights and expert guidance on ISO standards and quality management best practices'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Featured Image Placeholder */}
                    {post.featuredImage ? (
                      <img 
                        src={post.featuredImage} 
                        alt={language === 'ar' ? post.titleAr : post.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Tag className="w-6 h-6 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar' ? post.categoryAr : post.category}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Category Badge */}
                    <Badge variant="secondary" className="mb-3">
                      {language === 'ar' ? post.categoryAr : post.category}
                    </Badge>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 line-clamp-2">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {language === 'ar' ? post.titleAr : post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {language === 'ar' ? post.excerptAr : post.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{language === 'ar' ? post.authorAr : post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {((language === 'ar' ? post.tagsAr : post.tags) || []).length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(language === 'ar' ? post.tagsAr : post.tags)!.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Read More Link */}
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                    >
                      {isRTL ? 'اقرأ المزيد' : 'Read More'}
                      {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                {isRTL ? 'لا توجد مقالات متاحة حالياً' : 'No Blog Posts Available'}
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {isRTL 
                  ? 'نعمل على إضافة مقالات مفيدة حول معايير الأيزو والتدريب المهني. تابعونا قريباً!'
                  : 'We\'re working on adding helpful articles about ISO standards and professional training. Stay tuned!'
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}