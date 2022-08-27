import { Dictionary } from '../../interface/interface';

export type DictionaryState = {
  words: Dictionary[];
  complexWords: Dictionary[];
  learnedWords: Dictionary[];
  activeTab: 'all' | 'complex';
  totalWordsCount: number;
  selectedWord: string;
  group: string | number;
  page: number;
  isLoading: boolean;
  isPlaying: boolean;
  error: { isError: boolean; message: Error['message'] };
};
