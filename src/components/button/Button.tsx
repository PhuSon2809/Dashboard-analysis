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
        className={`${fullWidth ? 'w-full' : 'w-fit'} ${variant === 'outline-linear' ? 'p-[2px] bg-gradient-to-r from-greenMain to-blueMain rounded-lg flex items-center justify-center' : 'p-0'}`}
      >
        <button
          type={type}
          disabled={disabled}
          className={` flex items-center justify-center gap-2
         ${size === 'small' ? `${fullWidth ? 'w-full' : 'w-[120px]'} h-[40px]` : size === 'medium' ? `${fullWidth ? 'w-full' : 'w-[165px]'} h-[48px]` : `${fullWidth ? 'w-full' : 'w-[196px]'} h-[52px]`}
         ${
           variant === 'container'
             ? 'bg-blackMain text-white'
             : variant === 'outline'
               ? 'text-blackMain bg-transparent border-solid border-blackMain border-[2px]'
               : variant === 'outline-white'
                 ? 'bg-white/[.22] border-solid border-white border-[2px] text-white'
                 : variant === 'linear'
                   ? disabled
                     ? '!text-white !bg-[#dcdcdd] !border-none'
                     : 'bg-gradient-to-tr from-greenMain to-blueMain'
                   : variant === 'grey'
                     ? 'bg-greyMain'
                     : variant === 'outline-grey'
                       ? 'bg-transparent text-blackMain/[.64] border-solid border-blackMain/[.64] border-[2px]'
                       : variant === 'blue'
                         ? 'bg-blueMain text-white'
                         : variant === 'green'
                           ? 'bg-greenMain text-white'
                           : variant === 'red'
                             ? 'bg-redMain text-white'
                             : 'bg-white'
         } 
         ${variant === 'outline-linear' && 'rounded-md'}
         ${(variant === 'blue' || variant === 'green') && 'rounded-xl'}
         ${disabled ? '!text-white !bg-[#dcdcdd] !border-none' : ''}
         text-[20px] rounded-3xl ${shadow ? 'shadow-button' : ''} ${className} ${!disabled && variant !== 'outline-linear' && 'hover:shadow-avatar'} transition-all duration-200 ease-in-out 
         ${variant === 'outline-linear' && 'hover:bg-white/[.95]'}
       `}
          onClick={onClick}
        >
          {iconLeft && iconLeft}
          <p
            className={`text-nowrap font-medium leading-none uppercase ${variant === 'outline-linear' && 'bg-gradient-to-r from-greenMain to-blueMain text-transparent bg-clip-text'} ${classNameText}`}
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
