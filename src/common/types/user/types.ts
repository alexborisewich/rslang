export type UserState = {
  userId: string;
  email: string;
  message: string;
  token: string;
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
