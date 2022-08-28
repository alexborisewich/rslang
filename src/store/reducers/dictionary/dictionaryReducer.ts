import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dictionary } from '../../../common/interface/interface';
import { DictionaryState } from '../../../common/types/dictionary/types';
import api from '../../../components/api/api';

export const fetchWords = createAsyncThunk<
  Dictionary[],
  { group: string | number; page: number },
  { rejectValue: string }
>('dictionary/fetchPage', async ({ group, page }, { rejectWithValue }) => {
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

const initialState: DictionaryState = {
  words: [],
  activeTab: 'all',
  complexWords: [],
  learnedWords: [],
  totalWordsCount: 0,
  selectedWord: '',
  group: 0,
  page: 0,
  isLoading: false,
  isPlaying: false,
  error: { isError: false, message: '' },
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    selectWord(state, action: PayloadAction<string>) {
      state.selectedWord = action.payload;
    },
    selectDifficulty(state, action: PayloadAction<number>) {
      state.group = action.payload;
    },
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    switchDictionaryTab(state, action: PayloadAction<'all' | 'complex'>) {
      state.activeTab = action.payload;
    },
    addComplexWord(state, action: PayloadAction<Dictionary>) {
      state.complexWords.push(action.payload);
    },
    deleteComplexWord(state, action: PayloadAction<Dictionary>) {
      state.complexWords = state.complexWords.filter((word) => word.id !== action.payload.id);
    },
    addLearnedWord(state, action: PayloadAction<Dictionary>) {
      state.learnedWords.push(action.payload);
    },
    deleteLearnedWord(state, action: PayloadAction<Dictionary>) {
      console.log(action.payload.id);
      state.learnedWords = state.learnedWords.filter((word) => word.id !== action.payload.id);
    },
    changePlayState(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.isLoading = true;
        state.error.isError = false;
        state.error.message = '';
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.words = action.payload;
        if (!state.selectedWord) state.selectedWord = action.payload[0].id;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error.isError = true;
        if (action.payload) state.error.message = action.payload;
      });
  },
});

export default dictionarySlice.reducer;
export const {
  selectWord,
  selectDifficulty,
  changePage,
  switchDictionaryTab,
  addComplexWord,
  deleteComplexWord,
  addLearnedWord,
  deleteLearnedWord,
  changePlayState,
} = dictionarySlice.actions;
