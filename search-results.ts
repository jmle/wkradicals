export type SearchResult = {
    id: number;
    // type: SearchResultType;
    // level: number;
  
    // description: string;
    // related: {
      // radical: number[];
      // kanji: number[];
      // vocabulary: number[];
    // };
    primaryReading: string;
    primaryMeaning: string;
    radicalNames: string[];
    wkSlug: string;
  };
  
  export type SearchDocument = SearchResult & {
    primarySearch: string[];
    // secondarySearch: string[];
  };
  
  export enum SearchResultType {
    RADICAL = "radical",
    KANJI = "kanji",
    VOCABULARY = "vocabulary",
  }
  