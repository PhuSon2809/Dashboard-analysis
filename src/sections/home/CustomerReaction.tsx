import React from 'react'
import ListBannerCustomerReaction from '~/components/ListBannerCustomerReaction'

const CustomerReaction = () => {
  return (
    <React.Fragment>
      <div className='relative z-50 mx-auto flex w-full max-w-[1440px] flex-col xs:bg-[length:640px_100%] sm:bg-cover'>
        <div className='flex h-[600px] w-full bg-slate-500'>
          <div className='flex-1'>12312</div>
          <div className='flex-1'>
            <ListBannerCustomerReaction />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CustomerReaction
