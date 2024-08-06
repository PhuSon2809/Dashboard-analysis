import classNames from 'classnames'
import { memo } from 'react'
import { Gender } from '~/@types/enums'
import { Person } from '~/@types/models'
import images from '~/assets'
import { Button } from '../button'
import { FemaleIcon, MaleIcon, PhoneIcon } from '../icons'

type PersonreactionCardProps = {
  isActive?: boolean
  person: Person
}

const PersonreactionCard = memo(({ person, isActive }: PersonreactionCardProps) => {
  return (
    <div
      className={classNames(
        isActive ? 'bg-ln-blue-green' : 'bg-grey100',
        'flex h-[533px] w-[345px] flex-col items-center justify-center rounded-2xl transition duration-300 ease-in-out'
      )}
    >
      <img
        src={
          person.gender === Gender.MALE
            ? isActive
              ? images.image.male_white
              : images.image.male_black
            : isActive
              ? images.image.female_white
              : images.image.female_black
        }
        alt='avatar'
        className='size-[132px]'
      />
      <h3
        className={classNames(
          isActive
            ? 'mt-8 text-[36px]/[46.8px] font-bold text-white'
            : 'mt-10 text-[30px]/[24px] font-medium text-blackMain',
          'px-3 text-center'
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
          <p className='mb-[94px] mt-4 text-[20px]/[30px] text-white'>Age: {person.age}</p>
          <Button
            iconLeft={<PhoneIcon />}
            className='w-[241px] rounded-2xl bg-white'
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
