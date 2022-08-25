export interface Dictionary {
  id: string;
  group: string | number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}
export interface WordDictionary {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface Registration {
  email: string;
  password: string;
}

export interface StatisticDailyProps {
  data: string;
  learningWords: string[];
  winStreak: number;
  generalCountLearningWords: number;
  countOfRightAnswers: number;
}

export interface StatProps {
  audioCall: StatisticDailyProps[];
  sprint: StatisticDailyProps[];
}

export interface StatBackProps {
  statistics: StatProps;
}

export interface Game{
  words: WordDictionary[];
  hardWords: string[];
  hard: string;
  group:number;
  page:number;
  }
