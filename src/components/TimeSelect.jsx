import InputLabel from './InputLabel'

const TimeSelect = (props) => {
  return (
    <div>
      <div className="flex flex-col gap-1 text-left">
        <InputLabel htmlFor="time">Hoŕario</InputLabel>
        <select
          id="time"
          className="rounded-lg border border-solid border-[#ececec] px-4 py-3 text-[#9a9c9f] placeholder:text-sm"
          {...props}
        >
          <option value="morning">Manhã</option>
          <option value="afternoon">Tarde</option>
          <option value="evening">Noite</option>
        </select>
      </div>
    </div>
  )
}

export default TimeSelect
