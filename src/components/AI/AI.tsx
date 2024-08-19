import '@dotlottie/player-component'
import 'animate.css'
import classNames from 'classnames'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import images from '~/assets'
import IconPaperAirplane16 from '~/assets/icons/plan'
import IconStop from '~/assets/icons/stop'
import brainImg from '~/assets/images/brain.png'
import messages, { options } from '~/components/AI/chat'
import search from '~/components/AI/search'
import TypingEffect from '~/components/AI/TypeEffect'
import { ReactionMenuChart } from '~/components/chart'
import MostUsedPaymentV2 from '~/components/chart/pay/mostUsedPaymentV2'
import PaymentReactionChartV2 from '~/components/chart/pay/paymentReactionChartV2'
import { PersonreactionCard } from '~/components/personreactionCard'
import { useAppSelector } from '~/redux/configStore'

interface IAIQuestionProps {}

interface ChatMessage {
  id: number | null
  text: string
  type: 'user' | 'ai'
  image?: string
}

const AIQuestion: React.FC<IAIQuestionProps> = () => {
  const [isLottieLoaded, setIsLottieLoaded] = useState<boolean>(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [chatTemp, setTemp] = useState<ChatMessage[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false)
  const [messageInput, setMessageInput] = useState<string>('')
  const [isAIResponding, setIsAIResponding] = useState<boolean>(false)
  const { homeReportCurrent } = useAppSelector((s) => s.report)
  const [showDialog, setShowDialog] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLottieLoaded(true)
    }, 2000)
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight + 20
    }
    if (isTypingComplete && chatHistory.length && chatHistory[chatHistory.length - 1].id !== null) {
      setShowDialog(true)
    }
  }, [chatHistory, isTypingComplete])
  const handleTypingComplete = () => {
    setIsTypingComplete(true)
    setIsAIResponding(false)
  }
  const handleAskQuestion = (id: number) => {
    const matchedOption = search(options.find((option) => option.id === id)?.text || '')
    if (matchedOption) {
      const aiMessage = messages.find((msg) => msg.id === matchedOption)
      if (aiMessage) {
        // Add user's input to chat history
        setChatHistory([
          ...chatHistory,
          { id: null, text: options.find((option) => option.id === id)?.text || '', type: 'user' }
        ])
        setChatHistory((prev) => [
          ...prev,
          ...aiMessage.message.map((m, index) => ({
            id: matchedOption,
            text: m,
            type: 'ai' as const,
            image: aiMessage.image[index]
          }))
        ])

        setTemp(() => [
          ...aiMessage.message.map((m, index) => ({
            id: matchedOption,
            text: m,
            type: 'ai' as const,
            image: aiMessage.image[index]
          }))
        ])
        setIsTypingComplete(true)
        setIsAIResponding(false)
      }
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = messageInput.trim()
    if (!text) return

    // Add user's input to chat history
    setChatHistory([...chatHistory, { id: null, text, type: 'user' }])

    // Clear the input field
    setMessageInput('')

    // Set typing state and AI responding state
    setIsTypingComplete(false)
    setIsAIResponding(true)

    const matchedOption = search(text)

    if (matchedOption) {
      const aiMessage = messages.find((msg) => msg.id === matchedOption)
      if (aiMessage) {
        setTimeout(() => {
          setChatHistory((prev) => [
            ...prev,
            ...aiMessage.message.map((m, index) => ({
              id: matchedOption,
              text: m,
              type: 'ai' as const,
              image: aiMessage.image[index]
            }))
          ])
          setTemp(() => [
            ...aiMessage.message.map((m, index) => ({
              id: matchedOption,
              text: m,
              type: 'ai' as const,
              image: aiMessage.image[index]
            }))
          ])
          setIsTypingComplete(true)
          setIsAIResponding(false)
        }, 1000)
      }
    } else {
      // If no match is found, respond with a default message
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            id: null,
            text: `You do not have admin rights, please choose 1 of 3 demo options above the chat box.`,
            type: 'ai'
          }
        ])
        setIsTypingComplete(true)
        setIsAIResponding(false)
      }, 1000)
    }
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
            <div className='grid grid-cols-3 items-center gap-5'>
              {options.map((option) => (
                <button
                  key={option.id}
                  className={`leading-1.5 flex min-h-[50px] w-full max-w-[200px] flex-col items-center justify-center rounded-[15px] border-gray-200 bg-[#898989] px-4 text-white opacity-50 hover:bg-[#494949c5] hover:opacity-100 ${
                    isAIResponding ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  // disabled={true}
                  onClick={() => handleAskQuestion(option.id)}
                >
                  <p className='py-2.5 text-sm font-normal dark:text-white'>{option.text}</p>
                </button>
              ))}
            </div>
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
            </form>
          </div>
        )}
      </div>
      <dialog id='my_modal_4' className='modal' open={showDialog}>
        <div className='modal-box relative min-w-[80vw] bg-[rgba(0,0,0,0.8)]'>
          <div className='sticky left-0 right-0 top-0 flex justify-end'>
            <button className='btn btn-circle btn-ghost btn-lg text-white' onClick={() => setShowDialog(false)}>
              ✕
            </button>
          </div>
          <div>
            <div className='dialog flex min-h-[80vh] flex-col items-center justify-center overflow-y-scroll'>
              <div className='flex h-full w-full flex-col items-center justify-center gap-20'>
                {chatTemp.map((chat, index) => {
                  switch (true) {
                    case chat.type === 'ai' && chat.id === 3:
                      return (
                        <React.Fragment key={index}>
                          {/* unhappy chart */}
                          <div className='mt-[20%] flex items-center justify-between gap-8 rounded-xl bg-white px-4 py-2 lg:h-[100px] lg:w-[650px]'>
                            <img
                              src={images.icon.unhappy_pink}
                              alt={`unhappy-icon`}
                              className={classNames('size-[60px]')}
                            />

                            <div>
                              <h4 className={classNames('text-[24px]/[36px]', 'font-semibold capitalize')}>
                                {'Unhappy'}
                              </h4>
                              <p className={classNames('text-[16px]/[24px]', 'mt-1 text-grey999/[.64]')}>
                                {homeReportCurrent?.currentReactionUnhappy}
                                persons
                              </p>
                            </div>
                          </div>
                          {/* reaction's menu chart */}
                          <ReactionMenuChart />
                          <PaymentReactionChartV2
                            listDataset={[
                              { value: 'yesterday', label: 'yesterday' },
                              { value: 'today', label: 'today' }
                            ]}
                            title={'Unhappy Customer'}
                            dataChartList={{
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              '1': 40,
                              '2': 60
                            }}
                          />
                        </React.Fragment>
                      )
                    case chat.type === 'ai' && chat.id === 1:
                      return (
                        <React.Fragment key={index}>
                          {
                            <MostUsedPaymentV2
                              title='Revenue'
                              listPayment={['Aug 12, 2024', 'Aug 11, 2024', 'Aug 10, 2024']}
                              dataset={[1000, 1050, 2000]}
                            />
                          }
                        </React.Fragment>
                      )
                    case chat.type === 'ai' && chat.id === 2:
                      return (
                        <React.Fragment key={index}>
                          <PersonreactionCard
                            person={{
                              name: 'John Doe',
                              gender: 0,
                              id: 1
                            }}
                            isActive={true}
                          >
                            <p className='flex flex-col items-center font-semibold'>
                              <span>Employee ID:</span>
                              <span>HR1257</span>
                            </p>
                            <span className='mb-14'>Late by 15 minutes</span>
                          </PersonreactionCard>
                        </React.Fragment>
                      )
                    default:
                      break
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default AIQuestion
