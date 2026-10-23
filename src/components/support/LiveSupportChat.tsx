import React, { useState } from 'react';
import { Send, X, Bot, User, PhoneCall, Paperclip, CheckCircle2 } from 'lucide-react';
import { ChatMessage } from '../../types';

interface LiveSupportChatProps {
  onClose: () => void;
}

export const LiveSupportChat: React.FC<LiveSupportChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Hello Arjun! I am Feedo Partner Support AI. How can I assist you today?',
      timestamp: 'Just now',
    },
    {
      id: 'm2',
      sender: 'support',
      text: 'Common quick topics: Restaurant delay, Customer unreachable, Wrong pickup code, Payment query.',
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState<string>('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'partner',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    // Auto reply simulation
    setTimeout(() => {
      let replyText = "We're checking your active order. Please remain at the store location while we contact merchant support.";

      if (currentInput.toLowerCase().includes('payment') || currentInput.toLowerCase().includes('earning')) {
        replyText = 'Your earnings for completed orders are credited immediately to your cashout balance. You can withdraw anytime via Instant Cashout.';
      } else if (currentInput.toLowerCase().includes('code') || currentInput.toLowerCase().includes('otp')) {
        replyText = 'Merchant pickup codes are provided by store managers. Customer OTPs are displayed in the customer Feedo app home screen.';
      }

      const botMsg: ChatMessage = {
        id: `m-bot-${Date.now()}`,
        sender: 'support',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg h-[600px] max-h-[90vh] bg-[#161e2e] border border-slate-700 rounded-3xl flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00E676] text-slate-950 flex items-center justify-center font-bold">
              <Bot size={20} />
            </div>
            <div>
              <div className="text-sm font-black text-white">Feedo Partner Live Support</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                <span>Online • 24/7 Priority Support</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0f172a]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'partner' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                  msg.sender === 'partner'
                    ? 'bg-gradient-to-r from-[#00C853] to-[#059669] text-slate-950 font-semibold rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2 bg-slate-900 border-t border-slate-800 flex gap-2 overflow-x-auto text-[11px]">
          <button
            onClick={() => setInput('Restaurant is taking too long to prepare order')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700"
          >
            Store Delayed
          </button>
          <button
            onClick={() => setInput('Customer is not answering my phone call')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700"
          >
            Customer Unreachable
          </button>
          <button
            onClick={() => setInput('My cashout payment is missing')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700"
          >
            Payment Query
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question or report issue..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-[#00E676] hover:brightness-110 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-md"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
