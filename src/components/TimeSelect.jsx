import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Hoŕario</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid border-[#ececec] px-4 py-3 text-[#9a9c9f] placeholder:text-sm"
        {...props}
        ref={ref}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {props.errorMessage && (
        <span className="flex text-left text-xs text-red-500">
          {props.errorMessage}
        </span>
      )}
    </div>
  )
})

TimeSelect.displayName = 'TimeSelect'

export default TimeSelect
