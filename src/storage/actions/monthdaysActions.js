import { CHANGE_MONTHDAY_VALUE, CHANGE_MONTHDAY_VISIBILITY, CLEAR_MONTHDAY_VALUE } from "../types/types"

export const changeMonthdaysValue = (value) => {
  return {
    type: CHANGE_MONTHDAY_VALUE,
    payload: value
  }
}

export const changeMonthdaysVisibility = (isVisibleMonthdays) => ({
  type: CHANGE_MONTHDAY_VISIBILITY,
  isVisibleMonthdays,
});

export const clearMonthdaysValue = () => ({
  type: CLEAR_MONTHDAY_VALUE,
});