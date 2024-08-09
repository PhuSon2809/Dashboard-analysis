import classNames from 'classnames'
import React from 'react'
import ArrowListen from '~/assets/icons/ArrowListen'
import InfoUser from './InfoUser'
import images from '~/assets'

const classArrow = 'size-12 md:size-[5vw] absolute transform'
const classText = 'text-sm absolute font-bold'

const data = [
  {
    name: 'Dulce Press',
    des: 'United States',
    avatar: images.image.user4,
    className: classNames('rotate-[5deg]', 'sm:rotate-[0deg]', 'lg:rotate-[15deg]'),
    role: (
      <div className=''>
        <ArrowListen
          className={classNames(
            classArrow,
            'scale-y-[-1] transform',
            '-right-6 -top-10 -rotate-[140deg]',
            'sm:left-0 sm:right-auto sm:rotate-[-40deg] sm:scale-y-[1]',
            'lg:left-0 lg:top-0 lg:translate-y-[-120%] lg:-rotate-[5deg] lg:scale-y-[1]'
          )}
        />
        <span
          className={classNames(
            classText,

            '-right-12 -top-4 rotate-[-8deg]',
            'sm:left-0 sm:right-auto sm:translate-x-[-8vw]',
            'lg:top-0 lg:translate-x-[-4vw] lg:translate-y-[-8vw]'
          )}
        >
          F&B
        </span>
      </div>
    )
  },
  {
    name: 'Ruben Rosser',
    des: 'Canada',
    avatar: images.image.user5,
    className: classNames(
      'rotate-[-10deg] flex-row-reverse',
      'sm:rotate-[0deg]',
      'lg:rotate-[15deg] lg:translate-x-[10%]'
    )
  },
  {
    name: 'Jordyn Dias',
    des: 'Germany',
    avatar: images.image.user6,
    className: classNames('rotate-[-10deg]', 'sm:rotate-[0deg]', 'lg:rotate-[-5deg] lg:translate-y-[-30%]'),
    role: (
      <div className=''>
        <ArrowListen
          className={classNames(
            classArrow,
            'scale-y-[-1] transform',
            '-right-12 top-5 -rotate-[90deg]',
            'sm:left-0 sm:right-auto sm:translate-x-[-100%] sm:scale-y-[1]',
            'lg:left-auto lg:right-0 lg:top-0 lg:translate-x-[100%] lg:scale-y-[-1]'
          )}
        />
        <span
          className={classNames(
            classText,
            '-right-[60px] top-[64px] rotate-[-8deg]',
            'sm:left-[-56px] sm:right-auto sm:top-[60px]',
            'lg:left-auto lg:right-0 lg:top-0 lg:translate-x-[8vw] lg:translate-y-[6vw]'
          )}
        >
          Fashion
        </span>
      </div>
    )
  },
  {
    name: 'Carla Vaccaro',
    des: 'United Kingdom',
    avatar: images.image.user7,
    className: classNames(
      'rotate-[5deg] flex-row-reverse',
      'sm:rotate-[0deg]',
      'lg:rotate-[-12deg] lg:translate-x-[40%] lg:translate-y-[-10%]'
    ),
    role: (
      <div className=''>
        <ArrowListen
          className={classNames(
            classArrow,
            '-left-[52px] top-8 max-w-sm rotate-[-90deg]',
            // 'sm:left-auto sm:right-0 sm:translate-x-[100%] sm:translate-y-[-24%] sm:rotate-[90deg] sm:scale-x-[-1]',
            'lg:bottom-0 lg:left-0 lg:right-auto lg:top-auto lg:translate-x-[-1vw]'
          )}
        />
        <span
          className={classNames(
            classText,
            '-left-[60px] top-[72px]',
            'sm:left-auto sm:right-0 sm:translate-x-[100%]',
            'lg:left-0 lg:top-0 lg:translate-x-[-8vw] lg:translate-y-[8vw]'
          )}
        >
          Nail Salon
        </span>
      </div>
    )
  },
  {
    name: 'Alfredo Franci',
    des: 'France',
    avatar: images.image.user8,
    className: classNames(
      'rotate-[-5deg]',
      'sm:rotate-[0deg]',
      'lg:rotate-[-12deg] lg:translate-x-[30%] lg:translate-y-[25%]'
    )
  },
  {
    name: 'Maren Korsgaard',
    des: 'Australia',
    avatar: images.image.user9,
    className: classNames('rotate-[5deg] flex-row-reverse', 'sm:rotate-[0deg]', 'lg:rotate-[12deg] '),
    role: (
      <div className=''>
        <ArrowListen
          className={classNames(
            classArrow,
            'absolute -bottom-12 right-10 h-12 w-12 -rotate-[160deg] scale-x-[-1] transform',
            'lg:bottom-0 lg:right-[8vw] lg:translate-y-[100%]'
          )}
        />
        <span
          className={classNames(
            classText,
            '-bottom-12 right-[100px]',
            'lg:bottom-0 lg:right-0 lg:translate-x-[-13vw] lg:translate-y-[6vw] lg:rotate-[-12deg]'
          )}
        >
          Convenience Store
        </span>
      </div>
    )
  }
]

const ListGridListen = () => {
  return (
    <React.Fragment>
      <div className={classNames('block w-full items-center justify-center py-[60px]', 'lg:flex lg:py-[100px]')}>
        <div
          className={classNames(
            'mx-auto mt-5 grid w-full max-w-[400px] grid-cols-1 items-center justify-center',
            'sm:w-[80%] sm:max-w-[100%] sm:grid-cols-2 sm:gap-3',
            'lg:aspect-[3] lg:grid-cols-3 lg:gap-0'
          )}
        >
          {data.map((user, index) => (
            <InfoUser
              key={index}
              {...user}
              // className={user.className}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default React.memo(ListGridListen)
