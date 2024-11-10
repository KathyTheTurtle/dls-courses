export enum TranslationDirection {
  ThaiToEnglish,
  EnglishToThai,
}

export type CoreVocab = {
  transliteration: string;
  english: string;
};

export type GlossaryItem = CoreVocab & {
  chapter: string;
};
