'use client';

import { useStore } from '@/app/store/useStore';
import { motion } from 'framer-motion';
import { Lock, Send, Terminal } from 'lucide-react';
import { useState } from 'react';

export default function TerminalInteraction() {
  const { setTerminalMessage, setStep } = useStore();
  const [input, setInput] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    if (!input.trim()) return;
    setTerminalMessage(input);
    setIsLocked(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center">
      
      {!isLocked ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="w-full bg-black/80 border border-gray-700 p-6 rounded-lg shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center gap-2 text-gray-400 mb-4 border-b border-gray-800 pb-2">
            <Terminal size={18} />
            <span className="text-xs uppercase tracking-widest">Secure Terminal Relay</span>
          </div>
          
          <label className="block text-primary font-display text-xl mb-4">
            TYPE A MESSAGE FOR YOUR 2026 SELF
          </label>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent text-white font-mono text-lg outline-none resize-none h-32 focus:border-l-2 focus:border-primary pl-2 transition-all"
            placeholder="Write something only you will understand..."
            autoFocus
          />

          <div className="flex justify-end mt-4">
             <button
               onClick={handleLock}
               disabled={!input.trim()}
               className="flex items-center gap-2 px-6 py-2 bg-gray-800 hover:bg-primary hover:text-black text-white transition-all font-mono text-sm disabled:opacity-50"
             >
                ENCRYPT & LOCK <Send size={14} />
             </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="text-center space-y-8"
        >
           <div className="w-32 h-32 mx-auto rounded-full bg-black border-4 border-primary flex items-center justify-center relative shadow-[0_0_50px_var(--primary)]">
              <Lock size={48} className="text-white" />
              <div className="absolute inset-0 rounded-full border border-dashed border-white/50 animate-spin-slow" />
           </div>
           
           <div>
             <h2 className="text-3xl font-display text-white mb-2">TRANSMISSION LOCKED</h2>
             <p className="font-mono text-gray-400">Unlock Date: 01.01.2026</p>
           </div>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.5 }}
           >
              <h3 className="text-2xl text-secondary font-bold mb-6">Are you curious to know about you?</h3>
              <button
                onClick={() => setStep('result')}
                className="px-10 py-3 bg-white text-black font-bold text-lg hover:scale-110 transition-transform shadow-[0_0_20px_white]"
              >
                GENERATE PROFILE
              </button>
           </motion.div>
        </motion.div>
      )}

    </div>
  );
}
