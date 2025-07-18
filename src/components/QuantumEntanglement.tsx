import React, { useRef, useEffect, useState } from 'react';

interface QuantumParticle {
  x: number;
  y: number;
  entangledWith: number;
  phase: number;
  spin: number;
  energy: number;
}

export function QuantumEntanglement() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const particlesRef = useRef<QuantumParticle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize entangled particles
    const particleCount = 16;
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      entangledWith: i % 2 === 0 ? i + 1 : i - 1,
      phase: Math.random() * Math.PI * 2,
      spin: Math.random() > 0.5 ? 1 : -1,
      energy: Math.random() * 0.5 + 0.5
    }));

    const animate = () => {
      if (!isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      // Update quantum states
      particlesRef.current.forEach((particle, i) => {
        particle.phase += 0.05 * particle.spin;
        
        // Quantum entanglement effect
        const entangled = particlesRef.current[particle.entangledWith];
        if (entangled) {
          // Entangled particles have opposite spins
          entangled.spin = -particle.spin;
          
          // Phase correlation
          const phaseDiff = particle.phase - entangled.phase;
          if (Math.abs(phaseDiff) > Math.PI) {
            entangled.phase += Math.sign(phaseDiff) * 0.1;
          }
        }
      });

      // Draw entanglement connections
      particlesRef.current.forEach((particle, i) => {
        const entangled = particlesRef.current[particle.entangledWith];
        if (entangled && i < particle.entangledWith) { // Draw each connection only once
          const distance = Math.sqrt(
            (particle.x - entangled.x) ** 2 + (particle.y - entangled.y) ** 2
          );
          
          const connectionStrength = Math.sin(time + particle.phase) * 0.5 + 0.5;
          
          // Quantum tunnel effect
          ctx.strokeStyle = `rgba(255, 100, 255, ${connectionStrength * 0.8})`;
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = time * 20;
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(entangled.x, entangled.y);
          ctx.stroke();
          
          ctx.setLineDash([]);
        }
      });

      // Draw particles with quantum properties
      particlesRef.current.forEach(particle => {
        const waveFunction = Math.sin(particle.phase) * particle.energy;
        const uncertainty = Math.abs(waveFunction) * 10;
        
        // Uncertainty principle visualization
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, uncertainty + 15
        );
        
        if (particle.spin > 0) {
          gradient.addColorStop(0, 'rgba(255, 100, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 100, 255, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(100, 255, 100, 0.8)');
          gradient.addColorStop(1, 'rgba(100, 255, 100, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, uncertainty + 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.fillStyle = particle.spin > 0 ? '#ff66ff' : '#66ff66';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Spin indicator
        const spinRadius = 12;
        const spinAngle = particle.phase;
        const spinX = particle.x + Math.cos(spinAngle) * spinRadius;
        const spinY = particle.y + Math.sin(spinAngle) * spinRadius;
        
        ctx.strokeStyle = particle.spin > 0 ? '#ff66ff' : '#66ff66';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, spinRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = particle.spin > 0 ? '#ff66ff' : '#66ff66';
        ctx.beginPath();
        ctx.arc(spinX, spinY, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: '#000' }}
    />
  );
}