import { motion } from 'framer-motion'
import React from 'react'
import { container, item, itemMain } from '~/common/loaderMotion'
import { ImageBlock } from '~/components/image/Image'

interface ILoaderProps {
  setShowEffect: (loading: boolean) => void
}

const Loader: React.FC<ILoaderProps> = ({ setShowEffect }) => {
  return (
    <motion.div className='loader max-h-screen overflow-hidden'>
      <motion.div variants={container} initial='hidden' animate='show' exit='exit' className='loader-inner'>
        <ImageBlock variants={item} id='image-left-1' className={`image-block left-[15%] top-[13%]`} />

        <ImageBlock variants={itemMain} id='image-center' className='transition-image' />
        <ImageBlock variants={item} id='image-left-2' className={`image-block 4xl:left-[23%] 4xl:top-[4%]`} />
        <ImageBlock variants={item} id='image-left-3' className={`image-block 4xl:left-[12%] 4xl:top-[28%]`} />
        <ImageBlock variants={item} id='image-left-4' className={`image-block 4xl:left-[24%] 4xl:top-[31%]`} />
        <ImageBlock variants={item} id='image-left-bottom' className={`image-block 4xl:left-[13%] 4xl:top-[53%]`} />
        <ImageBlock variants={item} id='image-right-1' className={`image-block top-[-2%] 4xl:right-[17%]`} />
        <ImageBlock variants={item} id='image-right-2' className={`image-block top-[39%] 4xl:right-[25%]`} />
        <ImageBlock variants={item} id='image-right-3' className={`image-block top-[39%] 4xl:right-[13%]`} />
        <motion.div
          variants={item}
          className={`image-block top-[58%] w-[400px] 4xl:right-[13%]`}
          onAnimationComplete={() => setShowEffect(false)}
        >
          <motion.img layoutId='main-image-1' src={import.meta.env.VITE_PUBLIC_URL + `/${'image-right-bottom'}.webp`} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Loader
