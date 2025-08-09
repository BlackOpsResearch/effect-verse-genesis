import React, { useRef, useEffect } from 'react';

export function CrystalGrowthLogo({ className = "", size = 64, animate = false }: { className?: string; size?: number; animate?: boolean }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo || !animate) return;

    let animationId: number;
    let time = 0;

    const tick = () => {
      time += 0.02;
      const crystals = logo.querySelectorAll('.crystal');
      crystals.forEach((crystal, index) => {
        const htmlCrystal = crystal as HTMLElement;
        const scale = 0.8 + Math.sin(time * 2 + index * 0.8) * 0.3;
        const rotation = time * 10 + index * 45;
        htmlCrystal.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        htmlCrystal.style.filter = `hue-rotate(${(time * 50 + index * 120) % 360}deg)`;
      });
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [animate]);

  return (
    <div ref={logoRef} className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20" />
      
      {/* Crystal formations */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="crystal absolute"
          style={{
            left: '50%',
            top: '50%',
            width: `${20 + i * 8}px`,
            height: `${20 + i * 8}px`,
            marginLeft: `${-10 - i * 4}px`,
            marginTop: `${-10 - i * 4}px`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-300 to-purple-400 transform rotate-45 shadow-lg" 
               style={{ 
                 clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                 filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.5))'
               }} />
        </div>
      ))}
      
      {/* Center gem */}
      <div className={`absolute inset-4 bg-gradient-to-br from-white to-cyan-300 rounded-full ${animate ? 'animate-pulse' : ''} shadow-lg shadow-cyan-400/50`} />
    </div>
  );
}