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
    if (width < 1024) {
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
    <div className='lg:min-w-[666px] mt-20 xs-min:mt-[7rem] lg:mt-0 lg:min-h-[666px] min-w-[300px] min-h-[400px] sm:min-h-[500px] bg-ln-blue-pink-2 rounded-[32px] rounded-tr-[80px] shadow-s-10 relative'>
      <div className='lg:w-[267px] w-[200px] lg:h-[68px] h-[40px] bg-white/[.44] backdrop-blur-[80px] flex items-center justify-center rounded-tl-[34px] rounded-br-[34px] shadow-s-7 absolute -top-2 -left-2'>
        <p className='lg:text-[28px] font-customSemiBold text-transparent bg-clip-text bg-ln-blue-purple'>
          Reaction’s Menu
        </p>
      </div>

      <div className='lg:size-[480px] w-full h-[200px] absolute top-[70px] left-1/2 transform -translate-x-1/2'>
        <Doughnut
          className='relative z-50 left-1/2 lg:-translate-x-0 -translate-x-1/2 sm:left-[50%] lg:left-0 lg:top-0 top-[50%] -translate-y-1/2 lg:-translate-y-0 size-[290px!important] lg:size-[100%!important] '
          options={{
            cutout: custom.cutout,
            plugins: {
              datalabels: {
                font: { size: custom.size },
                anchor: 'center',
                align: 'center',
                formatter: (value) => (value > 0 ? `${value}%` : ''),
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

        <div className=' lg:size-[306px] flex items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
          <div className='lg:size-[292px] flex items-center justify-center bg-[#F8F8F8] rounded-full'>
            <div className='size-[190px] lg:size-[248px] flex flex-col items-center justify-center gap-1 bg-white rounded-full shadow-s-9'>
              <h3 className='lg:text-[48px]/[50.4px] text-[40px] font-customSemiBold text-[#292D30]'>
                {formatLocaleString(2510)}
              </h3>
              <p className='lg:text-[19px]/[28px] text-[16px] text-[#0D0D0D]'>Customer’s reaction</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-start justify-center gap-2 absolute bottom-8 left-1/2 transform -translate-x-1/2'>
        {listDataSet.map((data, index) => (
          <div
            key={data.value}
            className='sm:w-[195px] w-[90px] h-10 lg:h-12 px-1 lg:px-3 flex items-center justify-between rounded-md lg:rounded-lg bg-white/[.44] shadow-s-10'
          >
            <div className='flex items-center gap-1 lg:gap-2'>
              <div
                className={classNames(
                  'sm:w-[6px] w-[4px] sm:h-7 h-3 rounded-[6.33px]',
                  data.value === 'satisfied'
                    ? 'bg-ln-purple'
                    : data.value === 'dissatisfied'
                      ? 'bg-ln-orange'
                      : 'bg-ln-blue'
                )}
              />
              <p className='sm:text-[18px]/[20px] text-[10px] font-customRegular capitalize'>{data.label}</p>
            </div>

            <div className='sm:w-[50px] w-[18px] flex-shrink-0 h-6 sm:text-[18px] text-[10px] font-customSemiBold bg-[#E5E5EA] rounded-sm flex items-center justify-center'>
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
