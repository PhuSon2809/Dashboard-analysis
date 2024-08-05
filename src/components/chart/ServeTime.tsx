import classNames from 'classnames'
import { memo, useCallback, useMemo } from 'react'
import { useAppSelector } from '~/redux/configStore'

const ServeTime = memo(({ isSmall }: { isSmall?: boolean }) => {
  const { homeReportCurrent } = useAppSelector((s) => s.report)

  // const duration = 5 * 60 * 1000

  const getFormattedTime = useCallback((milliseconds: number) => {
    const total_seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(total_seconds / 60)
    const seconds = total_seconds % 60
    return { minutes, seconds }
  }, [])

  const formattedTime = useMemo(() => getFormattedTime(homeReportCurrent?.serveTime * 1000), [homeReportCurrent])
  // const formattedTime = useMemo(() => getFormattedTime(duration), [homeReportCurrent])

  return (
    <div
      className={classNames(
        isSmall
          ? 'serve-time flex size-[110px] items-center justify-center rounded-[9.64px] bg-rg-white shadow-s-14 backdrop-blur-2xl'
          : 'serve-time flex size-[510px] items-center justify-center rounded-[9.64px] bg-rg-white shadow-s-14 backdrop-blur-2xl'
      )}
    >
      <div
        className={classNames(
          isSmall
            ? 'relative flex size-[90px] items-center justify-center rounded-full bg-white shadow-s-9'
            : 'relative flex size-[450px] items-center justify-center rounded-full bg-white shadow-s-9'
        )}
      >
        <div role='status'>
          <svg
            aria-hidden='true'
            className={classNames('animate-spin-slow', isSmall ? 'h-[68px] w-[68px]' : 'h-[200px] w-[500px]')}
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='50' cy='50' r='45' stroke='#C3D2E4' strokeWidth='8' fill='none' />
            <path
              d='M50 5
             A 45 45 0 0 1 50 95'
              stroke='url(#gradientFill)'
              strokeWidth='3'
              fill='none'
              strokeLinecap='round'
              strokeDasharray='300'
              strokeDashoffset='200'
            />
            <defs>
              <linearGradient id='gradientFill' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' style={{ stopColor: '#FF5FF4', stopOpacity: 1 }} />
                <stop offset='15%' style={{ stopColor: '#E669F4', stopOpacity: 1 }} />
                <stop offset='45%' style={{ stopColor: '#A684F4', stopOpacity: 1 }} />
                <stop offset='80%' style={{ stopColor: '#41ADF4', stopOpacity: 1 }} />
                <stop offset='97%' style={{ stopColor: '#11C1F4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center'>
          <h6 className={classNames('font-customSemiBold', isSmall ? 'text-[14.47px]' : 'text-[20px]')}>
            {(formattedTime.minutes > 0 && formattedTime.minutes) || 0}
            {formattedTime.minutes > 0 && 'm'}
            {formattedTime.seconds || 0}
            {formattedTime.seconds > 0 && 's'}
          </h6>
          <p
            className={classNames(
              'bg-ln-serve-time bg-clip-text font-customSemiBold text-transparent',
              isSmall ? 'text-[6.63px]' : 'text-[18px]'
            )}
          >
            Serve Time
          </p>
        </div>
      </div>
    </div>
  )
})

export default ServeTime
