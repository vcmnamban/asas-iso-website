import { Link } from 'wouter';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { COMPANY_INFO, ISO_STANDARDS } from '@/lib/constants';
import logoPath from '@assets/2_1753519097355.png';

export function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoPath} alt="Asas ISO" className="w-8 h-8" />
              <span className="text-2xl font-bold text-gradient">{t('companyName')}</span>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {isRTL 
                ? 'الأساس لنجاح شهادتك. شركة تدريب أيزو مهنية مقرها في الكويت، تخدم منطقة دول مجلس التعاون الخليجي.'
                : 'The foundation for your certification success. Professional ISO training company based in Kuwait, serving the GCC region.'
              }
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {isRTL 
                ? 'شركة تابعة لشركة النور الدولية للاستشارات'
                : 'A subsidiary of '
              }
              <a 
                href="https://alnoor-consultants.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {isRTL ? 'النور الدولية للاستشارات' : 'Al Noor International Consultants'}
              </a>
            </p>
            <div className="flex gap-4">
              <a href={`https://${COMPANY_INFO.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* ISO Training Standards */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-2">
              {ISO_STANDARDS.slice(0, 7).map((standard) => (
                <li key={standard.id}>
                  <Link
                    href={`/iso-courses/${standard.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {standard.code}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <p>{COMPANY_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 {t('companyName')}. {isRTL ? 'جميع الحقوق محفوظة. مسجلة في الكويت.' : 'All rights reserved. Registered in Kuwait.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
