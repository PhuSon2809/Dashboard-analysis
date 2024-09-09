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

interface IAIQuestionProps {}

const AIQuestion: React.FC<IAIQuestionProps> = () => {
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
      <div className='AI-question relative z-20 h-screen'>
        <div className='. chat chat-end absolute left-0 top-[18%] max-w-[330px]'>
          <div className='chat-bubble bg-white text-black'>
            This demo highlights F&B store data. For other industries, contact us for details.
          </div>
        </div>
        <dotlottie-player
          src='https://assets-v2.lottiefiles.com/a/668de6b4-55ee-11ee-9f95-af971d099d03/FLYr1XBoWD.lottie'
          autoplay
          loop
          style={{
            width: '600px',
            height: '600px',
            position: 'absolute',
            top: '20%',
            left: '5%',
            zIndex: 30,
            transform: 'translateY(-20%)'
          }}
        />
        <div className='chat-group'>
          {isLottieLoaded && !chatHistory.length && (
            <div className='chat chat-start'>
              <div className='chat-bubble chat-bubble-primary'>
                <TypingEffect text='What do you want to ask? ' speed={50} hasLoading={false} />
              </div>
            </div>
          )}
          <div
            ref={chatContainerRef}
            className='chat-group-bubble shadow mt-5 max-h-[350px] overflow-y-auto rounded-lg p-4 py-16 2xl:max-h-[500px] 2xl:w-[850px]'
          >
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`chat ${classNames(chat.type === 'user' ? 'chat-end' : 'chat-start', index === chatHistory.length - 1 ? 'scale-100' : 'scale-[0.85]')} animate__animated animate__pulse`}
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
        </div>
        {isLottieLoaded && (
          <div className='option-question translate-[-20%,-10%] absolute bottom-[20%] right-[10%] z-30 flex w-[600px] flex-col gap-5'>
            <form onSubmit={handleSubmit}>
              <div className='absolute w-full'>
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                  <img src={brainImg} alt='search' />
                </div>
                <input
                  type='search'
                  id='search'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-12 text-sm text-black shadow-s-2'
                  placeholder={`What's in your mind?`}
                  onChange={(e) => setMessageInput(e.target.value)}
                  value={messageInput}
                />

                <button
                  type='submit'
                  className={`btn-ai absolute right-2 top-[50%] flex h-[40px] w-[40px] translate-y-[-50%] items-center justify-center rounded-full text-white ${
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

export default AIQuestion
