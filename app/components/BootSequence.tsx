'use client';

import { useStore } from '@/app/store/useStore';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const bootLines = [
  { text: "Initializing boot sequence...", delay: 500, action: null },
  { text: "Loading core modules...", delay: 1200, action: null },
  { text: "Detecting user vibes...", delay: 2000, action: null },
  { text: "⚠️ LOW ENERGY DETECTED", delay: 2800, action: null, color: "text-yellow-400" },
  { text: "Patching system...", delay: 3500, action: null },
  { text: "Applying Upgrade: +10 Calm", delay: 4200, action: { stat: 'calm', val: 10 }, color: "text-success" },
  { text: "Applying Upgrade: +5 Luck", delay: 4900, action: { stat: 'luck', val: 5 }, color: "text-success" },
  { text: "Applying Upgrade: +8 Energy", delay: 5600, action: { stat: 'energy', val: 8 }, color: "text-success" },
  { text: "Applying Upgrade: +12 Smiles", delay: 6300, action: { stat: 'smiles', val: 12 }, color: "text-success" },
  { text: "Optimization Complete.", delay: 7200, action: null },
  { text: "You're ready.", delay: 8000, action: null, color: "text-primary text-xl font-bold" },
  { text: "Happy New Year.", delay: 9000, action: null, color: "text-secondary text-2xl font-bold" },
];

export default function BootSequence() {
  const setStep = useStore((state) => state.setStep);
  const updateStats = useStore((state) => state.updateStats);
  const [lines, setLines] = useState<{text: string, color?: string}[]>([]);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    bootLines.forEach((line) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, { text: line.text, color: line.color }]);
        if (line.action) {
           updateStats(line.action.stat as any, line.action.val);
        }
        
        // Scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
        
      }, line.delay);
      timeouts.push(timeout);
    });

    // End sequence
    const endTimeout = setTimeout(() => {
      setStep('account');
    }, 11000);
    timeouts.push(endTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [setStep, updateStats]);

  return (
    <div className="w-full max-w-2xl bg-black/80 font-mono text-lg p-8 border border-gray-800 rounded-md shadow-[0_0_20px_rgba(0,255,0,0.1)] min-h-[50vh] flex flex-col justify-end">
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`mb-2 ${line.color || 'text-gray-300'}`}
        >
          <span className="mr-2 text-gray-600">[{new Date().toLocaleTimeString()}]</span>
          {line.text}
        </motion.div>
      ))}
      <div className="animate-pulse text-primary mt-4">_</div>
    </div>
  );
}
