import { combineReducers, configureStore } from '@reduxjs/toolkit';
import app from './reducers/app/appReducer';
import dictionary from './reducers/dictionary/dictionaryReducer';
import user from './reducers/user/userReducer';

const rootReducer = combineReducers({ app, dictionary, user });
const store = configureStore({ reducer: rootReducer });

export default store;
