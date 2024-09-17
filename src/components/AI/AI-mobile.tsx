import '@dotlottie/player-component'
import 'animate.css'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import IconPaperAirplane16 from '~/assets/icons/plan'
import IconStop from '~/assets/icons/stop'
import brainImg from '~/assets/images/brain.png'
import TypingEffect from '~/components/AI/TypeEffect'
import { Button } from '../button'
import { useAi } from './useAi'

interface IAIQuestionMobileProps {}

// interface ChatMessage {
//   id: number | null
//   text: string
//   type: 'user' | 'ai'
//   image?: string
// }

const AIQuestionMobile: React.FC<IAIQuestionMobileProps> = () => {
  const [isLottieLoaded, setIsLottieLoaded] = useState<boolean>(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    chatHistory,
    selectFile,
    handleSubmit,
    messageInput,
    setMessageInput,
    isAIResponding,
    isTypingComplete,
    setIsAIResponding,
    setIsTypingComplete
  } = useAi()

  useEffect(() => {
    setTimeout(() => {
      setIsLottieLoaded(true)
    }, 2000)
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight + 20
    }
  }, [chatHistory, isTypingComplete])
  const handleTypingComplete = () => {
    setIsTypingComplete(true)
    setIsAIResponding(false)
  }

  return (
    <>
      <div className='AI-question relative z-20 mt-20 flex flex-col items-center justify-center gap-5 px-4 text-[18px]'>
        <div className='chat-group-mobile flex w-full flex-col pt-24'>
          {isLottieLoaded && (
            <div className='chat chat-end absolute left-[0%] top-[5%] w-[75%]'>
              <div className='chat-bubble chat-bubble-primary w-full text-[15px]'>
                <TypingEffect text='What do you want to ask? ' speed={50} hasLoading={false} />
              </div>
            </div>
          )}

          <dotlottie-player
            src='https://assets-v2.lottiefiles.com/a/668de6b4-55ee-11ee-9f95-af971d099d03/FLYr1XBoWD.lottie'
            autoplay
            loop
            style={{
              width: '400px',
              // height: '400px',
              zIndex: 30,
              position: 'relative',
              top: '-150px',
              left: '100px'
            }}
          />
          {chatHistory.length > 0 && (
            <div
              ref={chatContainerRef}
              className='chat-group-bubble shadow h-min max-h-[500px] w-full overflow-y-auto rounded-lg'
            >
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`chat w-full ${classNames(chat.type === 'user' ? 'chat-end' : 'chat-start', index === chatHistory.length - 1 ? 'scale-100' : 'scale-[0.85]')} animate__animated animate__pulse`}
                >
                  <div
                    className={`chat-bubble ${!chat.image ? 'grid-cols-1' : 'has-image'} ${chat.type === 'user' ? 'bg-[#898989] text-white opacity-50 hover:opacity-100' : 'bg-[#69ACF5]'}`}
                  >
                    {chat.type === 'user' ? (
                      chat.text
                    ) : (
                      <TypingEffect
                        speed={10}
                        onComplete={index === chatHistory.length - 1 ? handleTypingComplete : undefined}
                      >
                        {chat.text}
                      </TypingEffect>
                    )}
                    {chat.type === 'ai' && isTypingComplete && chat.image && (
                      <img src={chat.image} alt='img' className='mt-5 w-full' />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {chatHistory.length === 0 && (
          <div className='left-0 mt-[-200px] max-w-[300px] overflow-hidden rounded-lg bg-white p-2 text-center ring-1'>
            <div className='text-black'>
              This demo highlights F&B store data. For other industries, contact us for details.
            </div>
          </div>
        )}
        {isLottieLoaded && (
          <div className='option-question translate-[-20%,-10%] z-30 flex w-full flex-col gap-5'>
            <form onSubmit={handleSubmit} className='relative w-full'>
              <div>
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                  <img src={brainImg} alt='search' />
                </div>
                <input
                  type='search'
                  id='search'
                  className='block w-full rounded-[50px] border border-gray-300 bg-gray-50 py-4 ps-12 text-sm text-black shadow-s-2'
                  placeholder={`What's in your mind?`}
                  onChange={(e) => setMessageInput(e.target.value)}
                  value={messageInput}
                />
                <button
                  type='submit'
                  className={`btn-ai absolute right-0 top-[50%] flex h-[40px] w-[40px] translate-y-[-50%] items-center justify-center rounded-full text-white ${
                    isAIResponding ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={isAIResponding}
                >
                  {isAIResponding ? <IconStop /> : <IconPaperAirplane16 />}
                </button>
              </div>
              <input type='file' onChange={selectFile} className='hidden' ref={fileInputRef} />
              <Button
                className='absolute top-16'
                variant='blue'
                onClick={() => {
                  fileInputRef.current?.click()
                }}
              >
                Selected File
                {/* {file ? `Selected File: ${file.name}` : 'Upload File'} */}
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default AIQuestionMobile
