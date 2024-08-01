import classNames from 'classnames'
import { memo } from 'react'

const listDataSet = [
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'average', label: 'Average' }
]

const ReactionsEnjoyChart = memo(() => {
  return (
    <div className='size-[365px] bg-ln-white-6 backdrop-blur-2xl rounded-[32px] shadow-s-11 relative'>
      <div className='w-[273px] h-11 bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute -top-1 -left-1'>
        <p className='text-[22px] font-customSemiBold text-transparent bg-clip-text bg-ln-red-green capitalize'>
          Reactions enjoy meal
        </p>
      </div>

      <div className='absolute top-[53px] left-[52px]'>
        <div className='w-[257px] h-[253px] relative'>
          <div className='size-[182px] bg-ln-orange-2 rounded-full flex items-center justify-center ml-[47px]'>
            <p className='text-[28px]/[29.4px] font-customMedium text-white'>50%</p>
          </div>
          <div className='size-[100px] bg-ln-purple-red-2 rounded-full flex items-center justify-center absolute left-0 bottom-[50px]'>
            <p className='text-[18px]/[18.9px] font-customMedium text-white'>20%</p>
          </div>
          <div className='size-[138px] bg-ln-blue-2 rounded-full flex items-center justify-center absolute bottom-0 right-0'>
            <p className='text-[24px]/[25.4px] font-customMedium text-white'>30%</p>
          </div>
        </div>
      </div>

      <div className='w-full flex items-start justify-center gap-6 absolute bottom-6'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-[6px]'>
            <div
              className={classNames(
                'size-3 rounded-full',
                data.value === 'satisfied'
                  ? 'bg-ln-orange-2'
                  : data.value === 'dissatisfied'
                    ? 'bg-ln-purple-red-2'
                    : 'bg-ln-blue-2'
              )}
            />
            <p className='font-customRegular'>{data.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ReactionsEnjoyChart
