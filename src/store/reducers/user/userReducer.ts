import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dictionary } from '../../../common/interface/interface';
// import { Dictionary, Registration } from '../../../common/interface/interface';
import { LoginResponse, UserState } from '../../../common/types/user/types';
// import api from '../../../components/api/api';

const storedUser = localStorage.getItem('userState');
let storedState: UserState | null = null;
if (storedUser) storedState = JSON.parse(storedUser) as UserState;

const initialState: UserState = {
  userId: '',
  email: '',
  message: '',
  token: '',
  statistic: {
    complexWords: [],
    learnedWords: [],
    audiochallenge: {
      finished: 0,
      maxScore: 0,
      correctCount: 0,
    },
    sprint: {
      finished: 0,
      maxScore: 0,
      correctCount: 0,
    },
  },
  isLoggedOn: false,
  isLoading: false,
  error: { isError: false, message: '' },
};

export const sendStat = () => {};
export const getStat = () => {};

const userSlice = createSlice({
  name: 'user',
  initialState: storedState || initialState,
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
      state.statistic.complexWords.push(action.payload);
    },
    deleteComplex(state, action: PayloadAction<Dictionary>) {
      state.statistic.complexWords = state.statistic.complexWords.filter((word) => word.id !== action.payload.id);
    },
    addLearned(state, action: PayloadAction<Dictionary>) {
      state.statistic.learnedWords.push(action.payload);
    },
    deleteLearned(state, action: PayloadAction<Dictionary>) {
      state.statistic.learnedWords = state.statistic.learnedWords.filter((word) => word.id !== action.payload.id);
    },
  },
});

export default userSlice.reducer;
export const { logIn, logOut, addComplex, deleteComplex, addLearned, deleteLearned } = userSlice.actions;
