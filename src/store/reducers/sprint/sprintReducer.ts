import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Dictionary } from '../../../common/interface/interface';
import api from '../../../components/api/api';

type SprintState = {
  score: number;
  time: number;
  words: Dictionary[];
  page: number;
  group: number;
  correct: Dictionary[];
  wrong: Dictionary[];
  question: Dictionary | null;
  answer: Dictionary | null;
  isStarted: boolean;
  isCorrect: boolean;
  isLoading: boolean;
  error: { isError: boolean; message: string };
};

const initialState: SprintState = {
  score: 0,
  time: 60,
  words: [],
  page: 0,
  group: 0,
  correct: [],
  wrong: [],
  question: null,
  answer: null,
  isStarted: false,
  isCorrect: false,
  isLoading: false,
  error: { isError: false, message: '' },
};

const getSprintData = createAsyncThunk<Dictionary[], { group: string | number; page: number }, { rejectValue: string }>(
  'sprint/getSprintData',
  async ({ group, page }, { rejectWithValue }) => {
    try {
      const response = await api.getDataPage(group, page);
      if (!response.ok) throw new Error('fetch error');
      const data = (await response.json()) as Dictionary[];
      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message);
    }
  }
);

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {},
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
        if (!state.question) [state.question] = action.payload;
      })
      .addCase(getSprintData.rejected, (state, action) => {
        state.isLoading = false;
        state.error.isError = true;
        if (action.payload) state.error.message = action.payload;
      });
  },
});

export default sprintSlice.reducer;
