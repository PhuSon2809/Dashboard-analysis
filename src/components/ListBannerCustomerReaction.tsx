import React from 'react'

const ItemBannerCustomerReaction = () => {
  return (
    <React.Fragment>
      <div className='h-[33%] w-full bg-slate-100'>
        <div className='h-full bg-slate-900'></div>
      </div>
    </React.Fragment>
  )
}

const ListBannerCustomerReaction = () => {
  return (
    <React.Fragment>
      <div className='flex h-full w-full flex-col gap-5 p-5'>
        <ItemBannerCustomerReaction />
        <ItemBannerCustomerReaction />
        <ItemBannerCustomerReaction />
      </div>
    </React.Fragment>
  )
}

export default React.memo(ListBannerCustomerReaction)
