import { ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useMemo } from 'react'
import { PolarArea } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(Tooltip, Legend, RadialLinearScale, ArcElement, ChartDataLabels)

const listDataSet = [
  { value: '1', label: '1' },
  { value: '2-4', label: '2-4' },
  { value: '5', label: '5' }
]

const PurchasesChart = memo(({ isSmall }: { isSmall?: boolean }) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const dataChart = useMemo(() => homeReportCurrent?.ORDERS?.['Purchases'], [homeReportCurrent])

  const datasetData = [dataChart?.['1'], dataChart?.['2'], dataChart?.['3']]

  const getGradient = (ctx, chartArea, index) => {
    const gradients = [
      {
        start: '#64FBD7',
        end: '#5383FF'
      },
      {
        start: '#FE7E07',
        end: '#FFDE67'
      },
      {
        start: '#FF5D5D',
        end: '#FFB648'
      }
    ]

    if (!chartArea) return gradients[index].start
    const { width, height } = chartArea
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, gradients[index].start)
    gradient.addColorStop(1, gradients[index].end)
    return gradient
  }

  return (
    <div
      className={classNames(
        'purchases-chart relative bg-ln-orange-3 shadow-s-11',
        isSmall ? 'h-[120px] w-[130px] rounded-[10px]' : 'size-[520px] rounded-[32px]'
      )}
    >
      <div
        className={classNames(
          'absolute flex items-center justify-center bg-white/[.44] shadow-s-7 backdrop-blur-[80px]',
          isSmall
            ? 'left-[-10px] top-[-10px] h-[20px] w-[80px] rounded-bl-[10px] rounded-tr-[10px]'
            : '-bottom-[30px] -left-[6px] h-[64px] w-[228px] rounded-bl-[34px] rounded-tr-[34px]'
        )}
      >
        <p
          className={classNames(
            'bg-ln-green-orange bg-clip-text font-customSemiBold capitalize text-transparent',
            isSmall ? 'text-[5px]' : 'text-[28px]'
          )}
        >
          Purchases
        </p>
      </div>

      <div
        className={classNames(
          'absolute left-1/2 w-full -translate-x-1/2 transform',
          isSmall ? 'top-3 h-[90px]' : 'top-10 h-[400px]'
        )}
      >
        <div className='h-full w-full'>
          <PolarArea
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  grid: { display: false },
                  ticks: { display: false }
                }
              },
              plugins: {
                datalabels: {
                  font: { size: isSmall ? 8 : 20 },
                  color: '#fff',
                  anchor: 'center',
                  align: 'center',
                  formatter: (value) => (value > 0 ? `${value}%` : '')
                },
                legend: { display: false },
                tooltip: {
                  displayColors: false,
                  callbacks: {
                    title: () => '',
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`
                  }
                }
              }
            }}
            data={{
              labels: ['1', '2-4', '5'],
              datasets: [
                {
                  data: datasetData,
                  backgroundColor: (context) => {
                    const chart = context.chart
                    const { ctx, chartArea } = chart
                    if (!chartArea) return null
                    return getGradient(ctx, chartArea, context.dataIndex)
                  },
                  hoverBackgroundColor: (context) => {
                    const chart = context.chart
                    const { ctx, chartArea } = chart
                    if (!chartArea) return null
                    return getGradient(ctx, chartArea, context.dataIndex)
                  },
                  borderWidth: 0,
                  borderRadius: 4
                }
              ]
            }}
          />
        </div>
      </div>

      <div
        className={classNames(
          'absolute flex w-full items-center justify-between',
          isSmall ? 'bottom-[10px]' : 'bottom-[60px] px-10'
        )}
      >
        {listDataSet.map((data, i) => (
          <div key={`${data.value}-${i}`} className='flex items-center gap-[6px]'>
            <div
              className={classNames(
                `${isSmall ? 'size-[5px]' : 'size-[18px] rounded-md'}`,
                data.value === '2-4' ? 'bg-ln-orange-2' : data.value === '5' ? 'bg-ln-orange' : 'bg-ln-blue-2'
              )}
            />
            <p className={classNames(isSmall ? 'text-nowrap text-[5px]/[5px]' : 'text-nowrap text-[18px]/[18.9px]')}>
              {data.label} Purchases
            </p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default PurchasesChart
