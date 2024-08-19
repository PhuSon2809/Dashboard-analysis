import React, { useState } from 'react'
import SignInOptions from './mainSignIn'
import SignInWithPhone from './signInWithPhone'
import SignInWithSecretKey from './signInWithSecretKey'

const Wallet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSignInSecretKey, setIsOpenSignInSecretKey] = useState(false)
  const [isOpenSignInPhone, setIsOpenSignInPhone] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)
  const closeSidebar = () => setIsOpen(false)
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
        className={`shadow-lg fixed bottom-5 top-5 z-50 h-auto w-[341px] transform rounded-[10px] bg-[#E3E1E8] transition-transform duration-300 ease-in-out ${
          isOpen ? 'right-5 translate-x-0' : 'right-0 translate-x-full'
        }`}
      >
        <div className='flex h-full flex-col'>
          {!isOpenSignInSecretKey && !isOpenSignInPhone && (
            <SignInOptions onSecretKey={handleSignInSecretKey} onPhone={handleSignInPhone} />
          )}

          {isOpenSignInSecretKey && <SignInWithSecretKey onBack={handleBack} />}

          {isOpenSignInPhone && <SignInWithPhone onBack={handleBack} />}

          {!isOpenSignInSecretKey && !isOpenSignInPhone && (
            <div className='mb-[20px] mt-auto'>
              <p className='text-center'>
                New User?{' '}
                <a href='#' className='font-bold text-black underline'>
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
