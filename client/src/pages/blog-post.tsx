import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Calendar, User, Tag, ArrowRight, ArrowLeft, Share2, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { SEOHead } from "@/components/common/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { isRTL, language } = useLanguage();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['/api/blog', slug],
    queryFn: async (): Promise<BlogPost> => {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog post not found');
        }
        throw new Error('Failed to fetch blog post');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg text-muted-foreground">
              {isRTL ? 'جاري تحميل المقال...' : 'Loading article...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tag className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              {isRTL ? 'المقال غير موجود' : 'Article Not Found'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isRTL 
                ? 'نعتذر، لا يمكننا العثور على المقال الذي تبحث عنه'
                : 'Sorry, we couldn\'t find the article you\'re looking for'
              }
            </p>
            <Link href="/blog">
              <Button variant="outline">
                {isRTL ? 'العودة إلى المدونة' : 'Back to Blog'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = language === 'ar' ? post.titleAr : post.title;
  const content = language === 'ar' ? post.contentAr : post.content;
  const author = language === 'ar' ? post.authorAr : post.author;
  const category = language === 'ar' ? post.categoryAr : post.category;
  const tags = language === 'ar' ? post.tagsAr : post.tags;
  const metaTitle = language === 'ar' ? post.metaTitleAr : post.metaTitle;
  const metaDescription = language === 'ar' ? post.metaDescriptionAr : post.metaDescription;

  // Calculate reading time (approximate)
  const readingTime = Math.ceil(content.split(' ').length / 200);

  return (
    <>
      <SEOHead
        title={metaTitle || `${title} - Asas ISO Blog`}
        description={metaDescription || `${language === 'ar' ? post.excerptAr : post.excerpt}`}
        keywords={tags?.join(', ') || 'ISO training, quality management, Asas ISO'}
      />

      {/* Breadcrumb */}
      <section className="bg-secondary/10 py-4">
        <div className="container-max">
          <nav className="text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              {isRTL ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="mx-2 text-muted-foreground">
              {isRTL ? '←' : '→'}
            </span>
            <Link href="/blog" className="text-muted-foreground hover:text-primary">
              {isRTL ? 'المدونة' : 'Blog'}
            </Link>
            <span className="mx-2 text-muted-foreground">
              {isRTL ? '←' : '→'}
            </span>
            <span className="text-primary font-medium line-clamp-1">{title}</span>
          </nav>
        </div>
      </section>

      {/* Article */}
      <article className="section-padding bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container-max max-w-4xl">
          <Card className="border-border">
            <CardContent className="p-8 md:p-12">
              {/* Article Header */}
              <header className="mb-8">
                {/* Category */}
                <Badge variant="secondary" className="mb-4">
                  {category}
                </Badge>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  {title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.createdAt.toString()}>
                      {new Date(post.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {readingTime} {isRTL ? 'دقائق قراءة' : 'min read'}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Share Button */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: title,
                          text: currentLanguage === 'ar' ? post.excerptAr : post.excerpt,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        // You could add a toast notification here
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {isRTL ? 'مشاركة' : 'Share'}
                  </Button>
                </div>
              </header>

              {/* Featured Image */}
              {post.featuredImage && (
                <div className="mb-8">
                  <img 
                    src={post.featuredImage} 
                    alt={title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-foreground/90 prose-a:text-primary hover:prose-a:text-primary/80"
                dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>').replace(/## (.*?)\n/g, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>').replace(/### (.*?)\n/g, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}
              />

              {/* CTA Section */}
              <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold mb-3">
                  {isRTL ? 'هل تريد معرفة المزيد؟' : 'Want to Learn More?'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isRTL 
                    ? 'احصل على استشارة مجانية مع خبرائنا في معايير الأيزو والتدريب المهني'
                    : 'Get a free consultation with our ISO standards and professional training experts'
                  }
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/consultation">
                    <Button className="bg-primary hover:bg-primary/90">
                      {isRTL ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline">
                      {isRTL ? 'تواصل معنا' : 'Contact Us'}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-border">
                <Link href="/blog">
                  <Button variant="outline" className="inline-flex items-center gap-2">
                    {isRTL ? (
                      <>
                        <ArrowRight className="w-4 h-4" />
                        العودة إلى المدونة
                      </>
                    ) : (
                      <>
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                      </>
                    )}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}