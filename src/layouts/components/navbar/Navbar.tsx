import { Tooltip } from '@radix-ui/themes'
import classNames from 'classnames'
import { memo, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import images from '~/assets'
import { NavLogoutIcon, NavSettingIcon } from '~/components/icons'
import NavColumnChartIcon from '~/components/icons/NavColumnChartIcon'
import NavCrownIcon from '~/components/icons/NavCrownIcon'
import NavDemoIcon from '~/components/icons/NavDemoIcon'
import NavPieChartIcon from '~/components/icons/NavPieChartIcon'
import NavTimeIcon from '~/components/icons/NavTimeIcon'
import NavUserIcon from '~/components/icons/NavUserIcon'
import { PATH_PUBLIC_APP } from '~/constants/paths'

type NavbarProps = {
  className?: string
  scrollToSection: (id: string) => void
}

const Navbar = memo(({ className, scrollToSection }: NavbarProps) => {
  const navigate = useNavigate()

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
  console.log(listMenuRender)

  return (
    <div
      className={classNames(
        className,
        isOpenMenu
          ? 'h-fit py-[26px] px-[22px] bg-[#ebebeb] backdrop-blur-[40px] rounded-3xl shadow-s-16 top-5 left-5 transform '
          : 'h-[100px] p-5 xs:top-[10px] sm:top-[30px] xs:left-[10px] sm:left-[17px]',
        isOpenMenu ? 'max-h-screen' : 'max-h-[100px]',
        'fixed w-fit z-50 flex flex-col items-center gap-[18px] overflow-hidden transition-all duration-700 ease-in-out'
      )}
    >
      <button
        onClick={() => {
          setItemActive('')
          setIsOpenMenu(!isOpenMenu)
          setIsOpenMenuItem(false)
        }}
        className={classNames(
          'min-w-[48.01px] min-h-[48.01px] flex items-center justify-center bg-white shadow-s-19 rounded-full transition-transform duration-1000 ease-in-out',
          isOpenMenu && 'rotate-y-360deg'
        )}
      >
        <img src={images.logo.logo_fi} alt='logo-fi' className='size-8' />
      </button>

      <div className={`flex flex-col gap-1`}>
        {listMenuRender.map((nav) => (
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
                } else {
                  navigate(nav.url)
                }
              }}
              className={classNames(
                `size-12 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 ease-in-out cursor-pointer`,
                itemActive === nav.id ? 'bg-ln-icon-button backdrop-blur-[40px] shadow-s-16' : 'bg-transparent'
              )}
            >
              <div className='min-w-6'>
                {nav.icon(itemActive === nav.id ? 'white' : itemHover === nav.id ? 'linear' : 'black')}
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  )
})

export default Navbar
