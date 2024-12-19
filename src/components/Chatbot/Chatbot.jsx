import React, { useState, useEffect, useRef, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, Paper } from '@mui/material'
import { ThemeContext } from '../ThemeContext'

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", isUser: false }
  ])
  const [input, setInput] = useState('')
  const scrollAreaRef = useRef(null)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, isUser: true }])
      setInput('')
      setTimeout(() => {
        const botResponse = generateResponse(input)
        setMessages(prev => [...prev, { text: botResponse, isUser: false }])
      }, 1000)
    }
  }

  const generateResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase()
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! How can I help you today?"
    } else if (lowerInput.includes('how are you')) {
      return "I'm just a computer program, but I'm functioning well. How can I assist you?"
    } else if (lowerInput.includes('bye') || lowerInput.includes('goodbye')) {
      return "Goodbye! If you need any more help, feel free to ask."
    } else if (lowerInput.includes('thank')) {
      return "You're welcome! Is there anything else I can help with?"
    } else if (lowerInput.includes('weather')) {
      return "I'm sorry, I don't have access to real-time weather information. You might want to check a weather website or app for that."
    } else if (lowerInput.includes('name')) {
      return "I'm an AI chatbot assistant. I don't have a personal name, but you can call me Chatbot if you like!"
    } else if (lowerInput.includes('help')) {
      return "I'm here to help! Feel free to ask me questions about our services, products, or any general inquiries you might have."
    } else {
      return "I'm not sure I understand. Could you please rephrase your question or ask me something else?"
    }
  }

  return (
    <Paper className={`fixed bottom-32 right-8 w-80 h-96 shadow-xl flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-bold">Chatbot</h2>
        <Button variant="outlined" size="small" onClick={onClose} className={`h-8 w-8 p-0 ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>
          <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
        </Button>
      </div>

      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${message.isUser ? (theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900')}`}
              >
                {message.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            fullWidth
            className={`flex-grow ${theme === 'dark' ? 'bg-white text-gray-900 placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-500'}`}
          />
          <Button type="submit" size="small" variant="contained" color="primary" className={theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}>
            <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </Paper>
  )
}

export default Chatbot
