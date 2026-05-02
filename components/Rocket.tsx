'use client';

import { motion } from 'framer-motion';
import { Rocket as RocketIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BackgroundRockets() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Background rockets floating slowly upwards/diagonally in the far distance
  const rockets = [
    { id: 1, duration: 40, delay: 0, scale: 0.5, x: '10%', color: '#8B5CF6' }, // Violet
    { id: 2, duration: 55, delay: 15, scale: 0.3, x: '80%', color: '#22D3EE' }, // Cyan
    { id: 3, duration: 45, delay: 8, scale: 0.4, x: '45%', color: '#F43F5E' }, // Rose
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {rockets.map((r) => (
        <motion.div
          key={r.id}
          className="absolute bottom-[-10%]"
          style={{ left: r.x }}
          initial={{ y: '0vh', opacity: 0, scale: r.scale }}
          animate={{
            y: ['0vh', '-120vh'], // Move from bottom to top
            x: ['0vw', '15vw'],   // Slight drift to the right
            opacity: [0, 0.4, 0.8, 0.4, 0],
          }}
          transition={{
            duration: r.duration,
            delay: r.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="relative flex flex-col items-center opacity-40">
            {/* Glow behind the rocket */}
            <div 
              className="absolute top-0 rounded-full blur-xl" 
              style={{ width: '40px', height: '40px', background: r.color, opacity: 0.3 }}
            />
            
            {/* The Rocket Icon pointing UP */}
            <div className="relative z-10" style={{ transform: 'rotate(-45deg)' }}>
               <RocketIcon size={24} color={r.color} strokeWidth={1.5} />
            </div>

            {/* Thruster Fire */}
            <motion.div
              className="mt-1 w-1 rounded-full"
              style={{
                height: '60px',
                background: `linear-gradient(to bottom, ${r.color}, transparent)`,
              }}
              animate={{ height: ['60px', '90px', '60px'], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Long subtle particle trail */}
            <div 
              className="w-[1px] opacity-30" 
              style={{ 
                height: '150px', 
                background: `linear-gradient(to bottom, ${r.color}, transparent)` 
              }} 
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
