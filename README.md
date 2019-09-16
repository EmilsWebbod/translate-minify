# Translate library minify

Minified version of [@ewb/translate](https://github.com/EmilsWebbod/translate)  
This should be used in production instead of @ewb/translate  
Supports lazy loaded `words` and `texts` with 4 new functions. `addWords` `addTexts` `addWordsTranslations` `addTextsTranslations`  

This library is much faster to lookup but has no add functions that changes your json files.

## Quick guide

```
import TranslateMinify from '@ewb/translate-minify';
import words from './words.json';
import texts from './texts.json';

const translate = new TranslateMinify({
    defaultLocale: 'en',
    locale: 'no',
    words,
    texts
});

translate.word('Hello') // Hei
translate.text('Hello to you too') // Hei, til deg også

translate.setLocale('sv')
translate.w('Hello') // Hej
translate.t('Hello to you too') // Hej, till dig också
```

## Lazy load

Added mass loading of new `words` or `texts` with new functions `addWords` and `addTexts`  
And translations with functions `addWordsTranslations` and `addTextsTranslations`  

Lazy load then from disk or get them from a database. Your choice.

## Interfaces

```
interface WordTranslations {
  [word: string]: {
    [translation: string]: string;
  };
}

interface TranslateMinifyOptions {
  defaultLocale: string;
  locale: string;
  words?: WordTranslations;
  texts?: WordTranslations;
}
```

## Class definitions

```
export default class TranslateMinify {

  constructor(opts: TranslateMinifyOptions) : void;

  public w(word: string, locale?: string): string;
  public word(word: string, locale?: string): string;
  
  public t(text: string, locale?: string): string;
  public text(text: string, locale?: string): string;

  public setLocale(locale: string): void;

  public addWords(newWords: WordTranslations): void;
  public addTexts(newTexts: WordTranslations): void;

  public addWordsTranslations(translations: WordTranslations): void;
  public addTextsTranslations(translations: WordTranslations): void;
}
```
