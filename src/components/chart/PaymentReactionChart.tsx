import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'
import { formatLocaleString } from '~/utils/format'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'average', label: 'Average' }
]

const PaymentReactionChart = memo(({ isSmall }: { isSmall?: boolean }) => {
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
        cutout: '80',
        size: 8
      })
    } else {
      setCustom({
        cutout: '130',
        size: 3.62
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
  const dataChart = useMemo(() => homeReportCurrent?.paymentReaction, [homeReportCurrent])

  const gradients = [
    { start: '#C15CFF', end: '#FF5454' },
    { start: '#0D0D0D', end: '#0D0D0D' },
    { start: '#7D2DFF', end: '#41DDFF' }
  ]

  const getGradientColor = useCallback(
    (ctx: any, index: number) => {
      const chart = ctx.chart
      const { ctx: canvasCtx, chartArea } = chart
      if (!chartArea) return gradients[index % gradients.length].start
      const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
      const { start, end } = gradients[index % gradients.length]
      gradient.addColorStop(0, start)
      gradient.addColorStop(1, end)
      return gradient
    },
    [gradients]
  )

  const datasetData = [dataChart?.percent?.['1'], dataChart?.percent?.['2'], dataChart?.percent?.['3']]
  // const datasetData = [25, 40, 35]
  const total = datasetData.reduce((acc, value) => acc + value, 0)

  return (
    <div
      className={classNames(
        isSmall
          ? 'payment-reaction-chart h-[150px] w-[300px] lg:size-[110px] rounded-[9.64px]'
          : 'w-[450px] h-[500px] lg:size-[520px] rounded-[32px]',
        'payment-reaction-chart relative bg-ln-white-blue-2 shadow-s-14'
      )}
    >
      <div
        className={classNames(
          isSmall
            ? '-left-[7px] -top-[5px] h-[14px] w-[140px] p-3 lg:p-0 lg:w-[74px] rounded-br-[7.23px] rounded-tl-[7.23px]'
            : '-left-[7.11px] -top-[9.11px] h-[50px] w-[200px] rounded-br-[32px] rounded-tl-[32px]',
          'absolute flex items-center justify-center bg-white/[.44] shadow-s-7 backdrop-blur-[80px]'
        )}
      >
        <p
          className={`bg-ln-orange-purple bg-clip-text font-bold text-transparent ${classNames(isSmall ? 'text-[10px] lg:text-[6.63px]' : 'text-[18px]')}`}
        >
          Payment Reaction
        </p>
      </div>

      <div
        className={`absolute ${classNames(isSmall ? 'left-1/2 top-[15.64px]  size-[110px] lg:size-[80px] -translate-x-1/2 transform' : 'left-1/2 top-[40px] size-[420px] -translate-x-1/2 transform')}`}
      >
        <div className='h-full w-full'>
          <Doughnut
            className='relative z-50'
            ref={chartTotalOrderRef}
            options={{
              cutout: isSmall ? 25 : 100,
              plugins: {
                datalabels: {
                  font: { size: isSmall ? custom.size : 18 },
                  anchor: 'center',
                  align: 'center',
                  formatter: (value) => (value > 0 ? `${formatLocaleString(value)}%` : ''),
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
                      const percentage = (currentValue / total) * 100
                      return `${percentage}%`
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
                  borderRadius: 2,
                  borderWidth: 0
                }
              ]
            }}
          />

          <div
            className={classNames(
              'absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-[1px] border-dotted border-[#A6A6A6]',
              isSmall ? 'size-[90.72px]' : 'size-[190px]'
            )}
          >
            <div
              className={classNames(
                'flex items-center justify-center rounded-full bg-[#F8F8F8]',
                isSmall ? 'lg:size-[100.4px] size-[110px]' : ''
              )}
            >
              <div
                className={classNames(
                  'flex flex-col items-center justify-center gap-1 rounded-full bg-white shadow-s-13',
                  isSmall ? 'lg:size-[40.99px] size-[80px]' : 'size-[150px]'
                )}
              >
                <h3
                  className={classNames(
                    isSmall
                      ? 'font-customSemiBold text-[11px] lg:text-[8.44px]/[8.86px] text-[#292D30]'
                      : 'text-[35px]/[30px] font-bold text-[#292D30]'
                  )}
                >
                  {formatLocaleString(2510)}
                </h3>
                <p
                  className={classNames(
                    isSmall
                      ? 'text-[10px] lg:text-[3.62px]/[3.8px] text-[#0D0D0D]'
                      : 'text-[19px]/[13px] text-[#0D0D0D]'
                  )}
                >
                  reaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          'absolute bottom-[6.63px] left-1/2 flex -translate-x-1/2 transform items-start justify-center',
          isSmall ? 'gap-[6.52px]' : 'gap-[20px]'
        )}
      >
        {listDataSet.map((data) => (
          <div key={data.value} className={classNames('flex items-center', isSmall ? 'gap-[2px]' : 'gap-[10px]')}>
            <div
              className={classNames(
                `${isSmall ? 'lg:h-[4.82px] lg:w-[1px] size-[10px] rounded-[1.05px]' : 'h-[20px] w-[5px] rounded-[2px]'}`,
                (() => {
                  if (data.value === 'satisfied') {
                    return 'bg-[#0D0D0D]'
                  } else if (data.value === 'dissatisfied') {
                    return 'bg-ln-orange'
                  } else {
                    return 'bg-ln-blue'
                  }
                })()
              )}
            />
            <p
              className={classNames(
                isSmall
                  ? 'font-customRegular text-[10px] lg:text-[4.82px]/[4.82px] capitalize'
                  : 'font-customRegular text-[18px]/[18px] capitalize'
              )}
            >
              {data.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default PaymentReactionChart
