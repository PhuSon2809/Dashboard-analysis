import { memo } from 'react'
import { BestSellerChart, MostUsedPaymentChart, PaymentReactionChart, ReactionsEnjoyChart } from '~/components/chart'
import PurchasesChart from '~/components/chart/PurchasesChart'

const OrderReport = memo(() => {
  return (
    <div className='h-[1309px] bg-earth-2 '>
      <div className='mt-[329px] pl-[60px] flex gap-6'>
        <div className='pt-10'>
          <h3 className='w-fit text-[52px] leading-none mb-[49px] font-customBold uppercase text-transparent bg-clip-text bg-ln-red-purple'>
            orders
          </h3>
          <ReactionsEnjoyChart />
        </div>

        <BestSellerChart />

        <div>
          <div className='flex items-center gap-[17.6px] mb-[30px]'>
            <PaymentReactionChart />
            <MostUsedPaymentChart />
          </div>
          <PurchasesChart />
        </div>
      </div>
    </div>
  )
})

export default OrderReport
