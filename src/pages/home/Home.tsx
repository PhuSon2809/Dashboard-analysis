import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import unpleash from '~/assets/images/unpleash.svg'
import { AutoplayVideo } from '~/components/autoplayVideo'
import Banner3D from '~/components/banner/banner3D'
import { ButtonPrimary } from '~/components/button'
import { InStore, ListenToOurCustomer } from '~/sections/home'
import CustomerReaction from '~/sections/home/CustomerReaction'
import InStoreExperienceToday from '~/sections/home/InStoreExperienceToday'

interface IHomePageProps {}

const Home: React.FunctionComponent<IHomePageProps> = memo(() => {
  return (
    <div className='h-auto bg-[#F4F7F9]'>
      <div className='carousel relative'>
        <div className='flex min-h-screen w-full justify-center lg:pt-[100px]'>
          <div className='flex flex-col items-center gap-14'>
            <h1 className='max-w-[800px] text-center text-[52px] font-semibold capitalize'>
              With AI, understand customers in-store with ease
            </h1>
            <ButtonPrimary className=''>
              <Link to='http://pre.fi.ai' className='h-full w-full'>
                <span>Start</span>
              </Link>
            </ButtonPrimary>
          </div>
        </div>
        <div className='absolute left-0 top-0'>
          <Banner3D />
        </div>
      </div>
      <div className='accurate-count'>
        <div className='container-wrapper flex flex-col gap-10'>
          <h1 className='mt-[100px] text-center text-[50px] font-bold md:text-[64px]'>Accurate Count and Analyze</h1>
          <AutoplayVideo
            source='https://img.m.pro/fiai-home.mp4'
            defaultImage='https://via.placeholder.com/1920x1080'
          />
        </div>
      </div>
      <div className='unleash-the-power container-wrapper grid grid-cols-3 py-[150px]'>
        <div className='relative mr-[-22%] flex flex-col items-end'>
          <h2 className='pr-[150px] text-[56px]'>Unleash the power</h2>
          <h1 className='text-[104px] font-bold'>Of Offline </h1>
          <h2 className='text-[56px]'>Commerce </h2>
        </div>
        <div className='col-span-2'>
          <img src={unpleash} alt='unpleash' className='h-full w-full' />
        </div>
      </div>
      <div className='mx-auto min-h-screen w-full max-w-[1440px] bg-instore xs:bg-[length:640px_100%] sm:bg-cover'>
        {/* <InStore /> */}
      </div>
      <CustomerReaction />
      <ListenToOurCustomer />
      <InStoreExperienceToday />
    </div>
  )
})

export default Home
