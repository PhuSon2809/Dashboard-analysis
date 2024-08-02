import classNames from 'classnames'
import { memo } from 'react'
import { ArrowBottom } from '../icons'

type ConversionRateCardProps = {
  viewing?: boolean
  className?: string
  dotSize?: string
  data: string | number
  title: string
  percentage?: number
}

const ConversionRateCard = memo(({ viewing, dotSize, data, title, percentage, className }: ConversionRateCardProps) => {
  return (
    <div className={`w-fit flex items-center gap-6 relative ${className} transition-all duration-500 ease-in-out`}>
      <div
        className={classNames(
          dotSize ? dotSize : 'size-4',
          viewing && 'rotate-[360deg]',
          'rounded-full bg-rg-blue-green backdrop-blur-2xl transition-all duration-300 ease-in-out'
        )}
      />
      <div
        className={classNames(
          'w-[362px] h-[88px] px-5 bg-ln-white-3 backdrop-blur-2xl rounded-[9px] shadow-6 flex items-center justify-between'
        )}
      >
        <p className='text-[32px]/[18px] font-customSemiBold'>{data}</p>
        <p className='text-[20px]/[20px] font-customMedium text-[#8E8E93]'>{title}</p>
      </div>

      {percentage && (
        <div className='flex items-center gap-3 absolute right-0 -top-[66px]'>
          <ArrowBottom />
          <p className='text-[56px] font-customSemiBold text-transparent bg-clip-text bg-ln-red-purple'>
            {percentage}%
          </p>
        </div>
      )}
    </div>
  )
})

export default ConversionRateCard
