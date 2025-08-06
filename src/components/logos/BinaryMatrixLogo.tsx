import React, { useRef, useEffect } from 'react';

export function BinaryMatrixLogo({ className = "", size = 64 }: { className?: string; size?: number }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.1;
      
      const digits = logo.querySelectorAll('.digit');
      digits.forEach((digit, index) => {
        const htmlDigit = digit as HTMLElement;
        const shouldFlip = Math.sin(time + index * 0.3) > 0.3;
        htmlDigit.textContent = shouldFlip ? '1' : '0';
        htmlDigit.style.color = shouldFlip ? '#00ff00' : '#004400';
        htmlDigit.style.textShadow = shouldFlip ? '0 0 10px #00ff00' : 'none';
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div ref={logoRef} className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-lg bg-black/80 border border-green-500/30" />
      
      {/* Binary grid */}
      <div className="grid grid-cols-4 gap-1 p-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="digit text-xs font-mono text-green-500 text-center"
            style={{ lineHeight: '1' }}
          >
            0
          </span>
        ))}
      </div>
      
      {/* Scanning line */}
      <div className="absolute top-0 w-full h-0.5 bg-green-400 animate-pulse shadow-lg shadow-green-400/50" 
           style={{ animation: 'scan 2s linear infinite' }} />
    </div>
  );
}