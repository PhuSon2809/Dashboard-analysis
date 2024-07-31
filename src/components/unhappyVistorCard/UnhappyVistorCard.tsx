import { memo } from 'react'
import { DecreaseIcon } from '../icons'
import images from '~/assets'

const UnhappyVistorCard = memo(() => {
  return (
    <div className='w-[355px] h-[235px] rounded-[32px] bg-white/[.44] backdrop-blur-2xl relative shadow-s-1 overflow-hidden'>
      <div className='w-fit flex flex-col items-center gap-1 mt-[52px] ml-[158px]'>
        <p className='text-[18px]/[28px] font-normal text-grey999/[.64]'>Current views</p>
        <div className='flex items-center gap-[9px]'>
          <h6 className='text-[36px]/[46.8px] font-bold'>100</h6>
          <div className='flex items-center gap-1'>
            <DecreaseIcon color='pink' />
            <p className='text-[16px]/[24px] font-medium text-pinkMain'>5%</p>
          </div>
        </div>
      </div>

      <div className='size-[245.16px] rounded-full bg-ln-white border-solid border-[1.29px] border-white/[.22] shadow-s-2 absolute left-1/2 transform -translate-x-1/2 top-[150px]' />

      <div className='absolute left-0 bottom-0'>
        <img src={images.icon.unhappy_vistor} alt='unhappy-icon' />
      </div>
    </div>
  )
})

export default UnhappyVistorCard
