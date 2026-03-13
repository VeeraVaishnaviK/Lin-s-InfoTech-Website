'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import api from '@/lib/api';
import { ENDPOINTS } from '@/lib/endpoints';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

const GlobalChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', content: 'Hi! I am the Lin\'s InfoTech assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const chatRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => {
        if (!isOpen) {
            setIsOpen(true);
            gsap.fromTo(chatRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
            );
        } else {
            gsap.to(chatRef.current, {
                y: 50, opacity: 0, scale: 0.9, duration: 0.3, ease: 'power3.in',
                onComplete: () => setIsOpen(false)
            });
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const response = await api.post(ENDPOINTS.AI_CHATBOT, { message: userMsg });
            setMessages(prev => [...prev, { role: 'bot', content: response.data.reply || response.data.message || 'I processed your request.' }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I am having trouble connecting to my brain right now.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            {/* Floating Button */}
            <button
                onClick={toggleChat}
                className="w-14 h-14 bg-[#E3000F] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(227,0,15,0.4)] transition-transform hover:scale-110 active:scale-95 z-10 relative"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
                    </span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatRef}
                    className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-[#111111] border border-[#1F1F1F] rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
                >
                    {/* Header */}
                    <div className="bg-[#E3000F] p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot size={18} className="text-white" />
                            </div>
                            <span className="text-white font-bold tracking-tight">AI Assistant</span>
                        </div>
                        <button onClick={toggleChat} className="text-white/80 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#1F1F1F]">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-[#E3000F] text-white rounded-tr-none'
                                            : 'bg-[#1F1F1F] text-white/90 rounded-tl-none'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-[#1F1F1F] text-white/90 p-3 rounded-2xl rounded-tl-none text-sm flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-[#1F1F1F] bg-[#0A0A0A]">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="w-full bg-[#111111] border border-[#1F1F1F] rounded-xl py-3 pl-4 pr-12 text-white text-sm focus:outline-none focus:border-[#E3000F] transition-colors"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 text-[#E3000F] disabled:text-[#888] transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <div className="mt-2 text-[10px] text-center text-white/30 tracking-widest uppercase">
                            Powered by Lin&apos;s AI Engine
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalChatbot;
