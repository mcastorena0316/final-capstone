import {
  DISPLAY_FETCHED_ILLNESS,
  CREATE_ILLNESS, DELETE_ILLNESS,
} from '../actions/illness';

export default function illnessReducer(state = [], action) {
  // console.log(action);
  // console.log('state de illnes', state);
  switch (action.type) {
    case DISPLAY_FETCHED_ILLNESS:
      return action.payload;
    case CREATE_ILLNESS:
      return [...state, action.data];
    case DELETE_ILLNESS:
      return state.filter(el => el.id !== action.payload.id);

    default:
      return state;
  }
}
