import { enUS, ptBR } from 'date-fns/locale';

import i18n from '@/i18n';

const languages = {
  en: { code: 'en', label: 'English', country: 'US', locale: enUS },
  pt: { code: 'pt', label: 'Português', country: 'BR', locale: ptBR },
} as const;

type LanguageCode = keyof typeof languages;
type Language = (typeof languages)[LanguageCode];

export function getLanguage(code: string): Language {
  const key = code.substring(0, 2);

  if (key in languages) {
    return languages[key as LanguageCode];
  }

  return languages.en;
}

export function getCurrentLanguage() {
  return getLanguage(i18n.language);
}

export function mapLanguages<T>(iteratee: (lang: Language) => T): T[] {
  const res: T[] = [];

  for (const key in languages) {
    res.push(iteratee(languages[key as LanguageCode]));
  }

  return res;
}
