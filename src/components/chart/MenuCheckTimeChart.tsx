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
    <div className='lg:min-w-[666px] mt-20 sm:mt-[7rem] lg:mt-0 min-w-[300px] h-[400px] lg:min-h-[666px] bg-ln-white-yellow lg:rounded-[32px] rounded-[20px] rounded-tr-[50px] lg:rounded-tr-[80px] lg:shadow-s-10 relative'>
      <div
        className={`lg:w-[300px] w-[200px] lg:h-[68px] h-[40px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute -top-2 -left-2`}
      >
        <p className='lg:text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-purple-orange capitalize'>
          Menu check time
        </p>
      </div>

      <div className='lg:size-[480px] size-[300px] p-[10px] absolute top-10 lg:top-[85px] left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-s-15'>
        <Doughnut
          className='relative z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
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

        <div className='lg:size-[303px] flex items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6] absolute left-1/2 lg:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10' />
      </div>

      <div className='flex w-full items-start justify-center lg:gap-8 gap-4 absolute lg:bottom-8 bottom-2 left-1/2 transform -translate-x-1/2'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-2'>
            <div
              className={classNames(
                'lg:size-[16px] size-[10px] rounded-[4px]',
                data.value === '>5' ? 'bg-ln-blue-3' : 'bg-ln-orange'
              )}
            />
            <p className='lg:text-[18px]/[20px] font-customRegular capitalize'>{data.label} minutes</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default MenuCheckTimeChart
