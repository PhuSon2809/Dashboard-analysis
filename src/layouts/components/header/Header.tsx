import { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import images from '~/assets'
import menuBar from '~/common/menubar'
import { ButtonPrimary } from '~/components/button'
import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '~/components/navigationMenu'

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = memo(() => {
  useEffect(() => {
    window.addEventListener('scroll', function () {
      const header = document.querySelector('header')
      if (window.scrollY > 100) {
        header?.classList.add('header-active')
      } else {
        header?.classList.remove('header-active')
      }
    })
    return () => {}
  }, [])

  return (
    <header className='shadow-md relative z-50 bg-white'>
      <div className='header_desktop h-[80px]'>
        <div className='container-wrapper mx-auto flex h-full items-center justify-between'>
          <div className='flex items-center gap-10'>
            <Link to='/' className='text-lg font-bold text-gray-800'>
              <img src={images.logo.logo_fi} alt='logo-fiai' className='w-[50px]' />
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                      <li className='row-span-3'>
                        <NavigationMenuLink asChild>
                          <a
                            className='focus:shadow-md flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none'
                            href='/'
                          >
                            <img src={images.logo.logo_fi} alt='logo-fiai' />
                            <div className='mb-2 mt-4 text-lg font-medium'>shadcn/ui</div>
                            <p className='text-sm leading-tight text-muted-foreground'>
                              Beautifully designed components that you can copy and paste into your apps. Accessible.
                              Customizable. Open Source.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href='/docs' title='Introduction'>
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </ListItem>
                      <ListItem href='/docs/installation' title='Installation'>
                        How to install dependencies and structure your app.
                      </ListItem>
                      <ListItem href='/docs/primitives/typography' title='Typography'>
                        Styles for headings, paragraphs, lists...etc
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                      {menuBar.map((component) => (
                        <ListItem key={component.title} title={component.title} href={component.href}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to='/docs'>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className='flex items-center gap-2'>
            <div className='flex h-[40px] w-[100px] items-center justify-center overflow-hidden rounded-[20px] bg-primary-gradient bg-clip-text p-2 font-semibold text-transparent'>
              <Link to='/login' className=''>
                Login
              </Link>
            </div>
            <ButtonPrimary>
              <Link to='/register' className=''>
                Register
              </Link>
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </header>
  )
})

export default Header
