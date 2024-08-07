import classNames from 'classnames'
import { FC, memo } from 'react'
import useResponsive from '~/hooks/useResponsive'

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
    const mdDown = useResponsive('down', 'md')

    return (
      <div
        data-aos={mdDown ? 'fade-down' : 'fade-up'}
        data-aos-duration={duration}
        className={classNames(
          'relative box-content flex items-center bg-white/[.64] shadow-s-20 backdrop-blur-[125px] transition-all duration-1000 ease-in-out',
          size === 'small'
            ? 'gap-[22.56px] rounded-[66.25px] pr-[22.21px] xs:h-[78.01px] xs:max-w-[336px] sm:h-[65px] sm:w-[320px] md:h-[110px] md:w-[509px]'
            : size === 'medium'
              ? 'gap-[22.56px] rounded-[66.25px] pr-[24.23px] xs:h-[51px] xs:w-[208px] sm:h-[75px] sm:w-[380px] md:h-[120px] md:w-[555px]'
              : 'gap-[22.56px] rounded-[66.25px] pr-[26.25px] xs:h-[42px] xs:w-[166px] sm:h-[85px] sm:w-[440px] md:h-[130px] md:w-[600px]',
          className
        )}
      >
        <img
          src={icon}
          alt='icon'
          className={classNames(
            'absolute',
            size === 'small'
              ? 'xs:left-[-10.5%] xs:top-[-53.5%] xs:w-[180px] sm:left-[-13.5%] sm:top-[-75%] sm:w-[180px] md:left-[-8%] md:top-[-40.5%] md:w-fit'
              : size === 'medium'
                ? 'xs:left-[-13%] xs:top-[-65.5%] xs:w-[130px] sm:left-[-11.5%] sm:top-[-65%] sm:w-[190px] md:left-[-6.5%] md:top-[-35.1%] md:w-fit'
                : 'xs:left-[-11.5%] xs:top-[-60%] xs:w-[100px] sm:left-[-9.5%] sm:top-[-57%] sm:w-[200px] md:left-[-5.5%] md:top-[-29.6%] md:w-fit'
          )}
        />

        <div
          className={classNames(
            size === 'small'
              ? 'xs:mt-1 xs:space-y-[7px] xs:pl-[82px] sm:space-y-[0px] sm:pl-[68px] md:mt-0 md:space-y-[9px] md:pl-[110px]'
              : size === 'medium'
                ? 'mt-[4px] xs:space-y-[5px] xs:pl-[57px] sm:space-y-[2px] sm:pl-[78px] md:space-y-[9.38px] md:pl-[120px]'
                : 'mt-[4px] xs:space-y-[2px] xs:pl-[46px] sm:space-y-[2px] sm:pl-[92px] md:space-y-[11px] md:pl-[130px]'
          )}
        >
          <h6
            className={classNames(
              'font-semibold text-black transition-all duration-300 ease-in-out',
              size === 'small'
                ? 'xs:text-[16px]/[13.4px] sm:text-[15px]/[18.9px] md:text-[21px]/[19.04px]'
                : size === 'medium'
                  ? 'xs:text-[10px]/[8.68px] sm:text-[17px]/[18.9px] md:text-[22px]/[20.77px]'
                  : 'xs:text-[9px]/[7.19px] sm:text-[18px]/[18.9px] md:text-[24px]/[22.5px]'
            )}
          >
            {title}
          </h6>
          <p
            className={classNames(
              'text-black/[.64] transition-all duration-300 ease-in-out',
              size === 'small'
                ? 'xs:max-w-[90%] xs:text-[12px]/[16px] sm:text-[13px]/[16.9px] md:max-w-[65%] md:text-[16px]/[22px]'
                : size === 'medium'
                  ? 'xs:max-w-[95%] xs:text-[8px]/[12px] sm:max-w-[85%] sm:text-[14px]/[20px] md:max-w-[75%] md:text-[18px]/[26px]'
                  : 'xs:max-w-[90%] xs:text-[7px]/[10px] sm:max-w-[90%] sm:text-[16px]/[20px] md:max-w-[70%] md:text-[20px]/[28px]'
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
