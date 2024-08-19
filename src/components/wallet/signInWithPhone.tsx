import { useState } from 'react'
import { ArrowLeftIcon } from '~/assets/icons'
import VerifyWithOTP from './verifyWithOTP'
import CopyIcon from '~/assets/icons/CopyIcon'

interface SignInWithPhoneProps {
  onBack: () => void
}

const SignInWithPhone = ({ onBack }: SignInWithPhoneProps) => {
  const [isOpenVerifyOTP, setIsOpenVerifyOTP] = useState(false)

  const handleVerifyOTP = () => {
    setIsOpenVerifyOTP(true)
  }

  return (
    <>
      {!isOpenVerifyOTP ? (
        <div className='flex h-full flex-col rounded-[10px] bg-white px-[15px] py-6'>
          <div>
            <h2 className='mb-4 text-[20px] font-semibold'>Sign In with Email/Phone</h2>
            <div className='flex justify-between gap-[20px]'>
              <p className='mb-4 text-[13px] font-normal'>Enter email or phone number</p>
              <CopyIcon />
            </div>
          </div>
          <div className='flex-grow'></div>
          <div className='mb-[30px] flex items-center gap-[10px]'>
            <button onClick={onBack} className='rounded-full border border-solid border-gray-500 p-[8px]'>
              <ArrowLeftIcon />
            </button>
            <button
              className='w-full rounded-full border border-solid bg-black p-[12px] uppercase text-white'
              onClick={handleVerifyOTP}
            >
              continue
            </button>
          </div>
        </div>
      ) : (
        <VerifyWithOTP onBack={() => setIsOpenVerifyOTP(false)} />
      )}
    </>
  )
}

export default SignInWithPhone
