import { CHANGE_MONTHS_VALUE, CHANGE_MONTHS_VISIBILITY, CLEAR_MONTHS_VALUE } from "../types/types"

export const changeMonthsValue = (value) => {
  return {
    type: CHANGE_MONTHS_VALUE,
    payload: value
  }
}

export const changeMonthsVisibility = (isVisibleMonths) => ({
  type: CHANGE_MONTHS_VISIBILITY,
  isVisibleMonths,
});

export const clearMonthsValue = () => ({
  type: CLEAR_MONTHS_VALUE,
});