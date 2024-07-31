import { memo, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface RadioGroupFieldProps {
  name: string
  rules?: Partial<Record<string, unknown>>
  disabled?: boolean
  required?: boolean
  className?: string | null
  helperText?: string
  defaultValue?: string
  options: { value: number | string; label: ReactNode }[]
}

const RadioGroupField = memo(
  ({
    name,
    rules = {},
    disabled = false,
    required = false,
    className = null,
    helperText,
    defaultValue = '',
    options
  }: RadioGroupFieldProps) => {
    const { control } = useFormContext()

    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          return (
            <div className={`flex flex-col gap-1 w-full`}>
              <div className='flex items-center xs:gap-4 sm:gap-5 w-full'>
                {options.map((option, i) => (
                  <div
                    key={i}
                    className={`w-full xs:h-[50px] sm:h-[96px] xs:px-3 sm:px-6 flex items-center justify-between border-[1px] border-solid border-blackMain/[.12] xs:rounded-none sm:rounded-xl ${className}`}
                  >
                    {option.label}
                    <input
                      {...field}
                      id={name}
                      type='radio'
                      required={required}
                      disabled={disabled}
                      value={option.value}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value)
                      }}
                      checked={field.value === option.value}
                      className='appearance-none xs:size-[14px] sm:size-8 flex items-center justify-center border border-blackMain border-solid rounded-full checked:bg-transparent checked:after:content-[" "] xs:checked:after:size-[8px] sm:checked:after:size-4 checked:after:rounded-full checked:after:bg-blackMain hover:scale-105 transition-all duration-300 ease-linear cursor-pointer'
                    />
                  </div>
                ))}
              </div>

              {helperText && (
                <div className='h-[18px]'>
                  <p className='mt-2 text-[14px] text-gray-400'>{helperText}</p>
                </div>
              )}
              <div className='h-[18px]'>
                <p className='mt-2 text-[14px] text-red-500'>{fieldState.error && fieldState.error.message}</p>
              </div>
            </div>
          )
        }}
      />
    )
  }
)

export default RadioGroupField
