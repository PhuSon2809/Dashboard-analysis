import { memo } from 'react'
import logo from '~/assets/logo/logo-fi-ai.png'
import images from '~/assets'

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
    title: 'GDPR & CCPA Compliance Agreement',
    key: 'legal-privacy'
  },
  {
    title: 'Privacy Policy',
    key: 'gift-cards'
  },
  {
    title: 'Service Level Agreement',
    key: 'do-not-sell'
  },
  {
    title: 'Support Policy',
    key: 'our-commitment'
  },
  {
    title: 'Terms & Conditions',
    key: 'report-scan'
  },
  {
    title: 'WEEE Compliance',
    key: 'cookies-notice'
  }
]

const listIcon = [
  {
    icon: images.icon.icon_instagram,
    key: 'instagram'
  },
  {
    icon: images.icon.icon_facebook,
    key: 'facebook'
  },
  {
    icon: images.icon.icon_social,
    key: 'social'
  }
]

const Footer: React.FunctionComponent<IFooterProps> = memo(() => {
  return (
    <div className='relative z-50 gap-[24px] rounded-b-none rounded-t-[44px] bg-[#0D0D0D] p-[32px] px-[40px]'>
      <div className='flex items-center gap-2 border-b border-white border-opacity-70 pb-[20px]'>
        <div className='h-[34px] w-[34px]'>
          <img src={logo} alt='logo' className='h-[100%] w-[100%]' />
        </div>
        <div className='font-bold text-[white]'>Fi Ai</div>
      </div>
      <div className='mt-[20px] flex flex-col justify-between gap-8 md:flex-row'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='font-bold text-[white]'>Product</div>
          {ProductFooter.map((item) => (
            <div key={item.key}>
              <div className='text-[14px] font-light text-[white] opacity-70'>{item.title}</div>
            </div>
          ))}
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='font-bold text-[white]'>Help</div>
          {HelpFooter.map((item) => (
            <div className='' key={item.key}>
              <div className='text-[14px] font-light text-[white] opacity-70'>{item.title}</div>
            </div>
          ))}
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='font-bold text-[white]'>Contact Us</div>
          <div className='text-[14px] font-light text-[white] opacity-70'>+358 9 2316 1426</div>
          <div className='text-[14px] font-light text-[white] opacity-70'>contact@fi.ai</div>
        </div>
      </div>
      <div className='flex items-center justify-end gap-2 rounded-full'>
        {listIcon?.map((item) => (
          <div
            className='flex h-[40px] w-[40px] items-center justify-center rounded-full p-[10px]'
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <img src={item.icon} alt={item.key} className='h-[24px] w-[24px]' />
          </div>
        ))}
      </div>
    </div>
  )
})

export default Footer
