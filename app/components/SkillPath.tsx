'use client';

import { useStore } from '@/app/store/useStore';
import { motion } from 'framer-motion';
import { Brain, Code, Globe, Zap } from 'lucide-react';

const skills = [
  { id: 'mind', label: 'Mind', sub: 'Learning, AI, Research', icon: Brain, color: 'text-purple-400', border: 'border-purple-400' },
  { id: 'code', label: 'Code', sub: 'Dev, Systems, Automation', icon: Code, color: 'text-cyan-400', border: 'border-cyan-400' },
  { id: 'network', label: 'Network', sub: 'Community, Leadership', icon: Globe, color: 'text-pink-400', border: 'border-pink-400' },
  { id: 'energy', label: 'Energy', sub: 'Health, Focus, Balance', icon: Zap, color: 'text-yellow-400', border: 'border-yellow-400' },
];

export default function SkillPath() {
  const { selectedSkills, toggleSkill, setStep } = useStore();

  const progress = (selectedSkills.length / 4) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
      <h2 className="text-3xl md:text-5xl font-display text-white mb-2 text-center">SELECT YOUR PATHS</h2>
      <p className="text-gray-400 mb-12 text-center">Choose up to 4 modules to load into 2026</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
        {skills.map((skill) => {
          const isSelected = selectedSkills.includes(skill.id);
          return (
            <motion.button
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-xl border transition-all duration-300 flex items-center gap-6 overflow-hidden group text-left
                ${isSelected 
                  ? `${skill.border} bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.1)]` 
                  : 'border-gray-800 bg-black/40 hover:border-gray-600'
                }
              `}
            >
              {/* Background glow on selected */}
              {isSelected && (
                <div className={`absolute inset-0 opacity-10 ${skill.color.replace('text', 'bg')}`} />
              )}
              
              <div className={`p-4 rounded-full bg-black/50 ${isSelected ? skill.color : 'text-gray-500'}`}>
                <skill.icon size={32} />
              </div>
              
              <div>
                <h3 className={`text-2xl font-bold font-display ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                  {skill.label}
                </h3>
                <p className="text-sm text-gray-500">{skill.sub}</p>
              </div>

              {isSelected && (
                 <motion.div
                   layoutId="check"
                   className={`absolute top-4 right-4 w-3 h-3 rounded-full ${skill.color.replace('text', 'bg')}`}
                 />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="w-full max-w-md bg-gray-900 h-2 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <button
        onClick={() => setStep('city')}
        disabled={selectedSkills.length === 0}
        className={`px-12 py-4 text-xl font-bold font-display uppercase tracking-widest transition-all duration-300
          ${selectedSkills.length > 0 
            ? 'bg-white text-black hover:bg-primary hover:text-white cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
        `}
      >
        BUILD COMPLETE
      </button>

    </div>
  );
}
