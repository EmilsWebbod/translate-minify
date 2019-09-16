import { assert } from 'chai';
import Translate, { TranslateMinifyOptions } from '../src';
import {
  newTextsTranslations, newWordsTranslations,
  texts, textsTranslations, wordTranslations, words } from './mocks';

const defaultOptions: TranslateMinifyOptions = {
  defaultLocale: 'en',
  locale: 'no-nb',
  words,
  texts
};

describe('Default translation', () => {
  let translate: Translate;

  beforeEach(() => {
    translate = new Translate({
      ...defaultOptions,
      locale: 'en'
    });
  });

  it('should return default translation even if no match', () => {
    const translated = translate.word('Test 2');
    assert.equal(translated, 'Test 2');
  });
});

describe('Translation object', () => {
  let translate: Translate;
  const wordKey = 'Test';
  const textKey = 'This is a test';

  beforeEach(() => {
    translate = new Translate(defaultOptions);
  });

  it('should be typeof class', () => {
    assert.isTrue(Translate instanceof Object);
  });

  it('should give translated word', () => {
    assert.equal(translate.word(wordKey), words[wordKey]['no-nb']);
  });

  it('should give translated text', () => {
    assert.equal(translate.text(textKey), texts[textKey]['no-nb']);
  });

  it('should return default word if no translation was found', () => {
    const word = 'Bullshit';
    const text = 'No translations for this';
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
    assert.equal(translate.word(newWord), newWordsTranslations[newWord]['no-nb']);
  });

  it('should add more texts when given', () => {
    const newText = 'This is a new sentence';
    translate.addTexts(newTextsTranslations);
    assert.equal(translate.text(newText), newTextsTranslations[newText]['no-nb']);
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
    assert.equal(translate.text(textKey, 'se'), texts[textKey]['se']);
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
  })
});
