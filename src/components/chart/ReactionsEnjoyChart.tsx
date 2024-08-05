import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useCallback, useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const listDataSet = [
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' }
]

const ReactionsEnjoyChart = memo(({ isSmall }: { isSmall?: boolean }) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const dataChart = useMemo(() => homeReportCurrent?.ORDERS?.['Reaction Enjoy Meal'], [homeReportCurrent])

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
      className={`enjoy-chart relative bg-ln-pink shadow-s-10 ${classNames(
        isSmall ? 'h-[110px] w-[110px]  round-[20px] ' : 'min-h-[535px] min-w-[535px] rounded-[32px] rounded-tr-[80px]'
      )}`}
    >
      <div
        className={classNames(
          'absolute -left-[6px] -top-[6px] flex items-center justify-center rounded-br-[34px] rounded-tl-[34px] bg-white/[.44] shadow-s-7 backdrop-blur-[80px]',
          isSmall ? 'p-1' : 'h-[64px] w-[400px]'
        )}
      >
        <p
          className={classNames(
            'bg-ln-red-green bg-clip-text font-customSemiBold capitalize text-transparent',
            isSmall ? 'text-[4px]' : 'text-[28px]'
          )}
        >
          Reactions enjoy meal
        </p>
      </div>

      <div
        className={`absolute ${classNames(isSmall ? 'left-1/2 top-[6px] size-[90px] -translate-x-1/2 transform rounded-full bg-white p-[1px] shadow-s-15' : 'left-1/2 top-[80px] size-[380px] -translate-x-1/2 transform rounded-full bg-white p-[10px] shadow-s-15')}`}
      >
        <div className='relative h-full w-full rounded-full bg-white'>
          <Doughnut
            className='relative z-50'
            options={{
              cutout: isSmall ? 25 : 115,
              plugins: {
                legend: { display: false },
                datalabels: {
                  font: { size: isSmall ? 8 : 20 },
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
                  borderRadius: 5
                }
              ]
            }}
          />
        </div>
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border-[2.5px] border-dotted border-[#A6A6A6]',
            isSmall ? 'size-[90px]' : 'size-[220px]'
          )}
        >
          <div
            className={classNames(
              'flex items-center justify-center rounded-full bg-[#F8F8F8]',
              isSmall ? 'size-[50px]' : 'size-[200px]'
            )}
          >
            <div
              className={classNames(
                'flex flex-col items-center justify-center gap-1 rounded-full bg-white shadow-s-9',
                isSmall ? 'size-[50px]' : 'size-[180px]'
              )}
            >
              <p className={classNames('font-customSemiBold text-[#292D30]', isSmall ? ' ' : 'text-[60px]')}>
                {dataChart?.['1']}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          'absolute flex w-full items-center justify-center',
          isSmall ? 'bottom-0 gap-5' : 'bottom-7 gap-20 px-14'
        )}
      >
        {listDataSet.map((data) => (
          <div key={data.value} className='flex items-center gap-[6px]'>
            <div
              className={classNames(
                `${isSmall ? 'size-[11px] rounded-sm' : 'size-[18px] rounded-md'}`,
                data.value === 'satisfied'
                  ? 'bg-ln-orange-2'
                  : data.value === 'dissatisfied'
                    ? 'bg-ln-purple-red-2'
                    : 'bg-ln-blue-2'
              )}
            />
            <p className={classNames(isSmall ? 'text-[5px]/[5px]' : 'text-[18px]/[18.9px]')}>{data.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ReactionsEnjoyChart
