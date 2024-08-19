import { memo, useCallback, useRef } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import AIQuestion from '~/components/AI/AI'
import AIQuestionMobile from '~/components/AI/AI-mobile'
import Carousel from '~/components/carousel/carousel'
import MostUsedPaymentV2 from '~/components/chart/pay/mostUsedPaymentV2'
import MostUsedPaymentV2Mobile from '~/components/chart/pay/mostUsedPaymentV2Mobile'
import PaymentReactionChartV2 from '~/components/chart/pay/paymentReactionChartV2'
import PaymentReactionChartV2Mobile from '~/components/chart/pay/paymentReactionChartV2Mobile'
import { Navbar } from '~/components/navbar'
import Wallet from '~/components/wallet'
import { CurrentReactions, FoodBeverage, OrderReport, RealTimeReport, TodayReport } from '~/layouts/home'
import Engagement from '~/layouts/home/Engagement'
import OrderReportMobile from '~/layouts/home/OrderReportMobile'
import { smoothScrollToElement } from '~/utils/scroll'

const Home = memo(() => {
  const foodBeverageRef = useRef<HTMLDivElement>(null)
  const todayReportRef = useRef<HTMLDivElement>(null)

  const scrollToSection = useCallback(
    (id: string) => {
      const duration = 1000
      if (id === 'NavTimeIcon' && foodBeverageRef.current) {
        smoothScrollToElement(foodBeverageRef.current, duration)
      } else if (id === 'NavPieChartIcon' && todayReportRef.current) {
        smoothScrollToElement(todayReportRef.current, duration)
      }
    },
    [foodBeverageRef, todayReportRef]
  )

  return (
    <div className='relative h-full w-full max-w-[1440px] overflow-x-hidden bg-grey500'>
      <Navbar scrollToSection={scrollToSection} />
      <Wallet />
      <div>
        {isDesktop && <AIQuestion />}
        {isMobile && <AIQuestionMobile />}
      </div>
      <div ref={foodBeverageRef} className='relative z-20'>
        <FoodBeverage />
      </div>

      <div className='relative z-20'>
        <RealTimeReport />
      </div>

      <div className='overflow-hidden lg:px-0'>
        <CurrentReactions />
        <div ref={todayReportRef}>
          <TodayReport />
        </div>
        <Engagement />
      </div>

      <div className='relative bg-ln-white-5'>
        <div className=' z-20 mt-[20px] '>
          {isDesktop && <OrderReport />}
          {isMobile && <OrderReportMobile />}
        </div>
      </div>
      <div className='mb-[168px] mt-5'>
        <h3 className='w-fit bg-ln-red-purple bg-clip-text font-customBold lg:text-[52px] px-5 text-[32px] uppercase leading-none text-transparent'>
          payment
        </h3>
        <div className='items-center justify-around gap-5 overflow-hidden py-5 lg:flex'>
          {isDesktop && (
            <>
              <PaymentReactionChartV2
                listDataset={[
                  { value: 'satisfied', label: 'Satisfied' },
                  { value: 'dissatisfied', label: 'Dissatisfied' },
                  { value: 'average', label: 'Average' }
                ]}
                title={'Payment Reaction'}
              />
              <MostUsedPaymentV2
                title={'  Most used payment'}
                listPayment={['Digital wallet', 'Cash', 'Credit Debit card']}
              />
            </>
          )}
          {isMobile && (
            <Carousel
              listData={[
                <PaymentReactionChartV2Mobile
                  listDataset={[
                    { value: 'satisfied', label: 'Satisfied' },
                    { value: 'dissatisfied', label: 'Dissatisfied' },
                    { value: 'average', label: 'Average' }
                  ]}
                  title={'Payment Reaction'}
                />,
                <MostUsedPaymentV2Mobile
                  title={'  Most used payment'}
                  listPayment={['Digital wallet', 'Cash', 'Credit Debit card']}
                />
              ]}
            ></Carousel>
          )}
        </div>
      </div>
    </div>
  )
})

export default Home
