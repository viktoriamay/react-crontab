import { Monthdays } from "../Monthdays/Monthdays"
import { Months } from "../Months/Months"
import { Time } from "../Time/Time"

export const MonthlySchedule = () => {
  return (
    <div>
      <h2>Every {'day / '} at {} and {}</h2>
      <Months />
      <Monthdays />
      <Time />
    </div>
  )
}