'use client';

import { useStore } from '@/app/store/useStore';
import { generateProfile } from '@/app/utils/generator';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, Share2, User, Zap, Bot, Ghost, Play, Pause, RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const avatarIcons: Record<string, any> = {
  'avatar-1': User,
  'avatar-2': Zap,
  'avatar-3': Bot,
  'avatar-4': Ghost,
};

export default function ProfileResult() {
  const { username, gender, avatarId, generatedProfile, setGeneratedProfile, stats, selectedSkills } = useStore();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!generatedProfile && username) {
      const profile = generateProfile(username, gender);
      setGeneratedProfile(profile);
    }
  }, [username, gender, generatedProfile, setGeneratedProfile]);

  // Audio Auto-play setup
  useEffect(() => {
    if (generatedProfile && !audioRef.current) {
        audioRef.current = new Audio(generatedProfile.musicUrl);
        audioRef.current.volume = 0.5;
        audioRef.current.loop = false;
        
        // Auto-play attempt
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false)); 
        }

        // Stop after 30s
        const timer = setTimeout(() => {
             if (audioRef.current) {
                 audioRef.current.pause();
                 setIsPlaying(false);
             }
        }, 30000);

        return () => {
            clearTimeout(timer);
            if(audioRef.current) audioRef.current.pause();
        };
    }
  }, [generatedProfile]);

  const toggleAudio = () => {
      if (!audioRef.current) return;
      if (isPlaying) {
          audioRef.current.pause();
      } else {
          audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
  };

  const handleDownload = async () => {
    if (isFlipped) setIsFlipped(false);
    
    // Wait for flip back
    setTimeout(async () => {
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: '#050510',
          useCORS: true,
          logging: false,
        });
        const link = document.createElement('a');
        link.download = `PressStart2026-${username}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }, 600);
  };

  if (!generatedProfile) return <div className="text-white">Generating...</div>;

  const AvatarIcon = avatarIcons[avatarId] || User;

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-display text-white mb-6">IDENTITY ESTABLISHED</h2>
      
      <div className="perspective-1000 w-full max-w-md h-[550px] mb-8 relative group">
         <motion.div 
            className="w-full h-full relative duration-700 cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            onClick={() => setIsFlipped(!isFlipped)}
         >
             {/* FRONT SIDE */}
             <div 
                ref={cardRef}
                className="absolute inset-0 w-full h-full bg-[#0a0a1a] border-2 border-primary p-6 rounded-lg shadow-[0_0_30px_var(--primary)] text-white overflow-hidden"
                style={{ backfaceVisibility: 'hidden' }}
             >
                {/* Decorative BG */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 blur-3xl pointer-events-none" />
                <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />

                <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-4">
                   <div>
                     <h3 className="font-display text-2xl text-primary">{username.toUpperCase()}</h3>
                     <p className="text-xs text-gray-500 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                   </div>
                   <div className="border border-secondary p-2 rounded bg-secondary/10">
                      <AvatarIcon size={32} className="text-secondary" />
                   </div>
                </div>

                <div className="flex flex-col gap-4">
                   <div className="text-center py-4 bg-white/5 rounded-lg border border-white/10">
                      <span className="text-gray-400 text-xs uppercase tracking-widest">Astro Name</span>
                      <p className="text-xl font-bold font-display text-white text-glow-secondary">{generatedProfile.astroName}</p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500 text-xs uppercase">Power</span><p className="font-bold text-cyan-300">{generatedProfile.ability}</p></div>
                      <div><span className="text-gray-500 text-xs uppercase">Aura Color</span><p className="font-bold" style={{ color: 'white' }}>{generatedProfile.color}</p></div>
                      <div><span className="text-gray-500 text-xs uppercase">Character Match</span><p className="font-bold text-pink-300">{generatedProfile.characterMatch}</p></div>
                      <div><span className="text-gray-500 text-xs uppercase">Anthem</span><p className="font-bold text-yellow-300 truncate">{generatedProfile.song}</p></div>
                   </div>

                   <div className="mt-2">
                      <span className="text-gray-500 text-xs uppercase">Analysis</span>
                      <p className="text-xs text-gray-300 leading-relaxed font-mono mt-1 border-l-2 border-primary pl-2">{generatedProfile.shortStory}</p>
                   </div>
                   
                   <div className="flex flex-wrap gap-2 mt-3">
                     {generatedProfile.activities.map((act, i) => (
                       <span key={i} className="text-[10px] uppercase font-bold text-secondary bg-secondary/10 px-2 py-1 rounded">#{act.replace(/\s/g, '')}</span>
                     ))}
                   </div>
                   
                   <div className="absolute bottom-4 left-6 right-6 flex justify-between text-xs font-mono text-gray-500 pt-4 border-t border-gray-800">
                     <span>LUCK: {Math.floor(Math.random() * 50) + 50}</span>
                     <span>VIBE: {Math.floor(Math.random() * 50) + 50}</span>
                     <span>SKILLS: {selectedSkills.length}</span>
                   </div>
                </div>
             </div>

             {/* BACK SIDE (CAR REVEAL) */}
             <div 
                className="absolute inset-0 w-full h-full bg-black border-2 border-secondary p-0 rounded-lg shadow-[0_0_30px_var(--secondary)] text-white overflow-hidden"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
             >
                 <div className="relative w-full h-full flex flex-col">
                     <div className="h-3/4 w-full relative bg-gray-900">
                        {/* Fallback pattern if image loads slow */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1e3a8a] via-black to-black" />
                        
                        <img 
                          src={generatedProfile.carImage} 
                          alt={generatedProfile.car} 
                          className="w-full h-full object-cover relative z-10" 
                          crossOrigin="anonymous"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'; // Fallback DeLorean
                          }} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
                        <div className="absolute bottom-4 left-4 z-30">
                            <h3 className="text-3xl font-display font-bold text-white text-glow">{generatedProfile.car}</h3>
                            <p className="text-secondary font-mono text-sm">YOUR 2026 RIDE</p>
                        </div>
                     </div>
                     <div className="h-1/4 w-full bg-gray-900 p-6 flex flex-col justify-center items-center relative gap-2 border-t border-gray-800">
                         <p className="text-xs uppercase text-gray-400 tracking-[0.2em] mb-1">Now Playing</p>
                         <div className="flex items-center gap-3">
                             <div className="w-2 h-8 bg-primary animate-pulse" />
                             <div className="w-2 h-12 bg-secondary animate-pulse animation-delay-75" />
                             <div className="w-2 h-6 bg-primary animate-pulse animation-delay-150" />
                             <div className="w-2 h-10 bg-secondary animate-pulse animation-delay-300" />
                         </div>
                         <p className="text-primary font-bold">{generatedProfile.music}</p>
                     </div>
                 </div>
             </div>
         </motion.div>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-4 items-center">
         <button onClick={toggleAudio} className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-primary hover:bg-primary/20 transition-all">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
         </button>
         <div className="h-8 w-[1px] bg-gray-700 mx-2" />
         <motion.button onClick={handleDownload} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-lg shadow-[0_0_15px_var(--primary)] hover:bg-white transition-all">
          <Download size={20} /> DOWNLOAD CARD
        </motion.button>
        <motion.button onClick={() => setIsFlipped(!isFlipped)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-6 py-3 border border-gray-600 bg-black/50 text-white font-bold rounded-lg hover:border-white transition-all">
          <RefreshCw size={20} /> FLIP CARD
        </motion.button>
      </div>

      <p className="mt-8 text-gray-600 text-sm">Welcome to 2026. No pressure. Just vibes.</p>
    </div>
  );
}
