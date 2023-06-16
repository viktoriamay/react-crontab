import {
  CHANGE_MINUTES_VALUE,
  CHANGE_MINUTES_VISIBILITY,
  CLEAR_MINUTES_VALUE,
} from '../types/types';

const initialState = {
  selectedMinutes: [],
  isVisibleMinutes: false,
};

export const minutesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MINUTES_VALUE:
      return { ...state, selectedMinutes: action.payload };
    case CLEAR_MINUTES_VALUE:
      return { ...state, selectedMinutes: [] };
    case CHANGE_MINUTES_VISIBILITY:
      return {
        ...state,
        isVisibleMinutes: action.isVisibleMinutes,
      };
    default:
      return state;
  }
};
