import React from 'react'
import { ArrowLeftIcon } from '~/assets/icons'
import UploadQR from '../inputQr'

interface SignInWithSecretKeyProps {
  onBack: () => void
}

const SignInWithSecretKey: React.FC<SignInWithSecretKeyProps> = ({ onBack }) => (
  <div className='flex h-full flex-col rounded-[10px] bg-white px-[15px] py-6'>
    <div>
      <h2 className='mb-4 text-[20px] font-semibold'>Sign In with Secret Key</h2>
    </div>
    <div className='flex-grow'>
      <UploadQR />
    </div>
    <div className='mb-[30px] flex items-center gap-[10px]'>
      <button onClick={onBack} className='rounded-full border border-solid border-gray-500 p-[8px]'>
        <ArrowLeftIcon />
      </button>
      <button className='w-full rounded-full border border-solid bg-black p-[12px] uppercase text-white'>
        confirm
      </button>
    </div>
  </div>
)

export default SignInWithSecretKey
