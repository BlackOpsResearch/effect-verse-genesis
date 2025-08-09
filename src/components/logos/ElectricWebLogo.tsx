import React, { useRef, useEffect } from 'react';

export function ElectricWebLogo({ className = "", size = 64, animate = false }: { className?: string; size?: number; animate?: boolean }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo || !animate) return;

    let animationId: number;
    let time = 0;

    const tick = () => {
      time += 0.1;
      const bolts = logo.querySelectorAll('.lightning-bolt');
      bolts.forEach((bolt, index) => {
        const htmlBolt = bolt as HTMLElement;
        const intensity = Math.sin(time * 3 + index * 1.5) * 0.5 + 0.5;
        htmlBolt.style.opacity = (0.3 + intensity * 0.7).toString();
        htmlBolt.style.filter = `brightness(${1 + intensity})`;
      });
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [animate]);

  return (
    <div ref={logoRef} className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/20 to-blue-500/20" />
      
      {/* Lightning web */}
      <svg className="absolute inset-2" viewBox="0 0 48 48">
        {/* Lightning bolts */}
        <path className="lightning-bolt" d="M12 4 L28 20 L20 20 L36 44 L20 28 L28 28 Z" 
              stroke="#eab308" strokeWidth="2" fill="none" />
        <path className="lightning-bolt" d="M4 12 L20 28 L12 28 L28 52 L12 36 L20 36 Z" 
              stroke="#3b82f6" strokeWidth="1.5" fill="none" />
        <path className="lightning-bolt" d="M20 8 L36 24 L28 24 L44 48 L28 32 L36 32 Z" 
              stroke="#06b6d4" strokeWidth="1.5" fill="none" />
      </svg>
      
      {/* Electric core */}
      <div className={`absolute inset-4 rounded-full bg-gradient-to-br from-yellow-300 to-blue-400 ${animate ? 'animate-pulse' : ''} shadow-lg shadow-yellow-400/50`} />
    </div>
  );
}