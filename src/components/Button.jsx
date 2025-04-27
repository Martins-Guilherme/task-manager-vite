const Button = ({
  children,
  size,
  variant = 'primary',
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant == 'primary') {
      return 'bg-[#00adb5] text-white'
    }
    if (variant == 'secondary') {
      return 'bg-[#EEEEEE] text-[#35383e]'
    }
    if (variant == 'ghost') {
      return 'bg-transparent text-[#818181]'
    }
  }
  const getSizeClasses = () => {
    if (size == 'small') {
      return ' py-1 text-xs'
    }
    if (size == 'large') {
      return 'py-2 text-sm'
    }
  }

  return (
    <button
      className={`flex cursor-pointer items-center justify-center gap-1 rounded-md px-3 ${getSizeClasses()} ${className} font-semibold transition-opacity hover:opacity-75 ${getVariantClasses()}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
