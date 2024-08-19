import { Tooltip } from '@radix-ui/themes'
import classNames from 'classnames'
import { memo, useMemo, useState } from 'react'
import images from '~/assets'
import { NavLogoutIcon, NavSettingIcon } from '~/assets/icons'
import IconLock from '~/assets/icons/lock'
import NavColumnChartIcon from '~/assets/icons/NavColumnChartIcon'
import NavCrownIcon from '~/assets/icons/NavCrownIcon'
import NavDemoIcon from '~/assets/icons/NavDemoIcon'
import NavPieChartIcon from '~/assets/icons/NavPieChartIcon'
import NavTimeIcon from '~/assets/icons/NavTimeIcon'
import NavUserIcon from '~/assets/icons/NavUserIcon'
import { PATH_PUBLIC_APP } from '~/common/paths'

type NavbarProps = {
  className?: string
  scrollToSection: (id: string) => void
}

const Navbar = memo(({ className, scrollToSection }: NavbarProps) => {
  //const navigate = useNavigate()

  const [itemHover, setItemHover] = useState<string>('')
  const [itemActive, setItemActive] = useState<string>('')
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [isOpenMenuItem, setIsOpenMenuItem] = useState<boolean>(false)

  const configNavbar = useMemo(() => {
    return [
      {
        url: '',
        id: 'NavUserIcon',
        icon: (color: string) => <NavUserIcon color={color} className='size-6' />,
        title: 'About Us'
      },
      {
        url: PATH_PUBLIC_APP.home,
        id: 'NavDemoIcon',
        icon: (color: string) => <NavDemoIcon color={color} className='size-6' />,
        title: 'Demo'
      },
      {
        url: '',
        id: 'NavTimeIcon',
        icon: (color: string) => <NavTimeIcon color={color} className='size-6' />,
        title: 'Real Time Report'
      },
      {
        url: '',
        id: 'NavPieChartIcon',
        icon: (color: string) => <NavPieChartIcon color={color} className='size-6' />,
        title: 'Daily Report'
      },
      {
        url: '',
        id: 'NavColumnChartIcon',
        icon: (color: string) => <NavColumnChartIcon color={color} className='size-6' />,
        title: 'Deep Analysis'
      },
      {
        url: '',
        id: 'NavCrownIcon',
        icon: (color: string) => <NavCrownIcon color={color} className='size-6' />,
        title: 'Pro Plan'
      },
      {
        url: '',
        id: 'NavSettingIcon',
        icon: (color: string) => <NavSettingIcon color={color} className='size-6' />,
        title: 'Setting'
      },
      {
        url: '',
        id: 'NavLogoutIcon',
        icon: (color: string) => <NavLogoutIcon color={color} className='size-6' />,
        title: 'Logout'
      }
    ]
  }, [PATH_PUBLIC_APP])

  const listMenuRender = useMemo(
    () =>
      isOpenMenuItem
        ? configNavbar
        : configNavbar.filter(
            (menu) => menu.id !== 'NavTimeIcon' && menu.id !== 'NavPieChartIcon' && menu.id !== 'NavColumnChartIcon'
          ),
    [isOpenMenuItem, configNavbar]
  )

  return (
    <div
      className={classNames(
        className,
        isOpenMenu
          ? 'left-5 top-5 h-fit transform rounded-3xl bg-[#ebebeb] px-[22px] py-[26px] shadow-s-16 backdrop-blur-[40px]'
          : 'h-[100px] p-5 xs:left-[10px] xs:top-[10px] sm:left-[17px] sm:top-[30px]',
        isOpenMenu ? 'max-h-screen' : 'max-h-[100px]',
        'fixed z-50 flex w-fit flex-col items-center gap-[18px] overflow-hidden transition-all duration-700 ease-in-out'
      )}
    >
      <button
        onClick={() => {
          setItemActive('')
          setIsOpenMenu(!isOpenMenu)
          setIsOpenMenuItem(false)
        }}
        className={classNames(
          'flex min-h-[48.01px] min-w-[48.01px] items-center justify-center rounded-full bg-white shadow-s-19 transition-transform duration-1000 ease-in-out',
          isOpenMenu && 'rotate-y-360deg'
        )}
      >
        <img src={images.logo.logo_fi} alt='logo-fi' className='size-8' />
      </button>

      <div className={`flex flex-col gap-1`}>
        {listMenuRender.map((nav) => {
          const lockFeature =
            nav.id !== 'NavDemoIcon' &&
            nav.id !== 'NavUserIcon' &&
            nav.id !== 'NavPieChartIcon' &&
            nav.id !== 'NavTimeIcon'

          return (
            <Tooltip side='right' content={nav.title} key={nav.id}>
              <div
                onMouseEnter={() => setItemHover(nav.id)}
                onMouseLeave={() => setItemHover('')}
                onClick={() => {
                  setItemActive(nav.id)
                  if (nav.id === 'NavDemoIcon') {
                    setIsOpenMenuItem(!isOpenMenuItem)
                  } else if (nav.id === 'NavTimeIcon' || nav.id === 'NavPieChartIcon') {
                    scrollToSection(nav.id)
                  } else if (nav.id === 'NavUserIcon') {
                    window.open('https://fi.ai/', '_self')
                  } else {
                    // navigate(nav.url)
                    alert('You do not have administrative rights, please contact the administrator.')
                  }
                }}
                className={classNames(
                  `relative flex size-12 cursor-pointer items-center justify-center rounded-full transition duration-300 ease-in-out hover:scale-105`,
                  itemActive === nav.id ? 'bg-ln-icon-button shadow-s-16 backdrop-blur-[40px]' : 'bg-transparent'
                )}
              >
                {lockFeature && <IconLock className='absolute left-0 top-[20%] h-[10px] w-[10px]' />}

                <div className='min-w-6'>
                  {nav.icon(itemActive === nav.id ? 'white' : itemHover === nav.id ? 'linear' : 'black')}
                </div>
              </div>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
})

export default Navbar
