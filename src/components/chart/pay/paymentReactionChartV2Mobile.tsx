import { ArcElement, ChartData, Chart as ChartJS, Legend, RadialLinearScale, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import * as React from 'react'
import { PolarArea } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(Tooltip, Legend, RadialLinearScale, ArcElement, ChartDataLabels)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
interface IPaymentReactionChartV2MobileProps {
  title: string
  listDataset: {
    value: string
    label: string
  }[]
  dataChartList?: ChartData<'bar'>
}

const PaymentReactionChartV2Mobile: React.FunctionComponent<IPaymentReactionChartV2MobileProps> = ({
  title,
  listDataset,
  dataChartList
}) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  const dataChart = dataChartList || homeReportCurrent?.ORDERS?.['Purchases']

  let datasetData
  if (dataChart?.['3']) {
    datasetData = [dataChart?.['1'], dataChart?.['2'], dataChart?.['3']]
  } else {
    datasetData = [dataChart?.['1'], dataChart?.['2']]
  }

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
        'payment-reaction-chart-v2 bg-ln-blue-pink-2 min-h-[480px] flex flex-col gap-5 ',

        'w-full pb-5  rounded-[25px]'
      )}
    >
      <div
        className={classNames(
          'flex items-center justify-center bg-white/[.44] shadow-s-7 backdrop-blur-[80px]',

          'top-0 -left-[6px] h-[40px] w-[240px] rounded-bl-[34px] rounded-tr-[34px]'
        )}
      >
        <p
          className={classNames(
            'bg-ln-blue-green-2 bg-clip-text font-customSemiBold capitalize text-transparent',
            'text-[20px]'
          )}
        >
          {title}
        </p>
      </div>

      <div className='w-[350px] h-[350px]'>
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

      <div className={classNames('flex  w-full items-center justify-around')}>
        {listDataset.map((data, i) => (
          <div key={`${data.value}-${i}`} className='flex items-center gap-[6px]'>
            <div
              className={classNames(
                `h-[15px] w-[15px] rounded-md flex flex-shrink-1`,
                data.value === 'satisfied'
                  ? 'bg-payment-v2-orange'
                  : data.value === 'dissatisfied' || data.value === 'yesterday'
                    ? 'bg-payment-v2-purple'
                    : 'bg-payment-v2-blue'
              )}
            />
            <p className={classNames('text-nowrap text-[13px]/[13.9px]')}>{data.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentReactionChartV2Mobile
