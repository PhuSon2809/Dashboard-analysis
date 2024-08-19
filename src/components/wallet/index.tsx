import { useState } from 'react'
import { ArrowLeftIcon } from '~/assets/icons'
import Antenna from '~/assets/icons/antenna'
import IconArrowRight from '~/assets/icons/iconArrowRight'
import LicenseKey from '~/assets/icons/licenseKey'
import UploadQR from '../inputQr'

const Wallet = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSignInSecretKey, setIsOpenSignInSecretKey] = useState(false)
  const [isOpenSignInPhone, setIsOpenSignInPhone] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const handleSignInSecretKey = () => {
    setIsOpenSignInSecretKey(true)
    setIsOpenSignInPhone(false)
  }

  const handleSignInPhone = () => {
    setIsOpenSignInPhone(true)
    setIsOpenSignInSecretKey(false)
  }

  const handleBack = () => {
    setIsOpenSignInSecretKey(false)
    setIsOpenSignInPhone(false)
  }

  return (
    <div className='relative'>
      <button className='rounded-md bg-blue-500 px-4 py-2 text-white' onClick={toggleSidebar}>
        Open Sidebar
      </button>

      {isOpen && <div className='fixed inset-0 z-40 bg-black bg-opacity-50' onClick={closeSidebar} />}

      <div
        className={`shadow-lg fixed top-5 bottom-5 z-50 h-auto w-[341px] rounded-[10px] transform bg-[#E3E1E8] transition-transform duration-300 ease-in-out ${
          isOpen ? 'right-5 translate-x-0' : 'right-0 translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          {!isOpenSignInSecretKey && !isOpenSignInPhone && (
            <div className='px-[10px] py-6'>
              <h2 className='mb-4 text-[24px] font-bold'>Sign In</h2>
              <p className='mb-4 text-[13px] font-normal'>
                Import an existing wallet to quickly access and manage your funds for seamless shopping.
              </p>
              <div className='space-y-4'>
                <button
                  className='flex w-full items-center justify-between gap-[5px] rounded-md bg-white p-[20px]'
                  onClick={handleSignInSecretKey}
                >
                  <div className=''>
                    <LicenseKey className='w-[40px] h-[40px]' />
                  </div>
                  <span className='font-bold text-[16px]'>Sign in with Secret Key</span>
                  <span className='font-bold text-[16px]'>
                    <IconArrowRight className='w-[24px] h-[24px]' />
                  </span>
                </button>
                <button
                  className='flex w-full items-center justify-between gap-[5px] rounded-md bg-white p-[20px]'
                  onClick={handleSignInPhone}
                >
                  <div className=''>
                    <Antenna className='w-[40px] h-[40px]' />
                  </div>
                  <span className='font-bold text-[16px]'>Sign in with Email/Phone</span>
                  <span className='font-bold text-[16px]'>
                    <IconArrowRight className='w-[24px] h-[24px]' />
                  </span>
                </button>
              </div>
            </div>
          )}

          {isOpenSignInSecretKey && (
            <div className='flex flex-col h-full bg-white px-[15px] py-6 rounded-[10px]'>
              <div>
                <h2 className='mb-4 text-[20px] font-semibold'>Sign In with Secret Key</h2>
              </div>
              <div className='flex-grow'>
                <UploadQR />
              </div>
              <div className='mb-[30px] flex items-center gap-[10px]'>
                <button onClick={handleBack} className='p-[8px] rounded-full border border-gray-500 border-solid'>
                  <ArrowLeftIcon />
                </button>
                <button className='p-[12px] w-full rounded-full border bg-black border-solid text-white uppercase'>
                  confirm
                </button>
              </div>
            </div>
          )}

          {isOpenSignInPhone && (
            <div className='flex flex-col h-full bg-white px-[15px] py-6 rounded-[10px]'>
              <div>
                <h2 className='mb-4 text-[20px] font-semibold'>Sign In with Email/Phone</h2>
                <p className='mb-4 text-[13px] font-normal'>Please enter your email or phone number to sign in.</p>
                {/* Add your form or other content here */}
              </div>
              <div className='flex-grow'></div>
              <div className='mb-[30px] flex items-center gap-[10px]'>
                <button onClick={handleBack} className='p-[8px] rounded-full border border-gray-500 border-solid'>
                  <ArrowLeftIcon />
                </button>
                <button className='p-[12px] w-full rounded-full border bg-black border-solid text-white uppercase'>
                  continue
                </button>
              </div>
            </div>
          )}

          {!isOpenSignInSecretKey && !isOpenSignInPhone && (
            <div className='mt-auto mb-[20px]'>
              <p className='text-center'>
                New User?{' '}
                <a href='#' className='text-blue-500'>
                  Create a new wallet
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Wallet
