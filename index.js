'use strict';
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const VARIABLE_REGEXP = /{{(.*?)}}/g;
let translate;
class TranslateMinify {
  constructor(
    { defaultLocale = 'en', locale = 'en', words = {}, texts = {} } = {},
    overrideNew
  ) {
    this.defaultLocale = 'en';
    this.words = {};
    this.texts = {};
    this.locale = 'en';
    if (!overrideNew && translate) {
      return translate;
    }
    this.defaultLocale = defaultLocale;
    this.locale = locale;
    this.words = words;
    this.texts = texts;
    translate = this;
  }
  w(word, locale) {
    return this.word(word, locale);
  }
  word(word, locale = this.locale) {
    if (this.defaultLocale === locale) {
      return word;
    }
    const wordObj = this.words[word];
    const translated = wordObj ? wordObj[locale] : word;
    return translated || word;
  }
  t(text, opts) {
    return this.text(text, opts);
  }
  text(text, _a = {}) {
    var { locale = this.locale } = _a,
      variables = __rest(_a, ['locale']);
    if (this.defaultLocale === locale) {
      return this.replaceVariables(text, variables);
    }
    const textObj = this.texts[text];
    const translated = textObj ? textObj[locale] : text;
    return this.replaceVariables(translated || text, variables);
  }
  setLocale(locale) {
    this.locale = locale;
  }
  addWords(newWords) {
    this.words = Object.assign(Object.assign({}, this.words), newWords);
  }
  addTexts(newTexts) {
    this.texts = Object.assign(Object.assign({}, this.texts), newTexts);
  }
  addWordsTranslations(translations) {
    for (const key in translations) {
      if (translations.hasOwnProperty(key) && this.words[key]) {
        this.words[key] = Object.assign(
          Object.assign({}, this.words[key]),
          translations[key]
        );
      }
    }
  }
  addTextsTranslations(translations) {
    for (const key in translations) {
      if (translations.hasOwnProperty(key) && this.texts[key]) {
        this.texts[key] = Object.assign(
          Object.assign({}, this.texts[key]),
          translations[key]
        );
      }
    }
  }
  replaceVariables(text, variables) {
    if (Object.keys(variables).length === 0) {
      return text;
    }
    return text.replace(VARIABLE_REGEXP, (_word, group) => {
      var _a;
      return String(
        group in variables
          ? (_a = variables[group]) !== null && _a !== void 0
            ? _a
            : ''
          : ''
      );
    });
  }
}
exports.default = TranslateMinify;
module.exports = TranslateMinify;
