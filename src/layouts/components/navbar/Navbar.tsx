import { memo, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  variant?: 'vertical' | 'horizontal'
  className?: string
}

const Navbar = memo(({ className }: NavbarProps) => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const [itemHover, setItemHover] = useState<string>('')

  const configNavbar = useMemo(() => {
    return [
      {
        url: '',
        id: 'NavUserIcon',
        icon: (color: string) => <NavUserIcon color={color} className='size-6' />
      },
      {
        url: PATH_PUBLIC_APP.home,
        id: 'NavDemoIcon',
        icon: (color: string) => <NavDemoIcon color={color} className='size-6' />
      },
      {
        url: '',
        id: 'NavTimeIcon',
        icon: (color: string) => <NavTimeIcon color={color} className='size-6' />
      },
      {
        url: '',
        id: 'NavPieChartIcon',
        icon: (color: string) => <NavPieChartIcon color={color} className='size-6' />
      },
      {
        url: '',
        id: 'NavColumnChartIcon',
        icon: (color: string) => <NavColumnChartIcon color={color} className='size-6' />
      },
      {
        url: '',
        id: 'NavCrownIcon',
        icon: (color: string) => <NavCrownIcon color={color} className='size-6' />
      },
      {
        url: '',
        id: 'NavSettingIcon',
        icon: (color: string) => <NavSettingIcon color={color} className='size-6' />
      },
      {
        url: '',
        id: 'NavLogoutIcon',
        icon: (color: string) => <NavLogoutIcon color={color} className='size-6' />
      }
    ]
  }, [PATH_PUBLIC_APP])

  return (
    <div
      className={`py-[26px] px-[22px] bg-white/[.32] backdrop-blur-[40px] rounded-3xl shadow-s-16 flex flex-col items-center gap-[18px] ${className}`}
    >
      <img src={images.logo.logo_e_commerce} alt='logo' className='size-12' />

      <div className={`flex flex-col gap-1`}>
        {configNavbar.map((nav) => (
          <div
            key={nav.id}
            onMouseEnter={() => setItemHover(nav.id)}
            onMouseLeave={() => setItemHover('')}
            onClick={() => navigate(nav.url)}
            className={`size-12 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 ease-in-out cursor-pointer
                        ${pathname === nav.url ? 'bg-ln-icon-button backdrop-blur-[40px] shadow-s-16' : 'bg-white'}`}
          >
            <div className='min-w-6'>
              {nav.icon(pathname === nav.url ? 'white' : itemHover === nav.id ? 'linear' : 'black')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default Navbar
