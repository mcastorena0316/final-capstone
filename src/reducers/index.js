import { combineReducers } from 'redux';
import userReducer from './userReducer';
import illnessReducer from './illnessReducer';

export default combineReducers({
  user: userReducer,
  illness: illnessReducer,
});
