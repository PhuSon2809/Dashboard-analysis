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

const BestSellerChart = memo(({ isSmall }: { isSmall?: boolean }) => {
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
        size: 8
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
  const dataChart = useMemo(() => homeReportCurrent?.ORDERS?.['Best Seller'], [homeReportCurrent])

  const datasetData = Array.from({ length: 7 }).map((_, index) => dataChart?.[`${index + 1}`])

  return (
    <div
      className={classNames(
        'best-seller-chart relative bg-ln-yellow shadow-s-12',
        isSmall ? 'h-[150px] w-[300px] lg:size-[110px] rounded-lg' : 'size-[460px] sm:size-[520px] rounded-[32px]'
      )}
    >
      <div
        className={classNames(
          'absolute flex items-center justify-center bg-white/[.44] shadow-s-7 backdrop-blur-[80px]',
          isSmall
            ? 'top-[-10px] h-[20px] rounded-tl-[30px]  rounded-br-[30px] w-[100px] lg:w-[50px]'
            : 'lg:bottom-[2%] bottom-0 left-0 lg:left-[-30px] h-[54px] w-[191px] rounded-tr-[34px] rounded-bl-[34px] '
        )}
      >
        <p
          className={classNames(
            'bg-ln-blue-green-2 bg-clip-text font-customSemiBold capitalize text-transparent',
            isSmall ? 'text-[10px] lg:text-[6px]' : 'text-[28px]'
          )}
        >
          Best Seller
        </p>
      </div>

      <div className={classNames('w-full px-2', isSmall ? 'h-[150px] pt-4 lg:h-[100px]' : 'h-[420px] px-8 pt-5')}>
        <div className='h-full w-full'>
          <Bar
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  font: { size: isSmall ? custom.size : 16 },
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
                  ticks: { display: true, color: 'rgb(13, 13, 13)', font: { size: isSmall ? custom.size : 16 } }
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
                  barThickness: isSmall ? 15 : 28
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default BestSellerChart
