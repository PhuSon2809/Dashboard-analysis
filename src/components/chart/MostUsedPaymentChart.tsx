import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import classNames from 'classnames'
import { memo, useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Title, Tooltip)

const MostUsedPaymentChart = memo(({ isSmall }: { isSmall?: boolean }) => {
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
        size: 10
      })
    } else {
      setCustom({
        cutout: '130',
        size: 4.82
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
  const dataChart = useMemo(() => homeReportCurrent?.mostUsedPayment, [homeReportCurrent])

  return (
    <div
      className={classNames(
        isSmall
          ? 'most-used-payment-chart h-[150px] w-[300px] lg:size-[110px] rounded-[9.64px] bg-ln-white-green pr-[6.03px] pt-2 shadow-s-14 backdrop-blur-2xl'
          : 'most-used-payment-chart size-[470px] sm:size-[510px] rounded-[32px] bg-ln-white-green pr-[6.03px] pt-2 shadow-s-14 backdrop-blur-2xl'
      )}
    >
      <div
        className={classNames(
          isSmall
            ? 'absolute -bottom-[2px] -left-[3px] flex h-[14px] w-[150px] p-3 lg:w-[78.05px] items-center justify-center rounded-bl-[30px] rounded-tr-[30px] bg-white backdrop-blur-[80px]'
            : 'absolute -left-[10px] bottom-[0px] flex h-[50px] w-[200px] items-center justify-center rounded-bl-[32px] rounded-tr-[32px] bg-[#FBFCFE]'
        )}
      >
        <p
          className={classNames(
            isSmall
              ? 'bg-ln-purple-green bg-clip-text font-customSemiBold text-[10px] lg:text-[6.63px] capitalize text-transparent'
              : 'bg-ln-purple-green bg-clip-text font-customSemiBold text-[18px] capitalize text-transparent'
          )}
        >
          Most used payment
        </p>
      </div>

      <div className={classNames(isSmall ? 'h-[110px] lg:h-[90px] w-full' : 'h-[90%] w-full')}>
        <Bar
          data={{
            labels: ['QR Pay', 'Cash', 'Take away'],
            datasets: [
              {
                data: [dataChart?.['1'], dataChart?.['2'], dataChart?.['3']],
                // data: [10, 20, 30],
                backgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                  gradient.addColorStop(0, '#FCFCFD')
                  gradient.addColorStop(0.4, '#FCFCFD')
                  gradient.addColorStop(1, '#53D750')
                  return gradient
                },
                hoverBackgroundColor: (ctx: any) => {
                  const chart = ctx.chart
                  const { ctx: canvasCtx, chartArea } = chart
                  if (!chartArea) return null
                  const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                  gradient.addColorStop(0, '#FCFCFD')
                  gradient.addColorStop(0.3, '#FCFCFD')
                  gradient.addColorStop(1, '#53D750')
                  return gradient
                },
                borderColor: 'rgba(140, 225, 133 , 0.3)',
                borderWidth: 0.5,
                borderRadius: 2,
                barThickness: isSmall ? 12.04 : 45.2
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              datalabels: { display: false },
              tooltip: {
                displayColors: false,
                callbacks: {
                  title: function () {
                    return ''
                  }
                }
              }
            },
            scales: {
              x: {
                display: true,
                grid: { display: false },
                ticks: { display: true, font: { size: isSmall ? custom.size : 18 }, color: '#0D0D0D' },
                border: { display: true, color: '#000', width: 0.3 }
              },
              y: {
                display: true,
                grid: { display: true, tickWidth: 0 },
                ticks: { display: false },
                border: { display: false, dash: [2, 2] }
              }
            }
          }}
        />
      </div>
    </div>
  )
})

export default MostUsedPaymentChart
