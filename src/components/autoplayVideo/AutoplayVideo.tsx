import React, { useEffect, useRef } from 'react'

interface IAutoPlayVideoProps {
  source: string
  defaultImage: string
  isHasControls?: boolean
}

const AutoPlayVideo: React.FunctionComponent<IAutoPlayVideoProps> = ({ source, defaultImage, isHasControls }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.error('error in autoplay video:', error)
        })
      }
    }

    if (source) {
      playVideo()
    }

    document.addEventListener('click', playVideo)

    return () => {
      document.removeEventListener('click', playVideo)
    }
  }, [source])

  return (
    <>
      {source ? (
        <video ref={videoRef} className='w-full h-full' src={source} muted playsInline loop controls={isHasControls} />
      ) : (
        <img src={defaultImage} className='w-full h-full max-h-[500px]' alt='Default' />
      )}
    </>
  )
}

export default AutoPlayVideo
