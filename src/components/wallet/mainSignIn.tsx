import React from 'react'
import LicenseKey from '~/assets/icons/licenseKey'
import Antenna from '~/assets/icons/antenna'
import SignInOption from './buttonCustom'

interface SignInOptionsProps {
  onSecretKey: () => void
  onPhone: () => void
}

const SignInOptions: React.FC<SignInOptionsProps> = ({ onSecretKey, onPhone }) => (
  <div className='px-[10px] py-6'>
    <h2 className='mb-4 text-[24px] font-bold'>Sign In</h2>
    <p className='mb-4 text-[13px] font-normal'>
      Import an existing wallet to quickly access and manage your funds for seamless shopping.
    </p>
    <div className='space-y-4'>
      <SignInOption
        icon={<LicenseKey className='h-[40px] w-[40px]' />}
        label='Sign in with Secret Key'
        onClick={onSecretKey}
      />
      <SignInOption
        icon={<Antenna className='h-[40px] w-[40px]' />}
        label='Sign in with Email/Phone'
        onClick={onPhone}
      />
    </div>
  </div>
)

export default SignInOptions
