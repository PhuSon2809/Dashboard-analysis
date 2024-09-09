import '@dotlottie/player-component'
import 'animate.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { askAi } from '~/api'

interface ChatMessage {
  id: number | null
  text: string
  type: 'user' | 'ai'
  image?: string
}

export const useAi = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [file, setFile] = useState<File>()
  const [messageInput, setMessageInput] = useState<string>('')
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false)
  const [isAIResponding, setIsAIResponding] = useState<boolean>(false)

  const aiChat = (answer) =>
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: answer,
          type: 'ai'
        }
      ])
      setIsTypingComplete(true)
      setIsAIResponding(false)
    }, 1000)

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0]
    if (!inputFile) return
    setFile(inputFile)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    try {
      if (!file) return aiChat('Please select file before ask me anything')
      const formData = new FormData()
      formData.append('file', file)
      const res = await askAi(text, formData)
      const answer = res?.answer?.output

      console.log('data ask ai: ', res)
      aiChat(answer)
    } catch (error) {
      console.log('Error when call api ask ai: ', error)
      aiChat('Some error occurred in server. Please try again!')
    }
  }

  return {
    chatHistory,
    selectFile,
    handleSubmit,
    setMessageInput,
    messageInput,
    isAIResponding,
    isTypingComplete,
    setIsAIResponding,
    setIsTypingComplete
  }
}
