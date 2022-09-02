import { combineReducers, configureStore } from '@reduxjs/toolkit';
import app from './reducers/app/appReducer';
import dictionary from './reducers/dictionary/dictionaryReducer';
import user from './reducers/user/userReducer';
import sprint from './reducers/sprint/sprintReducer';

const rootReducer = combineReducers({ app, dictionary, user, sprint });
const store = configureStore({ reducer: rootReducer });

export default store;
