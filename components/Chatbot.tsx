'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'assistant',
    content:
      'Halo! Saya asisten virtual Dewa. Ada yang bisa saya bantu tentang portofolio atau pengalaman Dewa?',
  },
]
const CHAT_STORAGE_KEY = 'portfolio-chat-history'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(CHAT_STORAGE_KEY)
      if (!stored) return

      const parsed = JSON.parse(stored) as unknown
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (message) =>
            typeof message === 'object' &&
            message !== null &&
            ('role' in message) &&
            (message.role === 'user' || message.role === 'assistant') &&
            ('content' in message) &&
            typeof message.content === 'string',
        )
      ) {
        setMessages(parsed.slice(-20) as Message[])
      }
    } catch {
      window.sessionStorage.removeItem(CHAT_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    window.sessionStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify(messages.slice(-20)),
    )
  }, [messages])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }].slice(-20).map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json() as {
        data?: { message?: string }
        error?: { message?: string }
      };

      if (response.ok && data.data?.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.data!.message! }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.error?.message || 'Terjadi kesalahan.',
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Maaf, terjadi kesalahan pada jaringan.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-96 rounded-2xl glass border border-white/10 shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: '80vh' }}
            role="dialog"
            aria-modal="false"
            aria-labelledby="chatbot-title"
          >
            {/* Header */}
            <div className="p-4 bg-violet/20 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet/30 flex items-center justify-center border border-violet/50">
                  <Bot size={18} className="text-violet-light" />
                </div>
                <div>
                  <h3 id="chatbot-title" className="font-display font-semibold text-text-main text-sm">Dewa&apos;s Assistant</h3>
                  <p className="text-xs text-text-muted">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Tutup asisten virtual"
                className="text-text-muted hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-violet/20 flex-shrink-0 flex items-center justify-center mt-1">
                      <Bot size={12} className="text-violet-light" />
                    </div>
                  )}
                  <div 
                    className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-violet text-white rounded-tr-sm' 
                        : 'bg-white/5 text-text-main border border-white/5 rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-6 h-6 rounded-full bg-violet/20 flex-shrink-0 flex items-center justify-center mt-1">
                    <Bot size={12} className="text-violet-light" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex items-center gap-1">
                    <motion.div className="w-1.5 h-1.5 bg-violet-light rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-violet-light rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-violet-light rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-dark/50">
              <form
                className="relative flex items-center"
                onSubmit={(event) => {
                  event.preventDefault()
                  void handleSend()
                }}
              >
                <label htmlFor="chatbot-message" className="sr-only">Pesan untuk asisten virtual</label>
                <input
                  id="chatbot-message"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik pesan..."
                  maxLength={2000}
                  autoComplete="off"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-12 text-sm text-white placeholder-text-muted focus:outline-none focus:border-violet/50 focus:ring-1 focus:ring-violet/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Kirim pesan"
                  className="absolute right-2 p-1.5 text-violet hover:text-violet-light disabled:text-text-muted disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Tutup asisten virtual' : 'Buka asisten virtual'}
        aria-expanded={isOpen}
        className="w-14 h-14 rounded-full bg-violet text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center hover:bg-violet-light transition-colors relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulsing ring effect when closed */}
        {!isOpen && (
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-violet"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
}
