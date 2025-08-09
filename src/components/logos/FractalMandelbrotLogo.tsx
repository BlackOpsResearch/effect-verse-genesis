import React, { useRef, useEffect } from 'react';

export function FractalMandelbrotLogo({ className = "", size = 64, animate = false }: { className?: string; size?: number; animate?: boolean }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo || !animate) return;

    let animationId: number;
    let time = 0;

    const tick = () => {
      time += 0.02;
      const fractals = logo.querySelectorAll('.fractal');
      fractals.forEach((fractal, index) => {
        const htmlFractal = fractal as HTMLElement;
        const scale = 0.8 + Math.sin(time * 1.5 + index * 0.7) * 0.3;
        const rotation = time * 20 + index * 60;
        htmlFractal.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        htmlFractal.style.filter = `hue-rotate(${(time * 40 + index * 90) % 360}deg)`;
      });
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [animate]);

  return (
    <div ref={logoRef} className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-magenta-400/20 to-purple-500/20" />
      
      {/* Fractal layers */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="fractal absolute"
          style={{
            left: '50%',
            top: '50%',
            width: `${32 - i * 6}px`,
            height: `${32 - i * 6}px`,
            marginLeft: `${-16 + i * 3}px`,
            marginTop: `${-16 + i * 3}px`,
          }}
        >
          <div 
            className="w-full h-full border-2 border-gradient-to-r from-magenta-400 to-purple-500"
            style={{
              borderRadius: i % 2 === 0 ? '50%' : '0%',
              borderImage: `linear-gradient(${45 + i * 90}deg, #e879f9, #a855f7) 1`,
              opacity: 0.8 - i * 0.1,
            }}
          />
        </div>
      ))}
      
      {/* Mandelbrot center */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-white to-magenta-300 animate-pulse shadow-lg shadow-magenta-400/50" />
    </div>
  );
}