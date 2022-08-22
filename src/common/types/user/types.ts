export type UserState = {
  id: string;
  email: string;
  message: string;
  token: string;
  isLoggedOn: boolean;
  isLoading: boolean;
  error: { isError: boolean; message: string };
};

export type LoginResponse = { message: string; id: string; token: string };
