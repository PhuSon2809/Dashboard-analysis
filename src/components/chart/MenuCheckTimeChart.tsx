import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback, useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: '>5', label: '> 5' },
  { value: '<5', label: '< 5' }
]

const MenuCheckTimeChart = memo(() => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)
  const [custom, setCustom] = useState({
    cutout: '50%',
    size: 20
  })
  const handleResize = () => {
    const width = window.innerWidth
    if (width < 480) {
      setCustom({
        cutout: '50',
        size: 13
      })
    } else if (width < 1024) {
      setCustom({
        cutout: '100',
        size: 15
      })
    } else {
      setCustom({
        cutout: '155',
        size: 20
      })
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize() // Call once to set initial value
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const datasetData = [
    homeReportCurrent?.ENGAGEMENT?.['Menu Check Time']?.['1'],
    homeReportCurrent?.ENGAGEMENT?.['Menu Check Time']?.['2']
  ]

  const gradients = [
    { start: '#37CFFF', end: '#0D57C6', last: '#0F5ED6' },
    { start: '#FABF26', end: '#FF6B00' }
  ]

  const getGradientColor = useCallback(
    (ctx: any, index: number) => {
      const chart = ctx.chart
      const { ctx: canvasCtx, chartArea } = chart
      if (!chartArea) return gradients[index % gradients.length].start
      const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, 0, chartArea.bottom)
      const { start, end, last } = gradients[index % gradients.length]
      gradient.addColorStop(0, start)
      gradient.addColorStop(last ? 0.5 : 1, end)
      if (last) gradient.addColorStop(1, last)
      return gradient
    },
    [gradients]
  )

  return (
    <div className='relative mt-20 h-[400px] min-w-[300px] rounded-[20px] rounded-tr-[50px] bg-ln-white-yellow sm:mt-[7rem] lg:mt-0 lg:min-h-[666px] lg:min-w-[666px] lg:rounded-[32px] lg:rounded-tr-[80px] lg:shadow-s-10'>
      <div
        className={`absolute -left-2 -top-2 flex h-[40px] w-[200px] items-center justify-center rounded-br-[34px] rounded-tl-[34px] bg-white/[.44] shadow-s-7 backdrop-blur-[80px] lg:h-[68px] lg:w-[300px]`}
      >
        <p className='bg-ln-purple-orange bg-clip-text font-customSemiBold capitalize text-transparent lg:text-[28px]'>
          Menu check time
        </p>
      </div>

      <div className='absolute left-1/2 top-10 size-[300px] -translate-x-1/2 transform rounded-full bg-white p-[10px] shadow-s-15 lg:top-[85px] lg:size-[480px]'>
        <Doughnut
          className='relative left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform'
          options={{
            cutout: custom.cutout,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
              datalabels: {
                font: { size: custom.size },
                anchor: 'center',
                align: 'center',
                formatter: (value) => (value > 0 ? `${value}%` : ''),
                color: (context) => ['#FFF', '#FFF'][context.dataIndex] || '#FFF'
              }
            }
          }}
          data={{
            labels: [],
            datasets: [
              {
                data: datasetData,
                backgroundColor: (ctx: any) =>
                  ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                hoverBackgroundColor: (ctx: any) =>
                  ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                borderWidth: 0
              }
            ]
          }}
        />

        <div className='absolute left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6] lg:top-1/2 lg:size-[303px]' />
      </div>

      <div className='absolute bottom-2 left-1/2 flex w-full -translate-x-1/2 transform items-start justify-center gap-4 lg:bottom-8 lg:gap-8'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-2'>
            <div
              className={classNames(
                'size-[10px] rounded-[4px] lg:size-[16px]',
                data.value === '>5' ? 'bg-ln-blue-3' : 'bg-ln-orange'
              )}
            />
            <p className='font-customRegular capitalize lg:text-[18px]/[20px]'>{data.label} minutes</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default MenuCheckTimeChart
