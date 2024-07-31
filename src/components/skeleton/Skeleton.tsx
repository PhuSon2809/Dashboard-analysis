import classNames from 'classnames'
import { memo } from 'react'

type SkeletonProps = { className?: string }

const Skeleton = memo(({ className }: SkeletonProps) => {
  return (
    <div role='status' className='animate-pulse'>
      <div className={classNames('w-full xs:h-[20px] sm:h-[30px] bg-gray-200 rounded-lg', className && className)} />
      <span className='sr-only'>Loading...</span>
    </div>
  )
})

export default Skeleton
