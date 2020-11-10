import { assert } from 'chai';
import Translate, { TranslateMinifyOptions } from '../src';
import {
  newTextsTranslations,
  newWordsTranslations,
  texts,
  textsTranslations,
  wordTranslations,
  words
} from './mocks';

const defaultOptions: TranslateMinifyOptions = {
  defaultLocale: 'en',
  locale: 'no-nb',
  words,
  texts
};

describe('Default translation', () => {
  let translate: Translate;

  beforeEach(() => {
    translate = new Translate(
      {
        ...defaultOptions,
        locale: 'en'
      },
      true
    );
  });

  it('should init with default values', () => {
    const _translate = new Translate({}, true);
    assert.isTrue(_translate instanceof Translate);
  });

  it('should return default word translation even if no match', () => {
    const translated = translate.word('Test 2');
    assert.equal(translated, 'Test 2');
  });

  it('should return default text translation even if no match', () => {
    const translated = translate.text('Test 2');
    assert.equal(translated, 'Test 2');
  });
});

describe('Translation object', () => {
  let translate: Translate;
  const wordKey = 'Test';
  const textKey = 'This is a test';

  beforeEach(() => {
    translate = new Translate(defaultOptions, true);
  });

  it('should be typeof class', () => {
    assert.isTrue(Translate instanceof Object);
  });

  it('should give translated word', () => {
    assert.equal(translate.word(wordKey), words[wordKey]['no-nb']);
    assert.equal(translate.w(wordKey), words[wordKey]['no-nb']);
  });

  it('should give translated text', () => {
    assert.equal(translate.text(textKey), texts[textKey]['no-nb']);
    assert.equal(translate.t(textKey), texts[textKey]['no-nb']);
  });

  it('should return default word if no word or text was found', () => {
    const word = 'Bullshit';
    const text = 'No translations for this';
    assert.equal(translate.word(word), word);
    assert.equal(translate.w(word), word);
    assert.equal(translate.text(text), text);
    assert.equal(translate.t(text), text);
  });

  it('should return default word if translation was found', () => {
    translate.setLocale('fr');
    const word = 'Test';
    const text = 'This is a test';
    assert.equal(translate.word(word), word);
    assert.equal(translate.text(text), text);
  });

  it('should change locale if setLocale is set', () => {
    translate.setLocale('se');
    assert.equal(translate.text(textKey), texts[textKey]['se']);
    assert.equal(translate.word(wordKey), words[wordKey]['se']);
  });

  it('should add more words when given', () => {
    const newWord = 'New';
    translate.addWords(newWordsTranslations);
    assert.equal(
      translate.word(newWord),
      newWordsTranslations[newWord]['no-nb']
    );
  });

  it('should add more texts when given', () => {
    const newText = 'This is a new sentence';
    translate.addTexts(newTextsTranslations);
    assert.equal(
      translate.text(newText),
      newTextsTranslations[newText]['no-nb']
    );
  });

  it('should add new word translations if given same object with more translations', () => {
    translate.addWordsTranslations(wordTranslations);
    translate.setLocale('dk');
    assert.equal(translate.word(wordKey), wordTranslations[wordKey]['dk']);
    assert.equal(translate.word(wordKey, 'se'), words[wordKey]['se']);
  });

  it('should add new word translations if given same object with more translations', () => {
    translate.addTextsTranslations(textsTranslations);
    translate.setLocale('dk');
    assert.equal(translate.text(textKey), textsTranslations[textKey]['dk']);
    assert.equal(
      translate.text(textKey, { locale: 'se' }),
      texts[textKey]['se']
    );
  });

  it('should add word or text with special characters', () => {
    const random = `§"#¤%&/()=?*^_:;,.-'¨\+0+|@£$€€{[]}´~`;
    const randomWords = {
      [random]: {
        'no-nb': 'Translated'
      }
    };
    translate.addWords(randomWords);
    assert.equal(translate.word(random), randomWords[random]['no-nb']);
  });

  it('should replace {{variable}}', () => {
    const text = 'Are you {{age}} years old?';
    const translation = 'Er du 10 år gammel?';
    const translated = translate.text(text, { age: 10 });
    assert.equal(translation, translated);
  });

  it('should replace {{variable}} even if no translation match', () => {
    const text = "No, i'm {{age}} years old.";
    const translation = "No, i'm 18 years old.";
    const translated = translate.text(text, { age: 18 });
    assert.equal(translation, translated);
  });

  it('should not care about extra variables', () => {
    const text = "No, i'm {{age}} years old.";
    const translation = "No, i'm 18 years old.";
    const translated = translate.text(text, { age: 18, name: 'Emil' });
    assert.equal(translation, translated);
  });

  it('should not translate if word not found', () => {
    const text = "No, i'm {{age}} years {{cool}}.";
    const translation = "No, i'm 18 years .";
    const translated = translate.text(text, { age: 18 });
    assert.equal(translation, translated);
  });
});
