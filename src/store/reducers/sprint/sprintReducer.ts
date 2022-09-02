import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dictionary } from '../../../common/interface/interface';
import api from '../../../components/api/api';

type SprintState = {
  score: number;
  time: number;
  streak: number;
  maxStreak: number;
  words: Dictionary[];
  page: number;
  group: number;
  correct: Dictionary[];
  wrong: Dictionary[];
  roundState: {
    question: Dictionary | null;
    answer: Dictionary | null;
    isCorrect: boolean;
  };
  showStat: boolean;
  question: Dictionary | null;
  answer: Dictionary | null;
  isFullscreen: boolean;
  isMuted: boolean;
  isStarted: boolean;
  isLoading: boolean;
  error: { isError: boolean; message: string };
};

const initialState: SprintState = {
  score: 0,
  time: 60,
  streak: 0,
  maxStreak: 0,
  words: [],
  page: 0,
  group: 0,
  correct: [],
  wrong: [],
  roundState: {
    question: null,
    answer: null,
    isCorrect: false,
  },
  showStat: false,
  question: null,
  answer: null,
  isFullscreen: false,
  isMuted: false,
  isStarted: false,
  isLoading: false,
  error: { isError: false, message: '' },
};

export const getSprintData = createAsyncThunk<
  Dictionary[],
  { group: string | number; page: number },
  { rejectValue: string }
>('sprint/getSprintData', async ({ group, page }, { rejectWithValue }) => {
  try {
    const response = await api.getDataPage(group, page);
    if (!response.ok) throw new Error('fetch error');
    const data = (await response.json()) as Dictionary[];
    return data;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    init(state) {
      state.score = initialState.score;
      state.time = initialState.time;
      state.streak = initialState.streak;
      state.maxStreak = initialState.maxStreak;
      state.words = initialState.words;
      state.correct = initialState.correct;
      state.wrong = initialState.wrong;
      state.roundState = initialState.roundState;
      state.showStat = initialState.showStat;
      state.isStarted = initialState.isStarted;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    },
    switchGameStatus(state, action: PayloadAction<boolean>) {
      state.isStarted = action.payload;
    },
    showSprintStat(state, action: PayloadAction<boolean>) {
      state.showStat = action.payload;
    },
    setRoundState(state, action: PayloadAction<{ question: Dictionary; answer: Dictionary }>) {
      state.roundState.question = action.payload.question;
      state.roundState.answer = action.payload.answer;
      state.roundState.isCorrect = action.payload.question.wordTranslate === action.payload.answer.wordTranslate;
      state.words = state.words.filter((word) => word.id !== action.payload.question.id);
    },
    checkUserAnswer(state, action: PayloadAction<boolean>) {
      const audio = new Audio();
      if (state.roundState.isCorrect === action.payload) {
        state.streak += 1;
        state.score += 20;
        state.maxStreak = Math.max(state.maxStreak, state.streak);
        audio.src = '../../../assets/music/correct.mp3';
        if (!state.isMuted) audio.play();
        if (state.roundState.question) state.correct.push(state.roundState.question);
        // if (action.payload) state.words = state.words.filter((word) => word.id !== state.roundState.answer?.id);
      } else {
        state.streak = 0;
        audio.src = '../../../assets/music/error.mp3';
        if (!state.isMuted) audio.play();
        if (state.roundState.question) state.wrong.push(state.roundState.question);
      }
    },
    tick(state) {
      state.time -= 1;
    },
    mute(state) {
      state.isMuted = !state.isMuted;
    },
    toggleFullscreen(state) {
      state.isFullscreen = !state.isFullscreen;
    },
    setGroupAndPage(state, action: PayloadAction<{ group: number; page: number }>) {
      state.group = action.payload.group;
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSprintData.pending, (state) => {
        state.isLoading = true;
        state.error.isError = false;
        state.error.message = '';
      })
      .addCase(getSprintData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.words = action.payload;
      })
      .addCase(getSprintData.rejected, (state, action) => {
        state.isLoading = false;
        state.error.isError = true;
        if (action.payload) state.error.message = action.payload;
      });
  },
});

export default sprintSlice.reducer;
export const {
  init,
  switchGameStatus,
  showSprintStat,
  setRoundState,
  checkUserAnswer,
  tick,
  mute,
  toggleFullscreen,
  setGroupAndPage,
} = sprintSlice.actions;
