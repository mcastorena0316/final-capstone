/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import {
  DISPLAY_FETCHED_DAYS, CREATE_DAY, DELETE_DAY, UPDATE_DAY,

} from '../actions/trackings';

export default function trackingReducer(state = [], action) {
  // console.log(action);
  // console.log('state de tracking', state);
  switch (action.type) {
    case DISPLAY_FETCHED_DAYS:
      return action.payload;
    case CREATE_DAY:
      return [...state, action.data];
    case DELETE_DAY:
      return state.filter(el => el.id !== action.payload.id);
    case UPDATE_DAY:
      const objIndex = state.findIndex(obj => obj.id === action.payload.id);
      let updateElement = {};
      updateElement = {
        ...state[objIndex],
        temperature: action.payload.temperature,
        date: action.payload.date,
        mood: action.payload.mood,
        symptons: action.payload.symptons,
        medicines: action.payload.medicines,
      };

      const updatedState = [
        ...state.slice(0, objIndex),
        updateElement,
        ...state.slice(objIndex + 1),
      ];
      // console.log(updatedState);
      return updatedState;
    default:
      return state;
  }
}
