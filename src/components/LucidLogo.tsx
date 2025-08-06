import React, { useRef, useEffect } from 'react';

export function LucidLogo({ className = "" }: { className?: string }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.02;
      
      const letters = logo.querySelectorAll('.letter');
      letters.forEach((letter, index) => {
        const htmlLetter = letter as HTMLElement;
        const offset = index * 0.3;
        const y = Math.sin(time + offset) * 3;
        const rotateY = Math.sin(time * 0.5 + offset) * 10;
        const scale = 1 + Math.sin(time * 2 + offset) * 0.05;
        
        htmlLetter.style.transform = `translateY(${y}px) rotateY(${rotateY}deg) scale(${scale})`;
        
        const hue = (time * 50 + index * 30) % 360;
        htmlLetter.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 0 10px hsl(${hue}, 100%, 70%))`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div ref={logoRef} className={`flex items-center space-x-1 ${className}`}>
      <div className="relative">
        {/* Geometric background */}
        <div className="absolute inset-0 w-12 h-12 rounded-lg bg-gradient-to-br from-electric-blue to-electric-purple opacity-20 animate-pulse" />
        <div className="absolute inset-1 w-10 h-10 rounded-lg bg-gradient-to-tr from-electric-cyan to-plasma-pink opacity-30 animate-spin" style={{ animationDuration: '8s' }} />
        
        {/* Central crystal */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-to-br from-white to-electric-cyan rounded-sm transform rotate-45 animate-pulse shadow-lg shadow-electric-cyan/50" />
          <div className="absolute w-4 h-4 bg-gradient-to-tr from-electric-purple to-white rounded-sm transform rotate-45 animate-pulse delay-100" />
        </div>
      </div>
      
      {/* Text */}
      <div className="flex">
        {'LUCID'.split('').map((letter, index) => (
          <span
            key={index}
            className="letter text-4xl font-bold bg-gradient-to-r from-electric-blue via-electric-cyan to-plasma-pink bg-clip-text text-transparent"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '900',
              textShadow: '0 0 20px rgba(255,255,255,0.3)',
              transformStyle: 'preserve-3d',
              display: 'inline-block',
              transformOrigin: 'center',
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}