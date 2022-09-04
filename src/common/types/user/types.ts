import { Dictionary } from '../../interface/interface';

export type UserState = {
  userId: string;
  email: string;
  message: string;
  token: string;
  statistic: {
    complexWords: Dictionary[];
    learnedWords: Dictionary[];
    audiochallenge: {
      maxScore: number;
      correctCount: number;
    };
    sprint: {
      maxScore: number;
      correctCount: number;
    };
  };
  isLoggedOn: boolean;
  isLoading: boolean;
  error: { isError: boolean; message: string };
};

export type LoginResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};
