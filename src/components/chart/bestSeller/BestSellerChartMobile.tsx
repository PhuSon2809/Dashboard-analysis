import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import classNames from 'classnames'
import { memo, useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'
import { formatLocaleString } from '~/utils/format'

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip, ChartDataLabels)

const listFood = [
  'Fish and Chips',
  'Paella',
  'Coq au Vin',
  'Wiener Schnitzel',
  'Ratatouille',
  'Falafel Wrap',
  'Margherita Pizza'
]

const BestSellerChartMobile = memo(({ isSmall, isLittleSmall }: { isSmall?: boolean; isLittleSmall?: boolean }) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)
  const [custom, setCustom] = useState({
    cutout: '50%',
    size: 20
  })
  const handleResize = () => {
    const width = window.innerWidth
    if (width < 780) {
      setCustom({
        cutout: '80',
        size: 5
      })
    } else {
      setCustom({
        cutout: '130',
        size: 5
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
  const dataChart = useMemo(() => homeReportCurrent?.ORDERS?.['Best Seller'], [homeReportCurrent])

  const datasetData = Array.from({ length: 7 }).map((_, index) => dataChart?.[`${index + 1}`])

  return (
    <div
      className={classNames(
        'best-seller-chart relative bg-ln-yellow',
        isSmall
          ? 'size-[80px] overflow-hidden rounded-lg'
          : isLittleSmall
            ? 'h-[170px] rounded-[10px]'
            : 'h-[520px] w-[470px] rounded-[32px]'
      )}
    >
      {!isSmall && (
        <div
          className={classNames(
            'flex items-center justify-center bg-white/[.44] shadow-s-7 backdrop-blur-[80px]',
            isLittleSmall
              ? 'absolute top-[-10%] h-[30px] w-[100px] items-center justify-center rounded-bl-[32px] rounded-tr-[32px]'
              : 'bottom-0 left-0 h-[54px] w-[191px] rounded-bl-[34px] rounded-tr-[34px]'
          )}
        >
          <p
            className={classNames(
              'bg-ln-blue-green-2 bg-clip-text font-customSemiBold capitalize text-transparent',
              isLittleSmall ? 'text-[14px]' : 'text-[28px]'
            )}
          >
            Best Seller
          </p>
        </div>
      )}

      <div
        className={classNames('w-full p-2', isSmall ? 'h-[90px]' : isLittleSmall ? 'h-[170px]' : 'h-[450px] px-8 pt-5')}
      >
        <div className='h-full w-full'>
          <Bar
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  font: { size: isSmall ? custom.size : isLittleSmall ? 8 : 16 },
                  color: '#000',
                  anchor: 'center',
                  align: 'center',
                  formatter: (value) => formatLocaleString(value)
                },
                legend: { display: false },
                tooltip: {
                  displayColors: false,
                  callbacks: {
                    title: () => '',
                    label: (tooltipItem) => `${tooltipItem.label}: ${formatLocaleString(tooltipItem.raw)}`
                  }
                }
              },
              scales: {
                x: { display: false },
                y: {
                  display: true,
                  grid: { display: false },
                  border: { display: false },
                  ticks: {
                    display: true,
                    color: 'rgb(13, 13, 13)',
                    font: { size: isSmall ? custom.size : isLittleSmall ? 7 : 16 }
                  }
                }
              }
            }}
            data={{
              labels: listFood.map((food) => food),
              datasets: [
                {
                  data: datasetData,
                  borderColor: 'rgb(172, 204, 255)',
                  backgroundColor: (ctx) => {
                    const chart = ctx.chart
                    const { ctx: canvasCtx } = chart
                    const gradient = canvasCtx.createLinearGradient(0, 0, chart.width, 0)
                    gradient.addColorStop(1, '#F0F33C')
                    gradient.addColorStop(0, '#53D750')
                    return gradient
                  },
                  hoverBackgroundColor: (ctx) => {
                    const chart = ctx.chart
                    const { ctx: canvasCtx } = chart
                    const gradient = canvasCtx.createLinearGradient(0, 0, chart.width, 0)
                    gradient.addColorStop(1, '#F0F33C')
                    gradient.addColorStop(0, '#53D750')
                    return gradient
                  },
                  barThickness: isSmall ? 10 : isLittleSmall ? 13 : 28
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default BestSellerChartMobile
