import { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface TextareaFieldProps {
  name: string
  label?: string
  rows?: number
  rules?: Partial<Record<string, unknown>>
  defaultValue?: string
  disabled?: boolean
  placeholder?: string
  width?: string
  fullWidth?: boolean
  className?: string | null
  helperText?: string
  classNameLabel?: string
  required?: boolean
  variant?: 'outline' | 'container'
}

const TextareaField = memo(
  ({
    name,
    label = '',
    rows = 4,
    rules = {},
    defaultValue = '',
    placeholder = '',
    width,
    disabled = false,
    fullWidth = false,
    className = null,
    required = false,
    variant = 'outline',
    helperText,
    classNameLabel
  }: TextareaFieldProps) => {
    const { control } = useFormContext()

    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : 'w-[350px]'} ${width ? width : ''}`}>
            <div className='flex flex-col xs:gap-2 sm:gap-3'>
              <label
                htmlFor={name}
                className={`xs:text-[18px] sm:text-[20px] font-customSemiBold capitalize ${disabled && 'text-blackMain/[.32]'} ${classNameLabel}`}
              >
                {label}
              </label>
              <textarea
                {...field}
                id={name}
                rows={rows}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full ${variant === 'outline' ? 'border-[1px] border-solid border-blackMain/[.22] rounded-[26px] px-5 py-2' : 'bg-greyLight rounded-lg px-5 py-2'} ${
                  disabled
                    ? 'bg-blackMain/[.03]'
                    : variant === 'outline'
                      ? 'focus:ring-[1.5px] focus:ring-blackMain/[.30] hover:ring-[1.5px] hover:ring-blackMain/[.30]'
                      : 'focus:bg-blackMain/[.05] hover:bg-blackMain/[.05]'
                } transition-colors ease-in-out duration-300 ${className}`}
                onChange={(e) => {
                  const value = e.target.value.trimStart()
                  field.onChange(value)
                }}
              />
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
        )}
      />
    )
  }
)

export default TextareaField
