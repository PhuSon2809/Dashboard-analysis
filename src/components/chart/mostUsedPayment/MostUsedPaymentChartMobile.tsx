import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import classNames from 'classnames'
import { memo, useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useAppSelector } from '~/redux/configStore'

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Title, Tooltip)

const MostUsedPaymentChartMobile = memo(
  ({ isSmall, isLittleSmall }: { isSmall?: boolean; isLittleSmall?: boolean }) => {
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
          size: 3
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
          'most-used-payment-chart backdrop-blur-2xl pt-2 shadow-s-14 bg-ln-white-green  relative',
          isSmall
            ? ' size-[80px] rounded-[9.64px] pr-[6.03px] '
            : isLittleSmall
              ? 'h-[170px] rounded-[15px]'
              : ' w-[470px] h-[520px]  rounded-[32px]  pr-[6.03px] '
        )}
      >
        {!isSmall && (
          <div
            className={classNames(
              'flex items-center justify-center  bg-[#f1f1f1] translate-y-[-30%]',
              isLittleSmall
                ? ' h-[30px] w-[130px]   rounded-bl-[15px] rounded-tr-[15px]'
                : ' h-[50px] w-[300px] rounded-bl-[32px] rounded-tr-[32px]'
            )}
          >
            <p
              className={classNames(
                'bg-ln-purple-green bg-clip-text font-customSemiBold  capitalize text-transparent',
                isLittleSmall ? 'text-[10px]' : 'text-[28px]'
              )}
            >
              waiting reaction
            </p>
          </div>
        )}

        <div className={classNames(isSmall ? 'h-[70px] w-full' : isLittleSmall ? 'h-[130px]' : 'h-[85%] pt-4 w-full')}>
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
                  barThickness: isSmall ? 12.04 : isLittleSmall ? 20 : 45.2
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
                  ticks: {
                    display: true,
                    font: { size: isSmall ? custom.size : isLittleSmall ? 8 : 18 },
                    color: '#0D0D0D'
                  },
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
  }
)

export default MostUsedPaymentChartMobile
