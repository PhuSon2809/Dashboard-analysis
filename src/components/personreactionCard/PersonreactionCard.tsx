import classNames from 'classnames'
import { memo } from 'react'
import { Gender } from '~/@types/enums'
import { Person } from '~/@types/models'
import images from '~/assets'
import { FemaleIcon, MaleIcon, PhoneIcon } from '../icons'
import { Button } from '../button'

type PersonreactionCardProps = {
  isActive?: boolean
  person: Person
}

const PersonreactionCard = memo(({ person, isActive }: PersonreactionCardProps) => {
  return (
    <div
      className={classNames(
        isActive ? ' bg-ln-blue-green' : 'bg-grey100',
        'rounded-2xl w-[345px] h-[533px] flex flex-col items-center justify-center transition duration-300 ease-in-out'
      )}
    >
      <img
        src={
          person.gender === Gender.MALE
            ? isActive
              ? images.image.male_white
              : images.image.male_black
            : images.image.female_black
        }
        alt='avatar'
        className='size-[132px]'
      />
      <h3
        className={classNames(
          isActive
            ? 'text-[36px]/[46.8px] text-white font-bold mt-8'
            : 'text-[30px]/[24px] text-blackMain font-medium mt-10'
        )}
      >
        {person.name}
      </h3>
      <div className={classNames('flex items-center gap-1', isActive ? '' : 'mt-4')}>
        {!isActive &&
          (person.gender === Gender.MALE ? <MaleIcon className='size-7' /> : <FemaleIcon className='size-7' />)}
        <p className={classNames(isActive ? 'text-[20px]/[30px] text-white' : 'text-[26px]/[30px] text-grey999')}>
          {person.gender === Gender.MALE ? 'Male' : 'Female'}
        </p>
      </div>

      {isActive && (
        <>
          <p className='text-[20px]/[30px] text-white mt-4 mb-[94px]'>Age: {person.age}</p>
          <Button
            iconLeft={<PhoneIcon />}
            className='w-[241px] bg-white rounded-2xl'
            classNameText='flex item-center justify-center capitalize text-blackMain'
          >
            Talk Action
          </Button>
        </>
      )}
    </div>
  )
})

export default PersonreactionCard
