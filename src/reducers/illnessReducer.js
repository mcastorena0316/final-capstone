import {
  DISPLAY_FETCHED_ILLNESS, DISPLAY_FETCHED_DAYS,
  CREATE_ILLNESS, CREATE_ILLNESS_ERROR,
} from '../actions/illness';

export default function illnessReducer(state = [], action) {
  console.log(action);
  console.log('state de illnes', state);
  switch (action.type) {
    case DISPLAY_FETCHED_ILLNESS:
      return action.payload;
    case DISPLAY_FETCHED_DAYS:
      return action.payload;
    case CREATE_ILLNESS:
      return {
        ...state,
        arr: [...state.arr, action.data],
      };
    default:
      return state;
  }
}
