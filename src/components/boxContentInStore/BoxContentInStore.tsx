import classNames from 'classnames'
import { FC, memo } from 'react'

interface IBoxContentInStore {
  duration?: string
  viewing?: boolean
  className?: string
  title: string
  content: string
  icon: string
  size?: 'small' | 'medium' | 'large'
}

const BoxContentInStore: FC<IBoxContentInStore> = memo(
  ({ duration, className, title, content, icon, size = 'small' }) => {
    return (
      <div
        data-aos='fade-up'
        data-aos-duration={duration}
        className={classNames(
          'shadow-s-20 relative box-content flex items-center bg-white/[.64] backdrop-blur-[125px] transition-all duration-1000 ease-in-out',
          size === 'small'
            ? 'h-[110px] w-[509px] gap-[22.56px] rounded-[66.25px] pr-[22.21px]'
            : size === 'medium'
              ? 'h-[120px] w-[555px] gap-[22.56px] rounded-[66.25px] pr-[24.23px]'
              : 'h-[130px] w-[600px] gap-[22.56px] rounded-[66.25px] pr-[26.25px]',
          className
        )}
      >
        <img
          src={icon}
          alt='icon'
          className={classNames(
            'absolute',
            size === 'small'
              ? 'left-[-8%] top-[-40%]'
              : size === 'medium'
                ? 'left-[-6.5%] top-[-35.5%]'
                : 'left-[-5.5%] top-[-29.4%]'
          )}
        />

        <div
          className={classNames(
            '',
            size === 'small'
              ? 'space-y-[9px] pl-[110px]'
              : size === 'medium'
                ? 'mt-[4px] space-y-[9.38px] pl-[120px]'
                : 'mt-[4px] space-y-[11px] pl-[130px]'
          )}
        >
          <h6
            className={classNames(
              'font-semibold text-black transition-all duration-300 ease-in-out',
              size === 'small'
                ? 'text-[21px]/[19.04px]'
                : size === 'medium'
                  ? 'text-[22px]/[20.77px]'
                  : 'text-[24px]/[22.5px]'
            )}
          >
            {title}
          </h6>
          <p
            className={classNames(
              'text-black/[.64] transition-all duration-300 ease-in-out',
              size === 'small'
                ? 'max-w-[65%] text-[16px]/[22px]'
                : size === 'medium'
                  ? 'max-w-[75%] text-[18px]/[26px]'
                  : 'max-w-[70%] text-[20px]/[28px]'
            )}
          >
            {content}
          </p>
        </div>
      </div>
    )
  }
)

export default BoxContentInStore
