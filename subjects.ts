
export type Subject = RadicalSubject | KanjiSubject;
export enum SubjectType {
  RADICAL = "radical",
  KANJI = "kanji",
  VOCABULARY = "vocabulary",
}

export type BasicSubject = {
  id: number;
  type?: SubjectType;
  level?: number;
  primaryMeaning: string;
  otherMeanings?: string[];
  wkSlug: string;
};

export type RadicalSubject = BasicSubject & {
  type: SubjectType.RADICAL;

  meaningMnemonic: string;

  related: {
    kanjis: number[];
    vocabularies: number[];
  };
};

export type KanjiReading = {
  reading?: string;
  primary?: boolean;
  type?: "onyomi" | "kunyomi" | "nanori";
  related?: {
    radicals: number[];
  }
};

export type KanjiSubject = BasicSubject & {
  type: SubjectType.KANJI;
  primaryReading: string;
  readings?: KanjiReading[];
  readingMnemonic?: string;
  meaningMnemonic?: string;
  related: {
    radicals: number[];
    vocabularies: number[];
  };
  radicalNames: string[];
};
