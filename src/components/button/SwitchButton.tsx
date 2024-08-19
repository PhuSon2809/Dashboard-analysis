import { Switch } from '@headlessui/react'
import { memo } from 'react'

type SwitchButtonProps = { label?: string; isChecked?: boolean; handleOnChange?: () => void }

const SwitchButton = memo(({ isChecked, handleOnChange }: SwitchButtonProps) => {
  return (
    <Switch
      checked={isChecked}
      onChange={handleOnChange}
      className='shadow-avatar group relative flex cursor-pointer rounded-full bg-[#CCCCCE] p-1 transition-colors duration-200 ease-in-out data-[checked]:bg-white xs:h-7 xs:w-[40px] sm:h-8 sm:w-[56px]'
    >
      <span
        aria-hidden='true'
        className='shadow-lg pointer-events-none inline-block translate-x-0 rounded-full bg-white ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-6 group-data-[checked]:bg-greenMain xs:size-5 sm:size-6'
      />
    </Switch>
  )
})

export default SwitchButton
