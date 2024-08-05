import { memo } from 'react'
import { Link } from 'react-router-dom'
import { AutoplayVideo } from '~/components/autoplayVideo'
import { ButtonPrimary } from '~/components/button'

interface IHomePageProps {}

const Home: React.FunctionComponent<IHomePageProps> = memo(() => {
  return (
    <div className='h-auto'>
      <div className='carousel relative'>
        <div className='flex min-h-screen w-full justify-center lg:pt-[200px]'>
          <div className='flex flex-col items-center gap-14'>
            <h1 className='max-w-[800px] text-center text-[52px] font-semibold capitalize'>
              With AI, understand customers in-store with ease
            </h1>
            <ButtonPrimary className=''>
              <Link to='https://analysis.m.pro/' className='w-full h-full'>
                <span>Start</span>
              </Link>
            </ButtonPrimary>
          </div>
        </div>
      </div>
      <div className='accurate-count'>
        <div className='container-wrapper flex flex-col gap-10'>
          <h1 className='mt-[100px] text-center text-[60px] font-semibold'>Accurate Count and Analyze</h1>
          <AutoplayVideo
            source='https://img.m.pro/fiai-home.mp4'
            defaultImage='https://via.placeholder.com/1920x1080'
          />
        </div>
      </div>
    </div>
  )
})

export default Home
