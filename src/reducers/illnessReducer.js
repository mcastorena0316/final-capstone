/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  DISPLAY_FETCHED_ILLNESS,
  CREATE_ILLNESS, DELETE_ILLNESS, UPDATE_ILLNESS,
} from '../actions/illness';

export default function illnessReducer(state = [], action) {
  console.log('state de illness', state);
  // console.log('action', action);
  switch (action.type) {
    case DISPLAY_FETCHED_ILLNESS:
      return action.payload;
    case CREATE_ILLNESS:
      return [...state, action.data];
    case DELETE_ILLNESS:
      return state.filter(el => el.id !== action.payload.id);
    case UPDATE_ILLNESS:
      const objIndex = state.findIndex(obj => obj.id === action.payload.id);
      let updateObj = {};
      updateObj = {
        ...state[objIndex],
        description: action.payload.description,
        name: action.payload.name,
      };

      const updatedState = [
        ...state.slice(0, objIndex),
        updateObj,
        ...state.slice(objIndex + 1),
      ];

      // console.log('update array', updatedProjects);
      return updatedState;
    default:
      return state;
  }
}
