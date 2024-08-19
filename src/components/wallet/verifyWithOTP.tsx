import { ArrowLeftIcon } from '~/assets/icons'

interface VerifyWithOTPProps {
  onBack: () => void
}

const VerifyWithOTP = ({ onBack }: VerifyWithOTPProps) => {
  return (
    <div className='flex h-full flex-col rounded-[10px] bg-white px-[15px] py-6'>
      <div>
        <h2 className='mb-4 text-[20px] font-semibold'>Verify with OTP</h2>
        <p className='mb-4 text-[13px] font-normal'>
          Please send the code below to the email “abc@gmail.com” to confirm sign in.
        </p>
        {/* Add your form or other content here */}
      </div>
      <div className='flex-grow'></div>
      <div className='mb-[30px] flex items-center gap-[10px]'>
        <button onClick={onBack} className='rounded-full border border-solid border-gray-500 p-[8px]'>
          <ArrowLeftIcon />
        </button>
        <button className='w-full rounded-full border border-solid bg-black p-[12px] uppercase text-white'>
          go to email
        </button>
      </div>
    </div>
  )
}
export default VerifyWithOTP
