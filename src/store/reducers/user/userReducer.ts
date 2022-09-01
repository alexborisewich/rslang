import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Dictionary, Registration } from '../../../common/interface/interface';
import { LoginResponse, UserState } from '../../../common/types/user/types';
import api from '../../../components/api/api';

const initialState: UserState = {
  id: '',
  email: '',
  message: '',
  token: '',
  isLoggedOn: false,
  isLoading: false,
  error: { isError: false, message: '' },
};

export const login = createAsyncThunk<LoginResponse, Registration, { rejectValue: string }>(
  'user/login',
  async (body, { rejectWithValue }) => {
    try {
      const response: Response = await api.loginUser(body);
      if (!response.ok) throw new Error('fetch error');
      const data = (await response.json()) as LoginResponse;
      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message);
    }
  }
);

export const register = createAsyncThunk<{ id: string; email: string }, Registration, { rejectValue: string }>(
  'user/register',
  async (body, { rejectWithValue }) => {
    try {
      const response = await api.createUser(body);
      if (!response.ok) throw new Error('fetch error');
      const data = (await response.json()) as { id: string; email: string };
      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUserWord = createAsyncThunk<Dictionary, { id: number; token: string }, { rejectValue: string }>(
  'user/fetchUserWord',
  async (options, { rejectWithValue }) => {
    try {
      const response = await api.getUserWord(options.id, options.token);
      if (!response.ok) throw new Error('fetch error');
      const data = (await response.json()) as Dictionary;
      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<LoginResponse>) {
      state.isLoggedOn = true;
      state.message = action.payload.message;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    logOut(state) {
      state.email = initialState.email;
      state.error = initialState.error;
      state.id = initialState.id;
      state.isLoading = initialState.isLoading;
      state.isLoggedOn = initialState.isLoggedOn;
      state.message = initialState.message;
      state.token = initialState.token;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(register.pending, (state) => {});
    builder
      .addCase(login.pending, (state) => {
        state.error.isError = false;
        state.error.message = '';
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedOn = true;
        // state.userId = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error.isError = true;
        if (action.payload) state.error.message = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.error.isError = false;
        state.error.message = '';
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload) {
          state.id = action.payload.id;
          state.email = action.payload.email;
        }
      })
      .addCase(register.rejected, (state) => {
        state.error.isError = false;
        state.error.message = '';
        state.isLoading = true;
      });
  },
});

export default userSlice.reducer;
export const { logIn, logOut } = userSlice.actions;
