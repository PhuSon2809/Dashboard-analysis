import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { Dispatch, Fragment, memo, ReactNode, SetStateAction } from 'react'
import { OptionSelect } from '~/@types/common'
import { CheckIcon, ChevronDown, CloseIcon } from '~/assets/icons'

type SelectFilterProps = {
  label?: string
  className?: string
  fullWidth?: boolean
  isSortBy?: boolean
  hideClear?: boolean
  options: OptionSelect[]
  selected: OptionSelect
  leftIcon?: ReactNode
  maxHeight?: string
  setSelected: Dispatch<SetStateAction<OptionSelect>>
}

const SelectFilter = memo(
  ({
    label,
    className,
    fullWidth = false,
    isSortBy = false,
    hideClear = false,
    options,
    selected,
    setSelected,
    leftIcon,
    maxHeight
  }: SelectFilterProps) => {
    return (
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className={`relative ${fullWidth ? 'xs:w-full' : ''}`}>
            <ListboxButton
              className={`shadow-sm relative min-h-10 rounded-md bg-white text-left ring-1 ring-inset ring-blackMain/[.22] transition-colors duration-300 ease-in-out hover:ring-[1.5px] hover:ring-blackMain/[.30] focus:ring-[1.5px] focus:ring-blackMain/[.30] xs:min-w-[130px] xs:pr-8 sm:min-w-[180px] sm:pl-3 sm:pr-10 ${className}`}
            >
              <div className='flex items-center gap-2'>
                {leftIcon && leftIcon}
                {isSortBy && (
                  <>
                    {/* <SortIcon className='xs:size-[18px] sm:size-5' /> */}
                    <div className='h-6 border-0 border-r-[1px] border-solid border-blackMain/[.1]' />
                  </>
                )}
                <span className={`text-nowrap font-customRegular text-blackMain/[.64] xs:text-[12px] sm:text-[14px]`}>
                  {label && `${label}:`}{' '}
                  <span className={`truncate font-customMedium text-[14px] text-blackMain`}>{selected.label}</span>
                </span>
              </div>
              {!hideClear && selected.value !== '' && (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelected({ value: '', label: '' })
                  }}
                  className='absolute inset-y-0 right-5 flex items-center pr-2'
                >
                  <CloseIcon className='size-2' color={'black'} />
                </span>
              )}
              <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                <ChevronDown className='size-4' color={'black'} />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <ListboxOptions
                className={`absolute z-10 mt-1 ${maxHeight ? maxHeight : 'max-h-56'} shadow-lg scroll-bar-small w-full overflow-auto rounded-lg bg-white/[.64] py-1 backdrop-blur-[80px]`}
              >
                {options.map((option, index) => (
                  <ListboxOption
                    value={option}
                    key={index}
                    className={`flex cursor-pointer select-none items-center justify-between bg-transparent px-3 py-2 transition-colors duration-100 ease-in-out hover:bg-black/[.05] ${options.length - 1 === index ? '' : 'border-0 border-b-[1px] border-solid border-[#F8F8F9]'}`}
                  >
                    <span
                      className={`text-[14px] ${selected.value === option.value ? 'font-customMedium' : 'font-customRegular'} block truncate`}
                    >
                      {option.label}
                    </span>
                    {selected.value === option.value && <CheckIcon />}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        )}
      </Listbox>
    )
  }
)

export default SelectFilter
