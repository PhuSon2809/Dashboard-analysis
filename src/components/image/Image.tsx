import { motion, Variants } from 'framer-motion'
import React from 'react'

interface IImageProps {
  src: string
  fallback: string
  type?: string
  alt: string
}
interface IImageBlockProps {
  posX?: number
  posY?: number
  variants: Variants
  id: string
  className?: string
}

const Image: React.FC<IImageProps> = ({ src, fallback, type = 'image/webp', alt }) => {
  return (
    <picture>
      <source srcSet={src} type={type} />
      <img src={fallback} alt={alt} />
    </picture>
  )
}

const ImageBlock: React.FC<IImageBlockProps> = ({ posX, posY, variants, id, className }) => {
  return (
    <motion.div
      variants={variants}
      className={className}
      style={{
        top: `${posY}vh`,
        left: `${posX}vw `
      }}
    >
      <Image
        src={import.meta.env.VITE_PUBLIC_URL + `/${id}.webp`}
        fallback={import.meta.env.VITE_PUBLIC_URL + `/${id}.png`}
        alt={id}
      />
    </motion.div>
  )
}

export { Image, ImageBlock }
