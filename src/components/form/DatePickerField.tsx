import { format } from 'date-fns'
import { memo, ReactNode } from 'react'
import { DayPicker } from 'react-day-picker'
import { Controller, useFormContext } from 'react-hook-form'
import { ArrowLeftIcon, ArrowRightIcon } from '~/components/icons'
import { PopoverCustom } from '~/components/popover'

interface DatePickerFieldProps {
  name: string
  label?: string
  type?: string
  rules?: Partial<Record<string, unknown>>
  defaultValue?: string
  disabled?: boolean
  placeholder?: string
  width?: string
  fullWidth?: boolean
  className?: string | null
  classNameLabel?: string | null
  helperText?: string
  required?: boolean
  rightIcon?: ReactNode
  variant?: 'outline' | 'container'
  size?: 'small' | 'medium'
}

const DatePickerField = memo(
  ({
    name,
    label = '',
    type = 'text',
    rules = {},
    defaultValue = '',
    placeholder = '',
    width,
    disabled = false,
    fullWidth = false,
    className = null,
    classNameLabel = null,
    required = false,
    helperText,
    rightIcon,
    variant = 'outline',
    size = 'medium'
  }: DatePickerFieldProps) => {
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
                className={`${size === 'small' ? 'text-[16px]' : 'text-[20px]'} font-customSemiBold capitalize ${disabled && 'text-blackMain/[.32]'} ${classNameLabel}`}
              >
                {label}
              </label>
              <div className='w-full'>
                <PopoverCustom
                  position='bottom start'
                  content={
                    <DayPicker
                      mode='single'
                      fromYear={1900}
                      toYear={2500}
                      captionLayout='dropdown-buttons'
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date)
                      }}
                      showOutsideDays
                      style={{ overflow: 'unset' }}
                      className='min-h-[400px] p-3 !mx-0 !mt-0 bg-white rounded-lg border-black/10 border-solid border-[1px]'
                      classNames={{
                        caption: 'flex justify-center py-2 mb-4 relative items-center',
                        caption_label: 'text-sm font-medium text-gray-900',
                        nav: 'flex items-center',
                        nav_button:
                          'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
                        nav_button_previous: 'absolute left-1.5',
                        nav_button_next: 'absolute right-[17px]',
                        table: 'w-full border-collapse',
                        head_row: 'flex font-medium text-gray-900',
                        head_cell: 'm-0.5 w-9 font-normal text-sm',
                        row: 'flex w-full mt-2',
                        cell: 'text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                        day: 'h-9 w-9 p-0 font-normal',
                        day_range_end: 'day-range-end',
                        day_selected:
                          'rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white',
                        day_today: 'rounded-md bg-gray-200 text-gray-900',
                        day_outside:
                          'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
                        day_disabled: 'text-gray-500 opacity-50',
                        day_hidden: 'invisible'
                      }}
                      components={{
                        IconLeft: ({ ...props }) => <ArrowLeftIcon {...props} className='h-4 w-4 stroke-2' />,
                        IconRight: ({ ...props }) => <ArrowRightIcon {...props} className='h-4 w-4 stroke-2' />
                      }}
                    />
                  }
                >
                  <div className='w-full relative'>
                    <input
                      {...field}
                      id={name}
                      type={type}
                      required={required}
                      disabled={disabled}
                      placeholder={placeholder}
                      value={field.value ? format(field.value, 'dd/MM/yyyy') : ''}
                      className={`w-full ${size === 'small' ? 'h-[48px]' : 'h-[52px]'} px-5  ${variant === 'outline' ? 'border-[1px] border-solid border-blackMain/[.22] rounded-[30px] pb-[2px]' : 'bg-greyLight rounded-lg'} ${
                        disabled
                          ? 'bg-blackMain/[.03]'
                          : variant === 'outline'
                            ? 'focus:ring-[1.5px] focus:ring-blackMain/[.30] hover:ring-[1.5px] hover:ring-blackMain/[.30]'
                            : 'focus:bg-blackMain/[.05] hover:bg-blackMain/[.05]'
                      } transition-colors ease-in-out duration-300 ${className}`}
                    />
                    <div
                      className={`absolute top-1/2 ${size === 'small' ? 'right-[20px]' : 'right-[25px]'} transform -translate-y-1/2 pointer-events-none`}
                    >
                      {rightIcon}
                    </div>
                  </div>
                </PopoverCustom>
              </div>
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
        )}
      />
    )
  }
)

export default DatePickerField
