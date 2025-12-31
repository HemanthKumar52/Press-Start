'use client';

import { useStore } from '@/app/store/useStore';
import { motion } from 'framer-motion';
import { User, Zap, CircleUser, Bot, Ghost, Skull } from 'lucide-react';
import { useState } from 'react';

const avatars = [
  { id: 'avatar-1', icon: User, color: 'text-primary' },
  { id: 'avatar-2', icon: Zap, color: 'text-yellow-400' },
  { id: 'avatar-3', icon: Bot, color: 'text-secondary' },
  { id: 'avatar-4', icon: Ghost, color: 'text-white' },
];

export default function AccountCreation() {
  const { username, gender, avatarId, setUsername, setGender, setAvatar, setStep } = useStore();
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Identity required to proceed.');
      return;
    }
    setStep('skills');
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md shadow-[0_0_30px_rgba(188,19,254,0.1)]">
      <h2 className="text-3xl font-display text-white mb-6 text-center">IDENTITY_INIT</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Username */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400 uppercase tracking-widest">Codename</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            placeholder="Enter your alias..."
            className="w-full bg-black/50 border-b-2 border-gray-700 p-3 text-xl text-primary focus:border-primary focus:outline-none transition-colors placeholder-gray-700 font-mono"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm font-mono">{error}</p>}
        </div>

        {/* Gender */}
        <div className="space-y-2">
           <label className="text-sm text-gray-400 uppercase tracking-widest">Base Type (Optional)</label>
           <div className="flex gap-4">
             {['male', 'female', 'non-binary'].map((g) => (
               <button
                 key={g}
                 type="button"
                 onClick={() => setGender(g as any)}
                 className={`px-4 py-2 border rounded-full text-sm font-mono transition-all ${gender === g ? 'border-secondary text-secondary bg-secondary/10' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}
               >
                 {g.toUpperCase()}
               </button>
             ))}
           </div>
        </div>

        {/* Avatar */}
        <div className="space-y-4">
           <label className="text-sm text-gray-400 uppercase tracking-widest">Select Avatar</label>
           <div className="grid grid-cols-4 gap-4">
             {avatars.map((av) => (
               <motion.button
                 key={av.id}
                 type="button"
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={() => setAvatar(av.id)}
                 className={`aspect-square rounded-xl border-2 flex items-center justify-center bg-black/80 transition-all ${avatarId === av.id ? 'border-primary box-glow' : 'border-gray-800 opacity-50 hover:opacity-100'}`}
               >
                  <av.icon size={32} className={av.color} />
               </motion.button>
             ))}
           </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 mt-8 bg-primary hover:bg-white hover:text-black text-black font-bold font-display uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1"
        >
          Confirm Identity
        </button>

      </form>
    </div>
  );
}
