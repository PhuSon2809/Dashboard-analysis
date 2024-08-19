import React from 'react'
import IconArrowRight from '~/assets/icons/iconArrowRight'

interface SignInOptionProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

const SignInOption: React.FC<SignInOptionProps> = ({ icon, label, onClick }) => (
  <button className='flex w-full items-center justify-between gap-[5px] rounded-md bg-white p-[20px]' onClick={onClick}>
    <div className=''>{icon}</div>
    <span className='text-[16px] font-bold'>{label}</span>
    <span className='text-[16px] font-bold'>
      <IconArrowRight className='h-[24px] w-[24px]' />
    </span>
  </button>
)

export default SignInOption
