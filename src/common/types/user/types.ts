import { Statistic } from '../../interface/interface';

export type UserState = {
  userId: string;
  email: string;
  message: string;
  token: string;
  statistic: Statistic;
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
