'use client'

import { useState, useRef, useEffect } from 'react'

export default function AIChatbot({ theme = 'dark' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi there! 👋 I'm Shaaz's AI Assistant. Ask me anything about his experience, projects, technical skills, or certifications!"
    }
  ])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = async (textToSend) => {
    const query = textToSend || input.trim()
    if (!query || loading) return

    const userMessage = { role: 'user', content: query }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    if (!textToSend) setInput('')
    setLoading(true)

    try {
      // Send conversation history to API
      const apiMessages = updatedMessages.map(m => ({
        role: m.role,
        content: m.content
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      })

      const data = await res.json()

      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: "Sorry, I ran into an issue connecting to the AI model. Feel free to contact Shaaz directly at shaazney123@gmail.com!" }
        ])
      }
    } catch (err) {
      console.error(err)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Network error. Please try again or reach Shaaz via email: shaazney123@gmail.com" }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickPrompts = [
    "What are Shaaz's core skills?",
    "Tell me about his internships",
    "What projects has he built?",
    "How can I contact Shaaz?"
  ]

  const isDark = theme === 'dark'

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 font-sans">
      {/* Floating Toggle Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            isDark
              ? 'bg-[#0f1709] border border-[#C8FF5C]/40 text-[#C8FF5C] shadow-[#C8FF5C]/20 hover:border-[#C8FF5C]'
              : 'bg-white border border-[#8ec438]/50 text-[#5f8420] shadow-gray-300 hover:border-[#8ec438]'
          }`}
          aria-label="Open AI Assistant Chat"
        >
          {/* Pulsating Online Status Dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8FF5C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C8FF5C] ring-2 ring-black"></span>
          </span>

          {/* Messenger Icon */}
          <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Popover Window */}
      {isOpen && (
        <div className={`w-[90vw] sm:w-[380px] h-[520px] max-h-[82vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border transition-all duration-300 ${
          isDark
            ? 'bg-[#060c03]/95 border-[#C8FF5C]/25 shadow-black/80 backdrop-blur-xl text-white'
            : 'bg-white/95 border-gray-200 shadow-xl backdrop-blur-xl text-gray-900'
        }`}>
          {/* Header */}
          <div className={`px-4 py-3.5 flex items-center justify-between border-b ${
            isDark ? 'border-white/10 bg-white/5' : 'border-gray-150 bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#C8FF5C]/20 border border-[#C8FF5C]/40 flex items-center justify-center text-[#C8FF5C] text-sm">
                  ⚡
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#C8FF5C] ring-2 ring-black"></span>
              </div>
              <div>
                <h4 className="text-sm font-black tracking-tight leading-tight">Shaaz AI Assistant</h4>
                <p className={`text-[10px] font-semibold ${isDark ? 'text-white/45' : 'text-gray-500'}`}>Powered by Groq LLM</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className={`p-1.5 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'hover:bg-gray-200 text-gray-500 hover:text-gray-900'
              }`}
              aria-label="Close Chat"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Thread Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                  m.role === 'user'
                    ? isDark
                      ? 'bg-[#C8FF5C] text-black font-semibold rounded-br-xs shadow-md'
                      : 'bg-[#8ec438] text-white font-semibold rounded-br-xs shadow-sm'
                    : isDark
                      ? 'bg-white/10 border border-white/10 text-white/90 rounded-bl-xs'
                      : 'bg-gray-100 border border-gray-200 text-gray-800 rounded-bl-xs'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start">
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-xs flex items-center gap-1.5 ${
                  isDark ? 'bg-white/10 text-white/60' : 'bg-gray-100 text-gray-500'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:0.4s]"></span>
                  <span className="ml-1 text-[11px] font-medium">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips (Shown if messages count <= 2) */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-full border transition-all duration-200 text-left ${
                    isDark
                      ? 'bg-white/5 border-white/15 text-white/70 hover:bg-[#C8FF5C]/15 hover:border-[#C8FF5C]/40 hover:text-[#C8FF5C]'
                      : 'bg-gray-50 border-gray-200 text-gray-650 hover:bg-[#8ec438]/10 hover:border-[#8ec438] hover:text-[#5f8420]'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className={`p-3 border-t flex items-center gap-2 ${
            isDark ? 'border-white/10 bg-black/40' : 'border-gray-150 bg-gray-50'
          }`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Shaaz's work..."
              disabled={loading}
              className={`flex-1 text-xs px-3.5 py-2.5 rounded-xl border outline-none transition-colors ${
                isDark
                  ? 'bg-white/5 border-white/15 text-white placeholder-white/40 focus:border-[#C8FF5C]/60'
                  : 'bg-white border-gray-250 text-gray-900 placeholder-gray-400 focus:border-[#8ec438]'
              }`}
            />

            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                input.trim() && !loading
                  ? isDark
                    ? 'bg-[#C8FF5C] text-black hover:scale-105 shadow-md shadow-[#C8FF5C]/20'
                    : 'bg-[#8ec438] text-white hover:scale-105 shadow-md shadow-gray-300'
                  : isDark
                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Send Message"
            >
              <svg className="w-4 h-4 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
