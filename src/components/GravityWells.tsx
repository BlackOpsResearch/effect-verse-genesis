import React, { useEffect, useRef } from 'react';

interface GravityWellsProps {
  className?: string;
}

export function GravityWells({ className = "" }: GravityWellsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    const wells = [
      { x: width * 0.3, y: height * 0.4, mass: 50, color: '#ff3366' },
      { x: width * 0.7, y: height * 0.6, mass: 30, color: '#3366ff' },
      { x: width * 0.5, y: height * 0.2, mass: 40, color: '#33ff66' }
    ];

    const particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 255
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Draw gravity wells
      wells.forEach(well => {
        // Well visualization
        const gradient = ctx.createRadialGradient(well.x, well.y, 0, well.x, well.y, well.mass * 2);
        gradient.addColorStop(0, well.color + '80');
        gradient.addColorStop(0.5, well.color + '40');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(well.x - well.mass * 2, well.y - well.mass * 2, well.mass * 4, well.mass * 4);

        // Well core
        ctx.fillStyle = well.color;
        ctx.beginPath();
        ctx.arc(well.x, well.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw particles
      particles.forEach(particle => {
        let totalForceX = 0;
        let totalForceY = 0;

        // Calculate gravitational forces from all wells
        wells.forEach(well => {
          const dx = well.x - particle.x;
          const dy = well.y - particle.y;
          const distanceSquared = dx * dx + dy * dy;
          const distance = Math.sqrt(distanceSquared);
          
          if (distance > 5) {
            const force = well.mass / distanceSquared;
            totalForceX += (dx / distance) * force * 0.01;
            totalForceY += (dy / distance) * force * 0.01;
          }
        });

        // Apply forces
        particle.vx += totalForceX;
        particle.vy += totalForceY;

        // Apply drag
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > height) particle.vy *= -0.8;
        
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        // Update life
        particle.life = Math.max(0, particle.life - 0.5);
        if (particle.life <= 0) {
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.vx = (Math.random() - 0.5) * 2;
          particle.vy = (Math.random() - 0.5) * 2;
          particle.life = 255;
        }

        // Draw particle
        const alpha = particle.life / 255;
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        ctx.fillStyle = `hsla(${speed * 50 + 180}, 70%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1 + speed * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'radial-gradient(circle, #0a0a0a, #000000)' }}
      />
    </div>
  );
}