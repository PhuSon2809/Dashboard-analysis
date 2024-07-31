import { Transition } from '@headlessui/react'
import Lottie from 'lottie-react'
import { memo } from 'react'
import AnimationDot from '~/constants/animation/AnimationDot.json'
import { Logo } from '../logo'
import OceanEffect from './OceanEffect'

const LoadingMain = memo(({ isOpen }: { isOpen: boolean }) => {
  return (
    <Transition
      enter='ease-out duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='ease-in duration-200'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      show={isOpen}
    >
      <div className='absolute z-50 top-0 bottom-0 left-0 right-0'>
        <div className='relative'>
          <div className='absolute z-10 top-0 bottom-0 left-0 right-0'>
            <OceanEffect />
          </div>

          <div className='flex flex-col items-center gap-5 absolute top-[18vh] left-1/2 transform -translate-x-1/2 z-20'>
            <Logo isChangeColor={false} />
            <div className='flex items-end'>
              <h1 className='text-white text-[48px] leading-[50.4px] font-customSemiBold'>Loading</h1>
              <Lottie animationData={AnimationDot} className='w-[50px] -mb-1' />
            </div>
            <h5 className='text-white/[.9] text-[24px] leading-[26px] font-customMedium capitalize'>
              checking information
            </h5>
          </div>
        </div>
      </div>
    </Transition>
  )
})

export default LoadingMain
