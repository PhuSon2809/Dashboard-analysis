import { ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import * as React from 'react'
import { useMemo } from 'react'
import { PolarArea } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(Tooltip, Legend, RadialLinearScale, ArcElement, ChartDataLabels)
const listDataSet = [
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'average', label: 'Average' }
]

interface IPaymentReactionChartV2Props {}

const PaymentReactionChartV2: React.FunctionComponent<IPaymentReactionChartV2Props> = () => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const dataChart = useMemo(() => homeReportCurrent?.ORDERS?.['Purchases'], [homeReportCurrent])

  const datasetData = [dataChart?.['1'], dataChart?.['2'], dataChart?.['3']]

  const getGradient = (ctx, chartArea, index) => {
    const gradients = [
      {
        start: '#CB5DFF',
        end: '#1D41BE'
      },
      {
        start: '#64FBD7',
        end: '#5383FF'
      },
      {
        start: '#CB2C2C',
        end: '#FF9432'
      }
    ]

    if (!chartArea) return gradients[index].start
    const { width, height } = chartArea
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, gradients[index]?.start)
    gradient.addColorStop(1, gradients[index]?.end)
    return gradient
  }

  return (
    <div
      className={classNames(
        'payment-reaction-chart-v2 relative  bg-ln-blue-pink-2 shadow-s-11',

        'size-[470px] sm:w-[720px] h-[520px] rounded-[32px]'
      )}
    >
      <div
        className={classNames(
          'absolute flex items-center justify-center bg-white/[.44] shadow-s-7 backdrop-blur-[80px]',

          'top-0 -left-[6px] h-[50px] w-[300px] rounded-bl-[34px] rounded-tr-[34px]'
        )}
      >
        <p
          className={classNames(
            'bg-ln-blue-green-2 bg-clip-text font-customSemiBold capitalize text-transparent',
            'text-[28px]'
          )}
        >
          Payment Reaction
        </p>
      </div>

      <div className={classNames('absolute left-1/2 w-full -translate-x-1/2 transform', 'top-10  h-[400px]')}>
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
                  font: { size: 20 },
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
                    label: (tooltipItem) => ` ${tooltipItem.raw}%`
                  }
                }
              }
            }}
            data={{
              labels: ['uncomfortable', 'Normal'],
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

      <div className={classNames('absolute flex w-full items-center justify-between', 'bottom-[60px] gap-2 px-10')}>
        {listDataSet.map((data, i) => (
          <div key={`${data.value}-${i}`} className='flex items-center gap-[6px]'>
            <div
              className={classNames(
                `'size-[10px] md:size-[18px] rounded-md'}`,
                data.value === 'satisfied'
                  ? 'bg-payment-v2-orange'
                  : data.value === 'dissatisfied'
                    ? 'bg-payment-v2-purple'
                    : 'bg-payment-v2-blue'
              )}
            />
            <p className={classNames('text-nowrap text-[18px]/[18.9px]')}>{data.label} Purchases</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentReactionChartV2
