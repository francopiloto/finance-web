import { useEffect, useState } from 'react';
import Flag from 'react-world-flags';

import i18n from '@/i18n';

import { Button, Popover, PopoverContent, PopoverTrigger } from '.';

const languages = [
  { code: 'en', label: 'English', country: 'US' },
  { code: 'pt', label: 'Português', country: 'BR' },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  const [currentLang, setCurrentLang] = useState(
    languages.find((lang) => lang.code === i18n.language) || languages[0],
  );

  useEffect(() => {
    const handleLanguageChanged = (newLang: string) =>
      setCurrentLang(languages.find(({ code }) => code === newLang) || languages[0]);

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  const handleChange = async (code: string) => {
    setIsOpen(false);
    await i18n.changeLanguage(code);
  };

  return (
    <div className="absolute right-4 top-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="border">
            <Flag code={currentLang.country} style={{ width: 24, height: 16 }} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2">
          {languages.map(({ code, label, country }) => {
            const isActive = code === i18n.language;

            return (
              <button
                key={code}
                onClick={() => handleChange(code)}
                className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded-md hover:bg-accent transition-colors ${
                  isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'
                }`}
              >
                <Flag code={country} style={{ width: 20, height: 14 }} />
                {label}
              </button>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}
