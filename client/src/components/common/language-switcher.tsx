import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2 flex items-center gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="rounded-full px-4 py-2 text-sm font-medium"
      >
        EN
      </Button>
      <Button
        variant={language === 'ar' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('ar')}
        className="rounded-full px-4 py-2 text-sm font-medium"
      >
        العربية
      </Button>
    </div>
  );
}
