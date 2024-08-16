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

const PaymentReactionChartMobile = memo(
  ({ isSmall, isLittleSmall }: { isSmall?: boolean; isLittleSmall?: boolean }) => {
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
          size: 5
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
            ? 'payment-reaction-chart  size-[80px] flex flex-col items-center justify-center rounded-[9.64px]'
            : isLittleSmall
              ? 'h-[170px] rounded-[15px] '
              : 'w-[470px] h-[520px] rounded-[32px]',
          'payment-reaction-chart relative bg-ln-white-blue-2 shadow-s-14'
        )}
      >
        {!isSmall && (
          <div
            className={classNames(
              ' flex items-center justify-center bg-white/[.44] shadow-s-7 backdrop-blur-[80px] translate-y-[-10%]',
              isLittleSmall
                ? 'h-[30px] w-[130px]   rounded-br-[15px] rounded-tl-[15px]'
                : 'h-[50px] w-[200px]   rounded-br-[32px] rounded-tl-[32px]'
            )}
          >
            <p
              className={`bg-ln-orange-purple bg-clip-text font-bold text-transparent ${classNames('', isLittleSmall ? 'text-[10px]' : 'text-[18px]')}`}
            >
              Payment Reaction
            </p>
          </div>
        )}
        <div
          className={` ${classNames(isSmall ? 'size-[70px]' : isLittleSmall ? 'size-[100px] absolute left-1/2 -translate-x-1/2' : ' absolute left-1/2 top-[40px] size-[420px] -translate-x-1/2 transform')}`}
        >
          <div className='h-full w-full'>
            <Doughnut
              className='relative z-50'
              ref={chartTotalOrderRef}
              options={{
                cutout: isSmall ? 25 : isLittleSmall ? 30 : 100,
                plugins: {
                  datalabels: {
                    font: { size: isSmall ? custom.size : isLittleSmall ? 10 : 30 },
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
                    borderRadius: 0,
                    borderWidth: 0
                  }
                ]
              }}
            />

            <div
              className={classNames(
                'absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-[1px] border-dotted border-[#A6A6A6]',
                isSmall ? 'size-[50px]' : isLittleSmall ? 'size-[60px]' : 'size-[190px]'
              )}
            >
              <div
                className={classNames(
                  'flex items-center justify-center rounded-full bg-[#F8F8F8]',
                  isSmall ? 'size-[50.4px]' : isLittleSmall ? 'size-[70px]' : 'size-[150px]'
                )}
              >
                <div
                  className={classNames(
                    'flex flex-col items-center justify-center gap-1 rounded-full bg-white shadow-s-13',
                    isSmall ? 'size-[40.99px] ' : isLittleSmall ? 'size-[50px]' : 'size-[150px]'
                  )}
                >
                  <h3
                    className={classNames(
                      isSmall
                        ? 'font-customSemiBold text-[8.44px]/[8.86px] text-[#292D30]'
                        : isLittleSmall
                          ? 'text-[16px]'
                          : 'text-[35px]/[30px] font-bold text-[#292D30]'
                    )}
                  >
                    {formatLocaleString(2510)}
                  </h3>
                  <p
                    className={classNames(
                      isSmall
                        ? 'text-[10px] lg:text-[3.62px]/[3.8px] text-[#0D0D0D]'
                        : isLittleSmall
                          ? 'text-[10px]'
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

        {!isSmall && (
          <div
            className={classNames(
              'absolute justify-center flex  w-full',
              isLittleSmall ? 'gap-[5px] flex-wrap bottom-0  items-start ' : 'gap-[20px] bottom-6 items-center'
            )}
          >
            {listDataSet.map((data) => (
              <div
                key={data.value}
                className={classNames('flex items-center ', isLittleSmall ? 'gap-2' : 'gap-[10px]')}
              >
                <div
                  className={classNames(
                    ` rounded-[2px]`,
                    isLittleSmall ? 'size-[5px] rounded-sm' : 'h-[20px] w-[5px] rounded-md',
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
                    'font-customRegular capitalize',
                    isLittleSmall ? 'text-[10px] ' : ' text-[18px]/[18px] '
                  )}
                >
                  {data.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

export default PaymentReactionChartMobile
