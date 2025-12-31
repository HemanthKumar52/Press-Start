'use client';

import { useStore } from '@/app/store/useStore';
import { AnimatePresence, motion } from 'framer-motion';
import LandingScreen from './LandingScreen';
import BootSequence from './BootSequence';
import AccountCreation from './AccountCreation';
import SkillPath from './SkillPath';
import ProfileResult from './ProfileResult';
import NeonCity from './NeonCity';
import { useEffect } from 'react';

export default function ExperienceContainer() {
  const step = useStore((state) => state.step);

  // Sound effects or background music could be initialized here

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[80vh] flex flex-col items-center justify-center relative z-10">
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center"
          >
            <LandingScreen />
          </motion.div>
        )}
        {step === 'boot' && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <BootSequence />
          </motion.div>
        )}
        {step === 'account' && (
          <motion.div
            key="account"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full h-full"
          >
            <AccountCreation />
          </motion.div>
        )}
        {step === 'skills' && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full h-full"
          >
            <SkillPath />
          </motion.div>
        )}
        {step === 'city' && (
          <motion.div
            key="city"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <NeonCity />
          </motion.div>
        )}
        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full h-full"
          >
            <ProfileResult />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
