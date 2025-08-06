import React, { useRef, useEffect } from 'react';

export function ParticleSwarmLogo({ className = "", size = 64 }: { className?: string; size?: number }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.04;
      
      const particles = logo.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const htmlParticle = particle as HTMLElement;
        const angle = time + index * 0.8;
        const radius = 20 + Math.sin(time * 2 + index) * 8;
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle * 1.3) * radius;
        
        htmlParticle.style.transform = `translate(${x}px, ${y}px)`;
        htmlParticle.style.opacity = (0.4 + Math.sin(time * 3 + index) * 0.4).toString();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div ref={logoRef} className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/20 to-red-500/20" />
      
      {/* Particle swarm */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute left-1/2 top-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-lg"
          style={{
            boxShadow: '0 0 15px rgba(251, 146, 60, 0.8)',
          }}
        />
      ))}
      
      {/* Center attractor */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 animate-pulse shadow-lg shadow-orange-400/50" />
    </div>
  );
}