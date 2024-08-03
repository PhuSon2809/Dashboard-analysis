import classNames from 'classnames'
import { memo } from 'react'

const listDataSet = [
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'average', label: 'Average' }
]

const ReactionsEnjoyChart = memo(() => {
  return (
    <div className='size-[535px] bg-ln-white-6 rounded-[32px] shadow-s-11 relative'>
      <div className='w-[400px] h-[64px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute -top-[6px] -left-[6px]'>
        <p className='text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-red-green capitalize'>
          Reactions enjoy meal
        </p>
      </div>

      <div className='absolute top-20 left-1/2 transform -translate-x-1/2 text-white font-medium'>
        <div className='size-[378px] relative'>
          <div className='size-[268px] bg-ln-orange-2 rounded-full flex items-center justify-center ml-[70px]'>
            <p className='text-[34px]'>50%</p>
          </div>
          <div className='size-[147px] bg-ln-purple-red-2 rounded-full flex items-center justify-center absolute left-0 bottom-[74px]'>
            <p className='text-[24px]'>20%</p>
          </div>
          <div className='size-[203px] bg-ln-blue-2 rounded-full flex items-center justify-center absolute bottom-0 right-0'>
            <p className='text-[30px]'>30%</p>
          </div>
        </div>
      </div>

      <div className='px-14 w-full flex items-center justify-between absolute bottom-8'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-[6px]'>
            <div
              className={classNames(
                'size-[18px] rounded-md',
                data.value === 'satisfied'
                  ? 'bg-ln-orange-2'
                  : data.value === 'dissatisfied'
                    ? 'bg-ln-purple-red-2'
                    : 'bg-ln-blue-2'
              )}
            />
            <p className='text-[18px]/[18.9px]'>{data.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ReactionsEnjoyChart
