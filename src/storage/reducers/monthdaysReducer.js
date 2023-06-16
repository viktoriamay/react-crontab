import {
  CHANGE_MONTHDAY_VALUE,
  CHANGE_MONTHDAY_VISIBILITY,
  CLEAR_MONTHDAY_VALUE,
} from '../types/types';

const initialState = {
  selectedMonthdays: [],
  isVisibleMonthdays: false,
};

export const monthdaysReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MONTHDAY_VALUE:
      return { ...state, selectedMonthdays: action.payload };
    case CLEAR_MONTHDAY_VALUE:
      return { ...state, selectedMonthdays: [] };
    case CHANGE_MONTHDAY_VISIBILITY:
      return {
        ...state,
        isVisibleMonthdays: action.isVisibleMonthdays,
      };
    default:
      return state;
  }
};
