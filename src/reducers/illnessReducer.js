import { DISPLAY_FETCHED_ILLNESS } from '../actions/illness';

export default function missionReducer(state = [], action) {
    console.log(action)
  switch (action.type) {
    case DISPLAY_FETCHED_ILLNESS:
      return action.payload;
    default:
      return state;
  }
}
