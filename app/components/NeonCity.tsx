'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { useStore } from '@/app/store/useStore';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls, Stars } from '@react-three/drei';

function MovingGrid() {
  const gridRef = useRef<THREE.GridHelper>(null!);
  useFrame((state, delta) => {
    gridRef.current.position.z += delta * 15; // Move grid towards camera
    if (gridRef.current.position.z > 20) {
      gridRef.current.position.z = 0;
    }
  });

  return (
    <gridHelper 
      ref={gridRef} 
      args={[200, 50, 0xff00ff, 0x222222]} 
      position={[0, -2, 0]}
    />
  );
}

function Building({ position, scale, color, onClick }: any) {
    const meshRef = useRef<THREE.Mesh>(null!);
    
    useFrame((state, delta) => {
        meshRef.current.position.z += delta * 15;
        if (meshRef.current.position.z > 30) {
            meshRef.current.position.z = -100; // Recycle building
        }
    });

    return (
        <mesh 
            ref={meshRef} 
            position={position} 
            onClick={onClick}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
            <boxGeometry args={[scale[0], scale[1], scale[2]]} />
            <meshStandardMaterial 
                color={color} 
                emissive={color}
                emissiveIntensity={0.8}
                wireframe
            />
        </mesh>
    );
}

function CityScene({ onAction }: { onAction: (msg: string) => void }) {
    const buildings = useRef<{pos: [number,number,number], scale: [number,number,number], color: string}[]>([]);
    
    // Generate initial buildings
    if (buildings.current.length === 0) {
        for (let i = 0; i < 40; i++) {
           buildings.current.push({
               pos: [
                   (Math.random() < 0.5 ? -1 : 1) * (10 + Math.random() * 20),
                   Math.random() * 10,
                   -100 + Math.random() * 100
               ],
               scale: [2 + Math.random() * 5, 10 + Math.random() * 30, 5 + Math.random() * 5],
               color: Math.random() > 0.5 ? '#00f3ff' : '#ff00ff'
           });
        }
    }

    return (
        <>
            <StatsUpdater onAction={onAction} />
            <fog attach="fog" args={['#050510', 10, 80]} />
            <ambientLight intensity={0.5} />
            <MovingGrid />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {buildings.current.map((b, i) => (
                <Building 
                    key={i} 
                    position={b.pos} 
                    scale={b.scale} 
                    color={b.color} 
                    onClick={() => onAction(Math.random() > 0.5 ? "+5 VIBE" : "+10 LUCK")}
                />
            ))}
        </>
    );
}

// Helper to trigger random events text
function StatsUpdater({ onAction }: { onAction: (msg: string) => void }) {
    useFrame((state) => {
        if (Math.random() < 0.005) {
            // Random occasional environment message
            // onAction("SYSTEM: NEON RAIN");
        }
    });
    return null;
}

export default function NeonCity() {
   const setStep = useStore((state) => state.setStep);
   const [message, setMessage] = useState("USE MOUSE TO LOOK AROUND • CLICK NEON BUILDINGS");

   const handleAction = (msg: string) => {
       setMessage(msg);
       setTimeout(() => setMessage("EXPLORATION MODE"), 1500);
   };

   return (
       <div className="w-full h-full relative border border-primary/50 shadow-[0_0_50px_var(--primary)] rounded-xl overflow-hidden bg-black/80">
           
           <div className="absolute top-4 left-0 w-full text-center z-10 pointer-events-none">
               <h2 className="text-2xl font-display text-white text-glow">NEON DRIFT CITY</h2>
               <p className="text-primary font-mono text-sm mt-1 animate-pulse">{message}</p>
           </div>
           
           <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
               <CityScene onAction={handleAction} />
                {/* 
                  Using orbit controls but limiting movement so it feels like a 'head' look 
                  rather than flying around freely to keep the 'drift' feel.
                */}
               <OrbitControls 
                   enableZoom={false} 
                   maxPolarAngle={Math.PI / 2} 
                   minPolarAngle={Math.PI / 3}
                   enablePan={false}
               />
           </Canvas>
           
           <div className="absolute bottom-10 w-full flex justify-center z-10">
               <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setStep('result')}
                   className="px-8 py-3 bg-white text-black font-bold font-display tracking-widest border-2 border-white hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-[0_0_20px_rgba(255,255,255,0.5)]"
               >
                   REVEAL PROFILE
               </motion.button>
           </div>

           <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40" />
           <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />
       </div>
   );
}
