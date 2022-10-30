export interface WordTranslations {
  [key: string]: {
    [key: string]: string;
  };
}
export interface TranslateMinifyOptions {
  defaultLocale?: string;
  locale?: string;
  words?: WordTranslations;
  texts?: WordTranslations;
}
export interface Variables {
  [variable: string]: string | number | undefined;
}
export interface TextOptions extends Variables {
  locale?: string;
}
export default class TranslateMinify {
  private readonly defaultLocale;
  private words;
  private texts;
  private locale;
  constructor(
    { defaultLocale, locale, words, texts }?: TranslateMinifyOptions,
    overrideNew?: boolean
  );
  w(word: string, locale?: string): string;
  word(word: string, locale?: string): string;
  t(text: string, opts?: TextOptions): string;
  text(text: string, { locale, ...variables }?: TextOptions): string;
  setLocale(locale: string): void;
  addWords(newWords: WordTranslations): void;
  addTexts(newTexts: WordTranslations): void;
  addWordsTranslations(translations: WordTranslations): void;
  addTextsTranslations(translations: WordTranslations): void;
  private replaceVariables;
}
