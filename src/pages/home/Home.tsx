import { memo } from 'react'
import { Link } from 'react-router-dom'
import unpleash from '~/assets/images/unpleash.svg'
import { AutoplayVideo } from '~/components/autoplayVideo'
import Banner3D from '~/components/banner/banner3D'
import { ButtonPrimary } from '~/components/button'
import ListGridListen from '~/components/ListGridListen'
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

interface IHomePageProps { }

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
          <h1 className='mt-[100px] text-center font-bold text-[50px] md:text-[64px]'>Accurate Count and Analyze</h1>
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
      <div className='w-full min-h-screen container-wrapper'>
        <div className='w-full min-h-screen pt-10 flex items-center flex-col justify-center'>
          <div className='w-full text-center flex items-center justify-center flex-col'>
            <h2 className="font-bold text-[50px] md:text-[64px]" data-aos="fade-up">Listen to our customers</h2>
            <div className='w-full text-center max-w-[600px]' data-aos="fade-up">
              <span className="text-[18px] md:text-[20px]">We provide solution tailored with specific industry, give our clients a special seamless experience with top advance technology AI. Connect tech and people together</span>
            </div>
          </div>
          <div className='flex flex-1 w-full mb-10' data-aos="fade-up">
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
              <SwiperSlide>
                <ListGridListen />
              </SwiperSlide>
              <SwiperSlide>
                <ListGridListen />
              </SwiperSlide>
              <SwiperSlide>
                <ListGridListen />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Home
