import { memo, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface InputFieldProps {
  name: string
  label?: string
  type?: string
  rules?: Partial<Record<string, unknown>>
  defaultValue?: string
  disabled?: boolean
  placeholder?: string
  width?: string
  gap?: string
  fullWidth?: boolean
  className?: string | null
  classNameLabel?: string | null
  helperText?: string
  required?: boolean
  rightIcon?: ReactNode
  variant?: 'outline' | 'container' | 'outline-green'
  size?: 'small' | 'medium'
}

const InputField = memo(
  ({
    name,
    label = '',
    type = 'text',
    rules = {},
    defaultValue = '',
    placeholder = '',
    width,
    gap,
    disabled = false,
    fullWidth = false,
    className = null,
    classNameLabel = null,
    required = false,
    helperText,
    rightIcon,
    variant = 'outline',
    size = 'medium'
  }: InputFieldProps) => {
    const { control } = useFormContext()

    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          return (
            <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : 'w-[350px]'} ${width ? width : ''}`}>
              <div className={`flex flex-col ${gap ? gap : 'xs:gap-2 sm:gap-3'}`}>
                <label
                  htmlFor={name}
                  className={`${size === 'small' ? 'text-[16px]' : 'xs:text-[18px] sm:text-[20px]/[18px]'} font-customSemiBold capitalize ${disabled && 'text-blackMain/[.32]'} ${classNameLabel}`}
                >
                  {label} {required && <span className='text-redMain'>*</span>}
                </label>
                <div className='relative'>
                  <input
                    {...field}
                    id={name}
                    type={type}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`w-full ${size === 'small' ? 'h-[48px]' : 'xs:h-11 sm:h-[52px]'} px-5 ${variant === 'outline-green' ? 'border-[1px] border-solid border-greenMain rounded-lg pb-[2px]' : variant === 'outline' ? 'border-[1px] border-solid border-blackMain/[.22] xs:rounded-[30px] sm:rounded-[32px] pb-[2px]' : 'bg-greyLight rounded-lg'} ${
                      disabled
                        ? 'bg-blackMain/[.03]'
                        : variant === 'outline-green'
                          ? 'focus:ring-[1.2px] focus:ring-greenMain hover:ring-[1.2px] hover:ring-greenMain'
                          : variant === 'outline'
                            ? 'focus:ring-[1.5px] focus:ring-blackMain/[.30] hover:ring-[1.5px] hover:ring-blackMain/[.30]'
                            : 'focus:bg-blackMain/[.05] hover:bg-blackMain/[.05]'
                    } transition-colors ease-in-out duration-300 ${className}`}
                    onChange={(e) => {
                      let value = e.target.value

                      if (name === 'cvv') {
                        value = value.replace(/\D/g, '')
                        if (value.length > 3) {
                          value = value.slice(0, 3)
                        }
                        field.onChange(value)
                      } else {
                        field.onChange(value)
                      }
                    }}
                  />
                  <div
                    className={`absolute top-1/2 ${size === 'small' ? 'right-[20px]' : 'right-[25px]'} transform -translate-y-1/2 pointer-events-none`}
                  >
                    {rightIcon}
                  </div>
                </div>
              </div>
              {helperText && (
                <div className='min-h-[18px]'>
                  <p className='ml-2 xs:text-[13px] sm:text-[14px] text-gray-400'>{helperText}</p>
                </div>
              )}
              <div className='min-h-[18px]'>
                <p className='ml-2 xs:text-[13px] sm:text-[14px] text-red-500'>
                  {fieldState.error && fieldState.error.message}
                </p>
              </div>
            </div>
          )
        }}
      />
    )
  }
)

export default InputField
