import { DISPLAY_FETCHED_ILLNESS, DISPLAY_FETCHED_DAYS } from '../actions/illness';

export default function illnessReducer(state = [], action) {
  switch (action.type) {
    case DISPLAY_FETCHED_ILLNESS:
      return action.payload;
    case DISPLAY_FETCHED_DAYS:
      return action.payload;

    default:
      return state;
  }
}
