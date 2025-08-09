import React, { useRef, useEffect } from 'react';

export function AuroraWavesLogo({ className = "", size = 64, animate = false }: { className?: string; size?: number; animate?: boolean }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo || !animate) return;

    let animationId: number;
    let time = 0;

    const tick = () => {
      time += 0.03;
      const waves = logo.querySelectorAll('.wave');
      waves.forEach((wave, index) => {
        const htmlWave = wave as HTMLElement;
        const offset = index * 0.5;
        const amplitude = 8 + Math.sin(time + offset) * 4;
        const frequency = 2 + index * 0.3;
        htmlWave.style.transform = `translateY(${Math.sin(time * frequency + offset) * amplitude}px)`;
        htmlWave.style.filter = `hue-rotate(${(time * 30 + index * 60) % 360}deg)`;
      });
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [animate]);

  return (
    <div ref={logoRef} className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 animate-pulse" />
      
      {/* Aurora waves */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`wave absolute inset-2 rounded-full border-2 border-gradient-to-r from-blue-400 to-purple-500`}
          style={{
            borderImage: `linear-gradient(${45 + i * 90}deg, #60a5fa, #a855f7) 1`,
            animationDelay: `${i * 0.2}s`,
            opacity: 0.7 - i * 0.15,
          }}
        />
      ))}
      
      {/* Center glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-300 to-purple-400 animate-pulse shadow-lg shadow-blue-400/50" />
    </div>
  );
}