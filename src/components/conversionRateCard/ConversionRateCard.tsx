import classNames from 'classnames'

import { ArrowBottom } from '../icons'

type ConversionRateCardProps = {
  viewing?: boolean
  className?: string
  dotSize?: string
  data: string | number
  title: string
  percentage?: number
}

const ConversionRateCard = ({ viewing, dotSize, data, title, percentage, className }: ConversionRateCardProps) => {
  return (
    <div
      className={`relative flex w-fit items-center gap-6 ${className} transition-all duration-500 ease-in-out`}
      data-aos='fade-left'
    >
      <div
        className={classNames(
          dotSize ? dotSize : 'size-4',
          viewing && 'rotate-[360deg]',
          'rounded-full bg-rg-blue-green backdrop-blur-2xl transition-all duration-300 ease-in-out'
        )}
      />
      <div
        className={classNames(
          'shadow-6 flex h-[88px] w-[362px] items-center justify-between rounded-[9px] bg-ln-white-3 px-5 backdrop-blur-2xl'
        )}
      >
        <p className='font-customSemiBold text-[32px]/[18px]'>{data}</p>
        <p className='font-customMedium text-[20px]/[20px] text-[#8E8E93]'>{title}</p>
      </div>

      {percentage && (
        <div className='absolute right-0 top-[-50px] z-[999] flex items-center gap-3'>
          <ArrowBottom />
          <p className='bg-ln-red-purple bg-clip-text font-customSemiBold text-[56px] text-transparent'>
            {percentage}%
          </p>
        </div>
      )}
    </div>
  )
}

export default ConversionRateCard
