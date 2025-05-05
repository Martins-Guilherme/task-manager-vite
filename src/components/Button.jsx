import PropTypes from 'prop-types'
import { tv } from 'tailwind-variants'

const Button = ({
  children,
  size = 'primary',
  color = 'small',
  className,
  ...rest
}) => {
  const button = tv({
    base: `flex cursor-pointer items-center justify-center gap-5 rounded-md px-3 font-semibold transition-opacity hover:opacity-75`,
    variants: {
      color: {
        primary: 'text-white bg-brand-primary',
        secondary: 'bg-brand-light-gray text-brand-dark-blue',
        ghost: 'bg-transparent text-brand-dark-gray',
      },
      size: {
        small: 'py-1 text-xs',
        large: 'py-2 text-sm',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 hover:opacity-50',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  })

  return (
    <button
      className={button({ color, size, disabled: rest.disabled, className })}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

export default Button
