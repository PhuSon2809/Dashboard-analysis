import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: 'attentive', label: 'Attentive' },
  { value: 'disinterested', label: 'Disinterested' },
  { value: 'moderately-attentive', label: 'Moderately Attentive' },
  { value: 'High-attentive', label: 'High-attentive' }
]

const ReactionViewChartMobile = memo(() => {
  const chartTotalOrderRef = useRef<ChartJS<'doughnut'>>(null)
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
        size: 15
      })
    } else {
      setCustom({
        cutout: '130',
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
  const gradients = [
    { start: '#5383FF', end: '#64FBD7' },
    { start: '#FF6B00', end: '#FABF26' },
    { start: '#D1E4F2', end: '#DEECF6' },
    { start: '#F2F2F2', end: '#F2F2F2' }
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

  const viewChartData = useMemo(() => homeReportCurrent?.reactionViewerChart, [homeReportCurrent])
  const datasetData = useMemo(
    () => [
      viewChartData?.attentive,
      viewChartData?.disinterested,
      viewChartData?.moderatelyAttentive,
      viewChartData?.highAttentive
    ],
    [viewChartData]
  )
  const maxDataValue = useMemo(() => Math.max(...datasetData), [datasetData])
  return (
    <div className='relative h-[370px] w-full rounded-[20px] bg-ln-white-blue'>
      <div className='absolute right-[-10px] h-[40px]  flex items-center justify-center w-[200px] rounded-bl-[34px] rounded-tr-[34px] bg-white/[.44] shadow-s-7 backdrop-blur-[80px]'>
        <p className='bg-ln-blue-purple bg-clip-text font-customSemiBold lg:text-[28px] text-transparent'>
          Reaction viewers
        </p>
      </div>

      <div className='relative top-[12%] left-[10%] size-[200px] xs-min:size-[350px] lg:size-[400px]'>
        <Doughnut
          className=' z-50'
          ref={chartTotalOrderRef}
          options={{
            cutout: custom.cutout,
            plugins: {
              datalabels: {
                font: { size: 12 },
                anchor: 'center',
                align: 'center',
                formatter: (value) => (value > 0 ? (value > 5 ? `${value}%` : value) : ''),
                color: (context) => ['#0D0D0D', '#FFF', '#0D0D0D', '#0D0D0D'][context.dataIndex] || '#FFF'
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
                borderRadius: 0,
                borderWidth: 0,
                spacing: 3
              }
            ]
          }}
        />

        <div className='absolute left-1/2 top-1/2 z-10 flex size-[100px] lg:size-[256.2px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6]'>
          {/* viền */}
          <div className='flex size-[90px] items-center justify-center rounded-full bg-[#F8F8F8]'>
            <div className='flex size-[90px] flex-col items-center justify-center gap-1 rounded-full bg-white shadow-s-8'>
              <h3 className='text-[20px]/[25px] font-medium text-[#292D30]'>{maxDataValue}%</h3>
              <p className='text-[10px]/[15px] text-[#474B4E]'>Disinterested</p>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-5 right-5 mt-3 flex flex-col lg:items-start items-end justify-center gap-6'>
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center lg:flex-row flex-row-reverse  gap-[6px]'>
            <div
              className={classNames(
                'size-3 rounded-[1px]',
                data.value === 'disinterested'
                  ? 'bg-ln-orange'
                  : data.value === 'attentive'
                    ? 'bg-ln-blue'
                    : data.value === 'moderately-attentive'
                      ? 'bg-ln-grey'
                      : 'bg-[#F2F2F2]'
              )}
            />
            <p className='font-customRegular text-[10px]'>{data.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ReactionViewChartMobile
