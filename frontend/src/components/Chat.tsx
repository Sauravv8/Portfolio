import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Message } from '../types'
import { sendMessage } from '../api/chatApi'

const SUGGESTIONS = [
    'What skills does Saurav have?',
    'Tell me about his AI projects',
    'What is his work experience?',
    'How can I contact Saurav?',
]

function TypingIndicator() {
    return (
        <div className="flex items-end gap-3 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-primary-700 border border-primary-500/50 flex items-center justify-center text-xs font-bold text-white shrink-0">
                AI
            </div>
            <div className="glass rounded-2xl rounded-bl-sm px-5 py-4 border border-white/10">
                <div className="flex gap-1.5 items-center h-4">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary-400 dot-bounce"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

function MessageBubble({ msg }: { msg: Message }) {
    const isUser = msg.role === 'user'
    const timeStr = msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    if (isUser) {
        return (
            <div className="flex justify-end gap-3 message-appear">
                <div className="max-w-[80%] sm:max-w-[70%]">
                    <div className="bg-primary-600 rounded-2xl rounded-br-sm px-5 py-3.5 shadow-lg shadow-primary-600/20">
                        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                    <p className="text-white/30 text-xs mt-1 text-right pr-1">{timeStr}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-1">
                    U
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-end gap-3 message-appear">
            <div className="w-7 h-7 rounded-full bg-primary-700 border border-primary-500/50 flex items-center justify-center text-xs font-bold text-white shrink-0">
                AI
            </div>
            <div className="max-w-[80%] sm:max-w-[70%]">
                <div className="glass rounded-2xl rounded-bl-sm px-5 py-3.5 border border-white/10">
                    <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                </div>
                <p className="text-white/30 text-xs mt-1 pl-1">{timeStr}</p>
            </div>
        </div>
    )
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: uuidv4(),
            role: 'assistant',
            content:
                "👋 Hi! I'm Saurav's AI assistant. I can answer questions about his skills, projects, experience, and more — all from his resume. What would you like to know?",
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading])

    const handleSend = async (text?: string) => {
        const messageText = (text ?? input).trim()
        if (!messageText || isLoading) return

        setInput('')
        setError(null)

        const userMsg: Message = {
            id: uuidv4(),
            role: 'user',
            content: messageText,
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMsg])
        setIsLoading(true)

        try {
            const { reply } = await sendMessage(messageText)
            const aiMsg: Message = {
                id: uuidv4(),
                role: 'assistant',
                content: reply,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiMsg])
        } catch (err: unknown) {
            const detail =
                err &&
                    typeof err === 'object' &&
                    'response' in err &&
                    err.response &&
                    typeof err.response === 'object' &&
                    'data' in err.response &&
                    err.response.data &&
                    typeof err.response.data === 'object' &&
                    'detail' in err.response.data
                    ? String((err.response.data as { detail: string }).detail)
                    : 'Failed to get a response. Please check the backend is running.'
            setError(detail)
        } finally {
            setIsLoading(false)
            inputRef.current?.focus()
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleClear = () => {
        setMessages([
            {
                id: uuidv4(),
                role: 'assistant',
                content: "Chat cleared! Ask me anything about Saurav's resume and projects.",
                timestamp: new Date(),
            },
        ])
        setError(null)
    }

    return (
        <section id="chat" className="py-24 lg:py-32 relative">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(109,40,217,0.08) 0%, transparent 70%)',
                }}
            />

            <div className="section-container">
                <div className="text-center mb-12">
                    <p className="section-label">AI POWERED</p>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                        Chat with my{' '}
                        <span className="gradient-text">Resume AI</span>
                    </h2>
                    <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
                        Ask me anything about Saurav's skills, projects, experience, or how to get in touch.
                        Powered by Mistral-7B via OpenRouter.
                    </p>
                </div>

                {/* Chat container */}
                <div className="max-w-3xl mx-auto">
                    <div
                        className="glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40"
                        style={{ minHeight: '520px', display: 'flex', flexDirection: 'column' }}
                    >
                        {/* Chat header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-sm font-bold text-white">
                                        AI
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#141418]" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Saurav's Resume AI</p>
                                    <p className="text-emerald-400 text-xs">● Online • Mistral-7B</p>
                                </div>
                            </div>
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Clear chat
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5" style={{ maxHeight: '400px' }}>
                            {messages.map((msg) => (
                                <MessageBubble key={msg.id} msg={msg} />
                            ))}

                            {isLoading && <TypingIndicator />}

                            {/* Error */}
                            {error && (
                                <div className="flex items-start gap-3 animate-fade-in">
                                    <div className="flex-1 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                        ⚠️ {error}
                                    </div>
                                </div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Suggestions */}
                        {messages.length <= 1 && (
                            <div className="px-5 pb-3 flex flex-wrap gap-2">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleSend(s)}
                                        disabled={isLoading}
                                        className="text-xs px-3 py-1.5 rounded-full glass border border-primary-500/30 text-primary-300 hover:bg-primary-600/20 hover:text-white transition-all duration-200 disabled:opacity-40"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input area */}
                        <div className="px-4 pb-4">
                            <div className="flex items-end gap-3 glass rounded-2xl border border-white/10 px-4 py-3 focus-within:border-primary-500/50 transition-colors">
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isLoading}
                                    placeholder="Ask about Saurav's skills, projects… (Enter to send)"
                                    rows={1}
                                    className="flex-1 bg-transparent text-white/90 placeholder-white/30 text-sm resize-none outline-none leading-relaxed max-h-28 overflow-y-auto disabled:opacity-50"
                                    style={{ minHeight: '24px' }}
                                    onInput={(e) => {
                                        const el = e.currentTarget
                                        el.style.height = 'auto'
                                        el.style.height = `${Math.min(el.scrollHeight, 112)}px`
                                    }}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isLoading}
                                    className="shrink-0 w-9 h-9 rounded-xl bg-primary-600 hover:bg-primary-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:shadow-md hover:shadow-primary-600/40 active:scale-95"
                                    aria-label="Send message"
                                >
                                    {isLoading ? (
                                        <svg className="w-4 h-4 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <p className="text-center text-white/20 text-xs mt-2">
                                Shift+Enter for newline • Answers based strictly on resume data
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
