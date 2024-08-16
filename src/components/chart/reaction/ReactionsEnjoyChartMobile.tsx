import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' }
]

const ReactionsEnjoyChartMobile = memo(({ isSmall, isLittleSmall }: { isSmall?: boolean; isLittleSmall?: boolean }) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const dataChart = useMemo(() => homeReportCurrent?.ORDERS?.['Reaction Enjoy Meal'], [homeReportCurrent])
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
        size: 4.5
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
  const datasetData = [dataChart?.['1'], dataChart?.['2']]

  const gradients = [
    { start: '#FE7E07', end: '#FFDE67' },
    { start: '#C15CFF', end: '#FF5454' }
  ]

  const getGradientColor = useCallback(
    (ctx: any, index: number) => {
      const chart = ctx.chart
      const { ctx: canvasCtx, chartArea } = chart
      if (!chartArea) return gradients[index % gradients.length].start
      const gradient = canvasCtx.createLinearGradient(chartArea.left, 0, 0, chartArea.bottom)
      const { start, end } = gradients[index % gradients.length]
      gradient.addColorStop(0, start)
      gradient.addColorStop(1, end)
      return gradient
    },
    [gradients]
  )

  return (
    <div
      className={`enjoy-chart relative bg-ln-pink shadow-s-10 flex flex-col items-center  p-2   ${classNames(
        isSmall
          ? 'w-[80px] h-full rounded-[10px] '
          : isLittleSmall
            ? 'h-[170px] rounded-[15px]'
            : 'w-[470px] h-[520px] rounded-[32px] rounded-tr-[80px] gap-5'
      )}`}
    >
      {!isSmall && (
        <div
          className={classNames(
            'flex items-center justify-center  bg-white/[.44] shadow-s-7 backdrop-blur-[80px] translate-x-[-10%] translate-y-[-30%]  rounded-br-[32px] rounded-tl-[32px]',
            isLittleSmall ? 'h-[30px] w-[130px]' : 'h-[64px] w-[400px] '
          )}
        >
          <p
            className={classNames(
              'bg-ln-red-green bg-clip-text font-customSemiBold capitalize text-transparent p-1',
              isLittleSmall ? 'text-[10px]' : 'text-[28px]'
            )}
          >
            Reactions enjoy meal
          </p>
        </div>
      )}

      <div
        className={` transform rounded-full bg-white  shadow-s-15 ${classNames(isSmall ? ' size-[60px] shadow-s-15' : isLittleSmall ? 'size-[100px]' : ' size-[380px]  p-[10px]')}`}
      >
        <div className='relative h-full w-full rounded-full bg-white'>
          <Doughnut
            className='relative z-50'
            options={{
              cutout: isSmall ? 25 : isLittleSmall ? 35 : 115,
              plugins: {
                legend: { display: false },
                datalabels: {
                  font: { size: isSmall ? custom.size : isLittleSmall ? 10 : 20 },
                  color: '#FFF',
                  align: 'center',
                  anchor: 'center',
                  formatter: (value) => (value > 0 ? `${value}%` : '')
                },
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
              labels: [],
              datasets: [
                {
                  data: datasetData,
                  backgroundColor: (ctx: any) =>
                    ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                  hoverBackgroundColor: (ctx: any) =>
                    ctx.chart.data.datasets[0].data.map((_: any, index: number) => getGradientColor(ctx, index)),
                  borderWidth: 0,
                  borderRadius: 0
                }
              ]
            }}
          />
        </div>
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6]',
            isSmall ? 'size-[50px]' : isLittleSmall ? 'size-[70px]' : 'size-[220px]'
          )}
        >
          <div
            className={classNames(
              'flex items-center justify-center rounded-full bg-[#F8F8F8]',
              isSmall ? 'size-[40px]' : isLittleSmall ? 'size-[60px]' : 'size-[180px]'
            )} // đường viền tròn
          >
            <div
              className={classNames(
                'flex flex-col items-center justify-center gap-1 rounded-full bg-white shadow-s-9',
                isSmall ? 'size-[40px]' : isLittleSmall ? 'size-[50px]' : 'size-[180px]'
              )}
            >
              <p
                className={classNames(
                  'font-customSemiBold text-[#292D30]',
                  isSmall ? 'text-[13px] ' : isLittleSmall ? 'text-[20px]' : 'text-[60px]'
                )}
              >
                {dataChart?.['1']}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {!isSmall && (
        <div className={classNames(' flex w-full items-center justify-center gap-5')}>
          {listDataSet.map((data) => (
            <div key={data.value} className='flex items-center gap-[6px]'>
              <div
                className={classNames(
                  `${isSmall ? 'size-[5px] rounded-sm' : isLittleSmall ? 'size-[10px]' : 'size-[18px] rounded-md'}`,
                  data.value === 'satisfied'
                    ? 'bg-ln-orange-2'
                    : data.value === 'dissatisfied'
                      ? 'bg-ln-purple-red-2'
                      : 'bg-ln-blue-2'
                )}
              />

              <p
                className={classNames(
                  isSmall ? 'text-[10px] lg:text-[5px]/[5px]' : isLittleSmall ? 'text-[10px]' : 'text-[18px]/[18.9px]'
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
})

export default ReactionsEnjoyChartMobile
