import { DISPLAY_FETCHED_MEDICINE } from '../actions/medicines';

export default function trackingReducer(state = [], action) {
  switch (action.type) {
    case DISPLAY_FETCHED_MEDICINE:
      return action.payload;
    default:
      return state;
  }
}
