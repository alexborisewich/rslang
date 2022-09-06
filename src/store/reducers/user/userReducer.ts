import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dictionary, Statistic } from '../../../common/interface/interface';
import { LoginResponse, UserState } from '../../../common/types/user/types';
import api from '../../../components/api/api';

const initialState: UserState = {
  userId: '',
  email: '',
  message: '',
  token: '',
  statistic: {
    learnedWords: 0,
    optional: {
      words: { complexWords: [], learnedWords: [] },
      audiochallenge: {
        finished: 0,
        totalScore: 0,
        totalCorrect: 0,
      },
      sprint: {
        finished: 0,
        totalScore: 0,
        totalCorrect: 0,
      },
    },
  },
  isLoggedOn: false,
  isLoading: false,
  error: { isError: false, message: '' },
};

export const sendStat = createAsyncThunk<
  Statistic,
  { userId: string; token: string; statistic: Statistic },
  { rejectValue: string }
>('user/sendStat', async ({ userId, token, statistic }, { rejectWithValue }) => {
  try {
    const response = await api.setUserStat(userId, token, statistic);
    if (!response.ok) throw new Error('fetch error');
    const data = (await response.json()) as Statistic;
    return data;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});
export const getStat = createAsyncThunk<Statistic, { userId: string; token: string }, { rejectValue: string }>(
  'user/getStat',
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await api.getUserStat(userId, token);
      if (!response) throw new Error('fetch error');
      const data = (await response.json()) as Statistic;
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
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    logOut(state) {
      state.email = initialState.email;
      state.error = initialState.error;
      state.userId = initialState.userId;
      state.statistic = initialState.statistic;
      state.isLoading = initialState.isLoading;
      state.isLoggedOn = initialState.isLoggedOn;
      state.message = initialState.message;
      state.token = initialState.token;
      localStorage.clear();
    },
    addComplex(state, action: PayloadAction<Dictionary>) {
      state.statistic.optional.words.complexWords.push(action.payload);
      state.statistic.learnedWords = state.statistic.optional.words.learnedWords.length;
    },
    deleteComplex(state, action: PayloadAction<Dictionary>) {
      state.statistic.optional.words.complexWords = state.statistic.optional.words.complexWords.filter(
        (word) => word.id !== action.payload.id
      );
      state.statistic.learnedWords = state.statistic.optional.words.learnedWords.length;
    },
    addLearned(state, action: PayloadAction<Dictionary>) {
      state.statistic.optional.words.learnedWords.push(action.payload);
      state.statistic.learnedWords = state.statistic.optional.words.learnedWords.length;
    },
    deleteLearned(state, action: PayloadAction<Dictionary>) {
      state.statistic.optional.words.learnedWords = state.statistic.optional.words.learnedWords.filter(
        (word) => word.id !== action.payload.id
      );
      state.statistic.learnedWords = state.statistic.optional.words.learnedWords.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendStat.pending, (state) => {
        state.isLoading = true;
        state.error.isError = false;
        state.error.message = '';
      })
      .addCase(sendStat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statistic.learnedWords = action.payload.learnedWords;
        state.statistic.optional = action.payload.optional;
      })
      .addCase(sendStat.rejected, (state, action) => {
        state.isLoading = false;
        state.error.isError = true;
        if (action.payload) state.error.message = action.payload;
      })
      .addCase(getStat.pending, (state) => {
        state.isLoading = true;
        state.error.isError = false;
        state.error.message = '';
      })
      .addCase(getStat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statistic.learnedWords = action.payload.learnedWords;
        state.statistic.optional = action.payload.optional;
      })
      .addCase(getStat.rejected, (state, action) => {
        state.isLoading = false;
        state.error.isError = true;
        if (action.payload) state.error.message = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { logIn, logOut, addComplex, deleteComplex, addLearned, deleteLearned } = userSlice.actions;
