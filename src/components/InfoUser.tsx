import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { FaInstagram } from 'react-icons/fa6'
import ArrowListen from '~/assets/icons/ArrowListen'

interface Props {
  className?: string
  name: string
  des: string
  avatar: string
  role?: ReactNode
}
const InfoUser = (props: Props) => {
  const { className, name, des, role } = props
  return (
    <React.Fragment>
      <div className={classNames('flex w-full items-center', className)}>
        <div
          className={classNames(
            'shadow-s-20 relative flex aspect-[3] w-[80%] items-center gap-3 rounded-full bg-[#FFFFFF] p-2',
            'sm:w-full',
            'md:shadow-s-2'
          )}
        >
          {role}
          <div className='aspect-square h-full overflow-hidden rounded-full bg-slate-200'>
            <img src={''} className='h-full w-full object-cover' alt='' />
          </div>
          <div className='flex flex-1 flex-col'>
            <div className='text-[20px] font-bold text-[#0D0D0D]'>{name}</div>
            <div className='text-[14px] text-[##0D0D0D]'>{des}</div>
            <div className='mt-1 flex items-center gap-2'>
              <FaInstagram className='h-6 w-6 text-[#11B0F2]' />
              <span className='instagram-text'>Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default React.memo(InfoUser)
