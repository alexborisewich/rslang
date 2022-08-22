import { Dictionary } from '../../interface/interface';

export type DictionaryState = {
  words: Dictionary[];
  totalWordsCount: number;
  selectedWord: string;
  group: string | number;
  page: number;
  isLoading: boolean;
  error: { isError: boolean; message: Error['message'] };
};
