import { CHANGE_MINUTES_VALUE, CHANGE_MINUTES_VISIBILITY, CLEAR_MINUTES_VALUE } from "../types/types"

export const changeMinutesValue = (value) => {
  return {
    type: CHANGE_MINUTES_VALUE,
    payload: value
  }
}

export const changeMinutesVisibility = (isVisibleMinutes) => ({
  type: CHANGE_MINUTES_VISIBILITY,
  isVisibleMinutes,
});

export const clearMinutesValue = () => ({
  type: CLEAR_MINUTES_VALUE,
});