import { memo } from 'react'
import logo from '~/assets/logo/logo-fi-ai.png'

interface IFooterProps {}

const ProductFooter = [
  {
    title: 'Health',
    key: 'health'
  },
  {
    title: 'Cosmetics',
    key: 'cosmetics'
  },
  {
    title: 'Fashion',
    key: 'fasion'
  },
  {
    title: 'Food',
    key: 'food'
  },
  {
    title: 'Digital Products',
    key: 'digital-products'
  }
]

const HelpFooter = [
  {
    title: 'Customer Service',
    key: 'customer-service'
  },
  {
    title: 'My Account',
    key: 'my-account'
  },
  {
    title: 'Legal & Privacy',
    key: 'legal-privacy'
  },
  {
    title: 'Gift Cards Terms and Conditions',
    key: 'gift-cards'
  },
  {
    title: 'Do Not Sell My Personal Information',
    key: 'do-not-sell'
  },
  {
    title: 'Our Commitment To Accessibility',
    key: 'our-commitment'
  },
  {
    title: 'Report a Scan',
    key: 'report-scan'
  },
  {
    title: 'Cookies Notice & Settings',
    key: 'cookies-notice'
  }
]

const Footer: React.FunctionComponent<IFooterProps> = memo(() => {
  return (
    <div className='gap-[24px] rounded-b-none rounded-t-[44px] bg-[#0D0D0D] p-[32px] px-[40px]'>
      <div className='flex items-center gap-2 border-b border-white border-opacity-70 pb-[20px]'>
        <div className='h-[34px] w-[34px]'>
          <img src={logo} alt='logo' className='h-[100%] w-[100%]' />
        </div>
        <div className='font-bold text-[white]'>Fi Ai</div>
      </div>
      <div className='mt-[20px] flex justify-between'>
        <div className='flex flex-col gap-2'>
          <div className='font-bold text-[white]'>Product</div>
          {ProductFooter.map((item) => (
            <div key={item.key}>
              <div className='text-[14px] font-light text-[white] opacity-70'>{item.title}</div>
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-bold text-[white]'>Help</div>
          {HelpFooter.map((item) => (
            <div className='' key={item.key}>
              <div className='text-[14px] font-light text-[white] opacity-70'>{item.title}</div>
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-bold text-[white]'>Contact Us</div>
          <div className='text-[14px] font-light text-[white] opacity-70'>+1 891 989-11-91</div>
          <div className='text-[14px] font-light text-[white] opacity-70'>help@logai.com</div>
        </div>
      </div>
    </div>
  )
})

export default Footer
