import React, { useRef, useEffect } from 'react';

export function PlasmaEffectLogo({ className = "", size = 64 }: { className?: string; size?: number }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.05;
      
      const orbs = logo.querySelectorAll('.plasma-orb');
      orbs.forEach((orb, index) => {
        const htmlOrb = orb as HTMLElement;
        const radius = 15 + index * 5;
        const speed = 1 + index * 0.3;
        const x = Math.sin(time * speed + index * 2) * radius;
        const y = Math.cos(time * speed + index * 2) * radius;
        
        htmlOrb.style.transform = `translate(${x}px, ${y}px)`;
        htmlOrb.style.filter = `hue-rotate(${(time * 60 + index * 120) % 360}deg)`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div ref={logoRef} className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
      
      {/* Plasma orbs */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="plasma-orb absolute left-1/2 top-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg"
          style={{
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
            animation: `pulse ${1 + i * 0.2}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      
      {/* Energy core */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-white to-purple-300 animate-pulse shadow-lg shadow-purple-400/50" />
    </div>
  );
}