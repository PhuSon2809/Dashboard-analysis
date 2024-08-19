import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'
import { formatLocaleString } from '~/utils/format'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'average', label: 'Average' }
]

const ReactionMenuChart = memo(() => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)
  const [custom, setCustom] = useState({
    cutout: '50%',
    size: 20
  })
  const gradients = [
    { start: '#5383FF', end: '#64FBD7' },
    { start: '#CB5DFF', end: '#1D41BE' },
    { start: '#FF6B00', end: '#FABF26' }
  ]

  const getGradientColor = useCallback(
    (ctx: any, index: number) => {
      const chart = ctx.chart
      const { ctx: canvasCtx, chartArea } = chart
      if (!chartArea) return gradients[index % gradients.length].start
      const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, chartArea.right, chartArea.bottom)
      const { start, end } = gradients[index % gradients.length]
      gradient.addColorStop(0, start)
      gradient.addColorStop(1, end)
      return gradient
    },
    [gradients]
  )
  const handleResize = () => {
    const width = window.innerWidth

    if (width < 480) {
      setCustom({
        cutout: '70',
        size: 10
      })
    } else if (width < 1024) {
      setCustom({
        cutout: '70',
        size: 15
      })
    } else {
      setCustom({
        cutout: '158',
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
  const numberData = useMemo(() => homeReportCurrent?.["Reaction's Menu"]?.['1'], [homeReportCurrent])

  const datasetData = [
    homeReportCurrent?.["Reaction's Menu"]?.['2']?.['1'],
    homeReportCurrent?.["Reaction's Menu"]?.['2']?.['2'],
    homeReportCurrent?.["Reaction's Menu"]?.['2']?.['3']
  ]

  return (
    <div className='relative mt-20 min-h-[400px] min-w-[300px] rounded-[32px] rounded-tr-[80px] bg-ln-blue-pink-2 shadow-s-10 xs-min:mt-[7rem] sm:min-h-[500px] lg:mt-0 lg:min-h-[666px] lg:min-w-[666px]'>
      <div className='absolute -left-2 -top-2 flex h-[40px] w-[150px] items-center justify-center rounded-br-[34px] rounded-tl-[34px] bg-white/[.44] shadow-s-7 backdrop-blur-[80px] lg:h-[68px] lg:w-[267px]'>
        <p className='bg-ln-blue-purple bg-clip-text font-customSemiBold text-transparent lg:text-[28px]'>
          Reaction’s Menu
        </p>
      </div>

      <div className='absolute left-1/2 top-[75px] h-[200px] w-full -translate-x-1/2 transform lg:size-[480px]'>
        <Doughnut
          className='relative left-1/2 top-[50%] z-50 size-[290px!important] -translate-x-1/2 -translate-y-1/2 sm:left-[50%] lg:left-0 lg:top-0 lg:size-[100%!important] lg:-translate-x-0 lg:-translate-y-0'
          options={{
            cutout: custom.cutout,
            plugins: {
              datalabels: {
                font: { size: custom.size },
                anchor: 'center',
                align: 'center',
                formatter: (value) => (value > 0 ? (value > 1 ? `${value}%` : value) : ''),
                color: (context) => ['#0D0D0D', '#FFF', '#FFF'][context.dataIndex] || '#FFF'
              },
              legend: { display: false },
              tooltip: {
                position: 'nearest',
                displayColors: false,
                backgroundColor: 'rgba(14, 14, 14, 0.6)',
                padding: 10,
                callbacks: {
                  title: function () {
                    return ''
                  },
                  label: function (tooltipItem: TooltipItem<'doughnut'>) {
                    const dataset = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex]
                    const currentValue = dataset.data[tooltipItem.dataIndex] as number
                    return `${currentValue}%`
                  }
                }
              }
            }
          }}
          data={{
            labels: ['5.0', '4.0', '3.0', '2.0', '1.0'],
            datasets: [
              {
                data: datasetData,
                backgroundColor: (ctx: any) =>
                  ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                hoverBackgroundColor: (ctx: any) =>
                  ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                borderRadius: 6,
                borderWidth: 0
              }
            ]
          }}
        />

        <div className='absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6] lg:size-[306px]'>
          <div className='flex items-center justify-center rounded-full bg-[#F8F8F8] lg:size-[292px]'>
            <div className='flex size-[190px] flex-col items-center justify-center gap-1 rounded-full bg-white shadow-s-9 lg:size-[248px]'>
              <h3 className='font-customSemiBold text-[40px] text-[#292D30] lg:text-[48px]/[50.4px]'>
                {formatLocaleString(2510)}
              </h3>
              <p className='text-[16px] text-[#0D0D0D] lg:text-[19px]/[28px]'>Customer’s reaction</p>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 transform items-start justify-center gap-2'>
        {listDataSet.map((data, index) => (
          <div
            key={data.value}
            className='flex h-10 w-[90px] items-center justify-between rounded-md bg-white/[.44] px-1 shadow-s-10 sm:w-[195px] lg:h-12 lg:rounded-lg lg:px-3'
          >
            <div className='flex items-center gap-1 lg:gap-2'>
              <div
                className={classNames(
                  'h-3 w-[4px] rounded-[6.33px] sm:h-7 sm:w-[6px]',
                  data.value === 'satisfied'
                    ? 'bg-ln-purple'
                    : data.value === 'dissatisfied'
                      ? 'bg-ln-orange'
                      : 'bg-ln-blue'
                )}
              />
              <p className='font-customRegular text-[10px] capitalize sm:text-[18px]/[20px]'>{data.label}</p>
            </div>

            <div className='flex h-6 w-[18px] flex-shrink-0 items-center justify-center rounded-sm bg-[#E5E5EA] font-customSemiBold text-[10px] sm:w-[50px] sm:text-[18px]'>
              {formatLocaleString(
                index === 0 ? numberData?.['1'] : index === 2 ? numberData?.['2'] : numberData?.['3']
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ReactionMenuChart
