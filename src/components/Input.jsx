import InputLabel from './InputLabel'

const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>

      <input
        className="rounded-lg border border-solid border-[#ececec] px-4 py-3 text-[#9a9c9f] outline-[#00ADB5] placeholder:text-sm"
        type="text"
        {...rest}
      />
    </div>
  )
}

export default Input
