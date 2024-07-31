import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import classNames from 'classnames'
import { memo, useEffect, useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OptionSelect } from '~/@types/common'
import { CheckIcon, ChevronDown } from '../icons'

interface SelectFieldProps {
  name: string
  label?: string
  rules?: Record<string, unknown>
  options: OptionSelect[]
  width?: string
  disabled?: boolean
  fullWidth?: boolean
  className?: string | null
  classNameLabel?: string | null
  required?: boolean
  helperText?: string
  placeholder?: string
  value?: OptionSelect
  variant?: 'outline' | 'container'
  size?: 'small' | 'medium'
}

const SelectField = memo(
  ({
    name,
    label,
    rules = {},
    options = [],
    width,
    disabled = false,
    fullWidth = false,
    required = false,
    helperText,
    placeholder,
    value,
    classNameLabel = null,
    variant = 'outline',
    size = 'medium'
  }: SelectFieldProps) => {
    const { control } = useFormContext()

    const [query, setQuery] = useState<string>('')
    const [selected, setSelected] = useState<OptionSelect>({ value: '', label: '' })

    useEffect(() => {
      if (value) setSelected(value)
    }, [value])

    const optionRenders = useMemo(
      () =>
        query === ''
          ? options
          : options.filter((option) => {
              return option.label.toLowerCase().includes(query.toLowerCase())
            }),
      [query, options]
    )

    return (
      <Controller
        name={name}
        rules={rules}
        control={control}
        defaultValue={''}
        render={({ field, fieldState }) => {
          return (
            <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : 'w-[350px]'} ${width ? width : ''}`}>
              <div className='flex flex-col xs:gap-2 sm:gap-3'>
                {label && (
                  <label
                    htmlFor={name}
                    className={`${size === 'small' ? 'text-[16px]' : 'xs:text-[18px] sm:text-[20px]/[18px]'} font-customSemiBold capitalize ${disabled && 'text-blackMain/[.32]'} ${classNameLabel}`}
                  >
                    {label} {required && <span className='text-redMain'>*</span>}
                  </label>
                )}

                <Combobox
                  value={selected}
                  onChange={(value) => {
                    if (value) {
                      setSelected(value)
                      field.onChange(value?.value)
                    }
                  }}
                  onClose={() => setQuery('')}
                >
                  <div className='relative'>
                    <ComboboxInput
                      disabled={disabled}
                      placeholder={placeholder}
                      onChange={(event) => setQuery(event.target.value)}
                      displayValue={(option: OptionSelect) => option?.label}
                      className={classNames(
                        `relative w-full py-1.5 pl-5 pr-10 shadow-sm focus:outline-none`,
                        size === 'small' ? 'h-[48px]' : 'xs:h-11 sm:h-[52px]',
                        variant === 'outline'
                          ? `${disabled ? 'bg-blackMain/[.03]' : 'bg-transparent hover:ring-[1.2px] hover:ring-blackMain/[.3]'} 
                              border-[1px] border-solid border-blackMain/[.22] focus:ring-[1.2px] focus:ring-blackMain/[.3] xs:rounded-[30px] sm:rounded-[32px]`
                          : `${disabled ? 'bg-blackMain/[.03]' : 'bg-greyLight'} rounded-lg focus:bg-blackMain/[.05]`,
                        disabled && 'hover:bg-blackMain/[.05]'
                      )}
                    />
                    <ComboboxButton disabled={disabled} className='group absolute inset-y-0 right-0 px-2.5'>
                      <ChevronDown className='size-4' color={'black'} />
                    </ComboboxButton>
                  </div>
                  {options?.length > 0 && (
                    <ComboboxOptions
                      anchor='bottom'
                      className={classNames(
                        'w-[var(--input-width)] !max-h-[200px] mt-2 overflow-auto rounded-xl bg-white/[.64] backdrop-blur-[80px] p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition duration-200 ease-in-out scroll-bar-small'
                      )}
                    >
                      {optionRenders.map((option) => (
                        <ComboboxOption
                          key={option.value}
                          value={option}
                          className='flex items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/5 cursor-pointer transition duration-200 ease-in-out'
                        >
                          <CheckIcon className='invisible size-4 fill-black group-data-[selected]:visible' />
                          <div className='text-sm/6 text-black'>{option.label}</div>
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
                  )}
                </Combobox>
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

export default SelectField
