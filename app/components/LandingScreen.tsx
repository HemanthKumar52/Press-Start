'use client';

import { useStore } from '@/app/store/useStore';
import { motion } from 'framer-motion';

export default function LandingScreen() {
  const setStep = useStore((state) => state.setStep);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-6xl md:text-9xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]"
      >
        PRESS START
        <br />
        <span className="text-4xl md:text-6xl text-white block mt-4 tracking-widest">2026</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-xl md:text-2xl text-gray-400 font-light"
      >
        No pressure. Just vibes.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1, textShadow: "0 0 8px rgb(255,255,255)", boxShadow: "0 0 15px var(--accent)" }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          opacity: [0.5, 1, 0.5],
          textShadow: ["0 0 5px var(--primary)", "0 0 20px var(--primary)", "0 0 5px var(--primary)"]
        }}
        transition={{ 
          opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          textShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        onClick={() => setStep('boot')}
        className="mt-12 px-8 py-4 text-2xl font-bold font-display text-white border-2 border-primary rounded-none bg-primary/10 backdrop-blur-sm cursor-pointer hover:bg-primary/20 transition-all duration-300"
      >
        INSERT COIN Or CLICK
      </motion.button>
    </div>
  );
}
