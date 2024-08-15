import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

interface TypingEffectProps {
  text?: string
  children?: React.ReactNode
  speed: number
  width?: number
  onComplete?: () => void
  hasLoading?: boolean
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, children, speed, width, onComplete, hasLoading = true }) => {
  const [displayedContent, setDisplayedContent] = useState<string>(hasLoading ? 'Start Generating...' : '')
  const [index, setIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState<boolean>(hasLoading || false)

  const content = text || childrenToText(children)

  useEffect(() => {
    if (isGenerating && hasLoading) {
      const timeout = setTimeout(() => {
        setDisplayedContent('')
        setIsGenerating(false)
      }, 1000)
      return () => clearTimeout(timeout)
    } else if (content) {
      if (index < content.length) {
        const timeout = setTimeout(() => {
          setDisplayedContent((prev) => prev + content[index])
          setIndex(index + 1)
        }, speed)
        return () => clearTimeout(timeout)
      } else if (onComplete) {
        onComplete()
      }
    }
  }, [index, content, speed, onComplete, isGenerating, hasLoading])

  return (
    <div className={`inline-block ${width ? `w-[${width}px]` : 'w-full'} text-white max-w-full break-words`}>
      {/* @ts-expect-error */}
      <ReactMarkdown remarkPlugins={[remarkBreaks]}>{displayedContent}</ReactMarkdown>
    </div>
  )
}

// Utility function to convert children to plain text
const childrenToText = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(childrenToText).join('')
  if (React.isValidElement(children)) return childrenToText(children.props.children)
  return ''
}

export default TypingEffect
