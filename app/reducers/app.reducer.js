import { handleActions } from 'redux-actions';
import { SET_LANGUAGE } from '../actions';

export const initialState = {
  userId: 0,
  brokerId: 5,
  email: '',
  username: '',
  form: 'blinktrade',
  countryNumber: 0,
  country: '',
  state: '',
  lang: 'en',
  testnet: false,
};

const appReduce = handleActions({
  [SET_LANGUAGE]: (state, action) => ({
    ...state,
    lang: action.payload,
  }),
}, initialState);

export default appReduce;
