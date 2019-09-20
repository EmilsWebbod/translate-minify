interface WordTranslations {
  [key: string]: {
    [key: string]: string;
  };
}

interface TranslateMinifyOptions {
  defaultLocale: string;
  locale: string;
  words?: WordTranslations;
  texts?: WordTranslations;
}

interface Variables {
  [variable: string]: string | number | undefined;
}

interface TextOptions extends Variables {
  locale?: string;
}

export const VARIABLE_REGEXP = /{{(.*?)}}/g;

export default class TranslateMinify {
  private readonly defaultLocale: string;
  private words: WordTranslations;
  private texts: WordTranslations;

  private locale: string;

  constructor({
    defaultLocale = 'en',
    locale = 'en',
    words = {},
    texts = {}
  }: TranslateMinifyOptions) {
    this.defaultLocale = defaultLocale;
    this.locale = locale;
    this.words = words;
    this.texts = texts;
  }

  public w(word: string, locale?: string) {
    return this.word(word, locale);
  }
  public word(word: string, locale = this.locale) {
    if (this.defaultLocale === locale) {
      return word;
    }

    const wordObj = this.words[word];
    const translated = wordObj ? wordObj[locale] : word;

    return translated || word;
  }

  public t(text: string, opts?: TextOptions) {
    return this.text(text, opts);
  }
  public text(
    text: string,
    { locale = this.locale, ...variables }: TextOptions = {}
  ) {
    if (this.defaultLocale === locale) {
      return this.replaceVariables(text, variables);
    }

    const textObj = this.texts[text];
    const translated = textObj ? textObj[locale] : text;

    return this.replaceVariables(translated || text, variables);
  }

  public setLocale(locale: string) {
    this.locale = locale;
  }

  public addWords(newWords: WordTranslations) {
    this.words = {
      ...this.words,
      ...newWords
    };
  }

  public addTexts(newTexts: WordTranslations) {
    this.texts = {
      ...this.texts,
      ...newTexts
    };
  }

  public addWordsTranslations(translations: WordTranslations) {
    for (const key in translations) {
      if (translations.hasOwnProperty(key) && this.words[key]) {
        this.words[key] = {
          ...this.words[key],
          ...translations[key]
        };
      }
    }
  }

  public addTextsTranslations(translations: WordTranslations) {
    for (const key in translations) {
      if (translations.hasOwnProperty(key) && this.texts[key]) {
        this.texts[key] = {
          ...this.texts[key],
          ...translations[key]
        };
      }
    }
  }

  private replaceVariables(text: string, variables: Variables) {
    if (Object.keys(variables).length === 0) {
      return text;
    }
    return text.replace(VARIABLE_REGEXP, (word, group) => {
      return String(variables[group] || word);
    });
  }
}

export { TranslateMinifyOptions, WordTranslations, TextOptions };
