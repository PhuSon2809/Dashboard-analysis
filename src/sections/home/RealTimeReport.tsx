import { memo } from 'react'
import TimelineChart from '~/components/timeline/timelineChart'
import getRandomColor from '~/utils/randomColor'

const dataMock = [
  {
    id: 1,
    title: 'Reach',
    start: '2022-09-01T08:30:00.000Z',
    end: '2022-09-01T12:00:00.000Z',
    bgColor: `linear-gradient(to right, ${getRandomColor()}, ${getRandomColor()})`,
    count: '45 persons',
    tooltipContent:
      'The initial phase of customer interaction where potential customers become aware of the store and its offerings and decide to go inside.'
  },
  {
    id: 2,
    title: 'Engagement',
    start: '2022-09-01T09:30:00.000Z',
    end: '2022-09-01T12:00:00.000Z',
    bgColor: `linear-gradient(to right, ${getRandomColor()}, ${getRandomColor()})`,
    count: '40 persons',
    tooltipContent:
      'The initial phase of customer interaction where potential customers become aware of the store and its offerings and decide to go inside.'
  },
  {
    id: 3,
    title: 'Order',
    start: '2022-09-01T10:30:00.000Z',
    end: '2022-09-01T12:00:00.000Z',
    bgColor: `linear-gradient(to right, ${getRandomColor()}, ${getRandomColor()})`,
    count: '10 persons',
    tooltipContent:
      'The initial phase of customer interaction where potential customers become aware of the store and its offerings and decide to go inside.'
  },
  {
    id: 4,
    title: 'Payment',
    start: '2022-09-01T11:30:00.000Z',
    end: '2022-09-01T23:00:00.000Z',
    bgColor: `linear-gradient(to right, ${getRandomColor()}, ${getRandomColor()})`,
    count: '2 persons',
    tooltipContent:
      'The initial phase of customer interaction where potential customers become aware of the store and its offerings and decide to go inside.'
  }
]

const RealTimeReport = memo(() => {
  return (
    <div className='mt-[120px]'>
      <div className='text-center space-y-4 relative z-20'>
        <h2 className='text-[54px]/[70.2px] font-bold'>Real - Time Report</h2>
        <p className='text-[16px]/[24px] font-normal text-grey999/[.64]'>
          We offer up-to-the-minute account of current events or data, provided <br /> immediately as the situation
          unfolds.
        </p>
      </div>

      <div className='w-[1216px] h-[542px] bg-grey100 rounded-3xl shadow-s-3 mx-auto mt-[60px]'>
        <TimelineChart data={dataMock} />
      </div>
    </div>
  )
})

export default RealTimeReport
