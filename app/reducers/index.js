import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import app from './app.reducer';

export default combineReducers({ form, app });
