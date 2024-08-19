import { memo, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  iconLeft?: ReactNode
  iconRight?: ReactNode
  type?: 'button' | 'reset' | 'submit' | undefined
  className?: string
  classNameText?: string
  fullWidth?: boolean
  shadow?: boolean
  disabled?: boolean
  variant?:
    | 'container'
    | 'outline'
    | 'linear'
    | 'grey'
    | 'outline-white'
    | 'outline-linear'
    | 'outline-grey'
    | 'blue'
    | 'green'
    | 'red'
    | ''
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}

const Button = memo(
  ({
    children,
    iconLeft,
    iconRight,
    type = 'button',
    className,
    classNameText,
    fullWidth,
    shadow,
    disabled,
    variant = 'container',
    size = 'medium',
    onClick
  }: ButtonProps) => {
    return (
      <div
        className={`${fullWidth ? 'w-full' : 'w-fit'} ${variant === 'outline-linear' ? 'flex items-center justify-center rounded-lg bg-gradient-to-r from-greenMain to-blueMain p-[2px]' : 'p-0'}`}
      >
        <button
          type={type}
          disabled={disabled}
          className={`flex items-center justify-center gap-2 ${size === 'small' ? `${fullWidth ? 'w-full' : 'w-[120px]'} h-[40px]` : size === 'medium' ? `${fullWidth ? 'w-full' : 'w-[165px]'} h-[48px]` : `${fullWidth ? 'w-full' : 'w-[196px]'} h-[52px]`} ${
            variant === 'container'
              ? 'bg-blackMain text-white'
              : variant === 'outline'
                ? 'border-[2px] border-solid border-blackMain bg-transparent text-blackMain'
                : variant === 'outline-white'
                  ? 'border-[2px] border-solid border-white bg-white/[.22] text-white'
                  : variant === 'linear'
                    ? disabled
                      ? '!border-none !bg-[#dcdcdd] !text-white'
                      : 'bg-gradient-to-tr from-greenMain to-blueMain'
                    : variant === 'grey'
                      ? 'bg-greyMain'
                      : variant === 'outline-grey'
                        ? 'border-[2px] border-solid border-blackMain/[.64] bg-transparent text-blackMain/[.64]'
                        : variant === 'blue'
                          ? 'bg-blueMain text-white'
                          : variant === 'green'
                            ? 'bg-greenMain text-white'
                            : variant === 'red'
                              ? 'bg-redMain text-white'
                              : 'bg-white'
          } ${variant === 'outline-linear' && 'rounded-md'} ${(variant === 'blue' || variant === 'green') && 'rounded-xl'} ${disabled ? '!border-none !bg-[#dcdcdd] !text-white' : ''} rounded-3xl text-[20px] ${shadow ? 'shadow-button' : ''} ${className} ${!disabled && variant !== 'outline-linear' && 'hover:shadow-avatar'} transition-all duration-200 ease-in-out ${variant === 'outline-linear' && 'hover:bg-white/[.95]'} `}
          onClick={onClick}
        >
          {iconLeft && iconLeft}
          <p
            className={`text-nowrap font-medium uppercase leading-none ${variant === 'outline-linear' && 'bg-gradient-to-r from-greenMain to-blueMain bg-clip-text text-transparent'} ${classNameText}`}
          >
            {children}
          </p>
          {iconRight && iconRight}
        </button>
      </div>
    )
  }
)

export default Button
