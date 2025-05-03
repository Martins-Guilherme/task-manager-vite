import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import InputLabel from './InputLabel'
import InputErrorMessage from './InputsErrorMessage'

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>

      <input
        className="rounded-lg border border-solid border-[#ececec] px-4 py-3 text-brand-text-gray outline-brand-primary placeholder:text-sm"
        type="text"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage errorMessage={errorMessage} />}
    </div>
  )
})

Input.displayName = 'Input'
Input.proptypes = {
  is: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Input
