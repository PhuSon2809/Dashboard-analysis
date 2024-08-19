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

interface IAIQuestionMobileProps {}

interface ChatMessage {
  id: number | null
  text: string
  type: 'user' | 'ai'
  image?: string
}

const AIQuestionMobile: React.FC<IAIQuestionMobileProps> = () => {
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
      <div className='AI-question relative z-20 flex flex-col gap-5 items-center justify-center mt-20 text-[18px] px-4'>
        <div className='chat-group-mobile w-full flex flex-col pt-24'>
          {isLottieLoaded && !chatHistory.length && (
            <div className='chat chat-end absolute top-[5%] left-[0%] w-[75%]'>
              <div className='chat-bubble chat-bubble-primary w-full text-[15px]'>
                <TypingEffect text='What do you want to ask? ' speed={50} hasLoading={false} />
              </div>
            </div>
          )}
          {chatHistory.length > 0 && (
            <div
              ref={chatContainerRef}
              className='chat-group-bubble overflow-y-auto w-full  rounded-lg shadow max-h-[500px]'
            >
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`w-full chat ${classNames(chat.type === 'user' ? 'chat-end' : 'chat-start', index === chatHistory.length - 1 ? 'scale-100 ' : 'scale-[0.85]')}   animate__animated animate__pulse`}
                >
                  <div
                    className={`chat-bubble ${!chat.image ? 'grid-cols-1' : 'has-image'} ${chat.type === 'user' ? 'bg-[#898989]  opacity-50 hover:opacity-100 text-white' : 'bg-[#69ACF5]'}`}
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
                      <img src={chat.image} alt='img' className='w-full mt-5' />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {chatHistory.length === 0 && (
          <dotlottie-player
            src='https://assets-v2.lottiefiles.com/a/668de6b4-55ee-11ee-9f95-af971d099d03/FLYr1XBoWD.lottie'
            autoplay
            loop
            style={{
              width: '400px',
              height: '400px',
              zIndex: 30,
              position: 'relative',
              top: '-150px',
              left: '100px'
            }}
          />
        )}

        {chatHistory.length === 0 && (
          <div className=' bg-white text-center max-w-[300px] left-0 ring-1 rounded-lg overflow-hidden p-2 mt-[-200px]'>
            <div className=' text-black '>
              This demo highlights F&B store data. For other industries, contact us for details.
            </div>
          </div>
        )}
        {isLottieLoaded && (
          <div className=' option-question w-full translate-[-20%,-10%] z-30  flex flex-col gap-5 '>
            <div className='flex overflow-x-auto gap-5 items-center'>
              {options.map((option) => (
                <button
                  key={option.id}
                  className={`flex flex-col flex-shrink-0  items-center justify-center w-full max-w-[200px] min-h-[50px] leading-1.5 px-4 border-gray-200 text-white bg-[#898989] opacity-50 hover:opacity-100 hover:bg-[#494949c5] rounded-[15px] ${
                    isAIResponding ? 'opacity-50' : ''
                  }`}
                  // disabled={true}
                  onClick={() => handleAskQuestion(option.id)}
                >
                  <p className='text-sm font-normal py-2.5 dark:text-white'>{option.text}</p>
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className='relative w-full '>
              <div>
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                  <img src={brainImg} alt='search' />
                </div>
                <input
                  type='search'
                  id='search'
                  className='block w-full rounded-[50px] border text-black border-gray-300 bg-gray-50 py-4  ps-12 text-sm shadow-s-2'
                  placeholder={`What's in your mind?`}
                  onChange={(e) => setMessageInput(e.target.value)}
                  value={messageInput}
                />
                <button
                  type='submit'
                  className={`absolute top-[50%] translate-y-[-50%] right-0 rounded-full w-[40px] h-[40px] btn-ai text-white flex items-center justify-center ${
                    isAIResponding ? 'opacity-50 cursor-not-allowed' : ''
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
      <dialog id='my_modal_4' className='modal ' open={showDialog}>
        <div className='modal-box relative bg-[rgba(0,0,0,0.8)] min-w-[80vw]  '>
          <div className='sticky top-0 right-0 left-0 flex justify-end'>
            <button className=' btn btn-lg  text-white btn-circle btn-ghost  ' onClick={() => setShowDialog(false)}>
              ✕
            </button>
          </div>
          <div>
            <div className='dialog overflow-y-scroll  min-h-[80vh] flex flex-col items-center justify-center'>
              <div className='flex flex-col gap-20 items-center justify-center w-full h-full'>
                {chatTemp.map((chat, index) => {
                  switch (true) {
                    case chat.type === 'ai' && chat.id === 3:
                      return (
                        <React.Fragment key={index}>
                          {/* unhappy chart */}
                          <div className='flex  mt-[20%] items-center justify-between gap-8 bg-white px-4 py-2 rounded-xl lg:h-[100px] lg:w-[650px]'>
                            <img
                              src={images.icon.unhappy_pink}
                              alt={`unhappy-icon`}
                              className={classNames('size-[60px] ')}
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

export default AIQuestionMobile
