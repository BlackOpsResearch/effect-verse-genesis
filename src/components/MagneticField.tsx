import React, { useEffect, useRef } from 'react';

interface MagneticFieldProps {
  className?: string;
}

export function MagneticField({ className = "" }: MagneticFieldProps) {
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

    let time = 0;
    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      charge: Math.random() > 0.5 ? 1 : -1,
      mass: 1 + Math.random() * 3
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      time += 0.02;

      // Draw magnetic field lines
      for (let x = 0; x < width; x += 30) {
        for (let y = 0; y < height; y += 30) {
          const fieldX = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01);
          const fieldY = Math.cos(x * 0.01 + time) * Math.sin(y * 0.01);
          
          ctx.strokeStyle = `hsl(${(fieldX * 50 + 180) % 360}, 70%, 50%)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + fieldX * 15, y + fieldY * 15);
          ctx.stroke();
        }
      }

      // Draw and update particles
      particles.forEach(particle => {
        const fieldX = Math.sin(particle.x * 0.01 + time) * particle.charge;
        const fieldY = Math.cos(particle.y * 0.01 + time) * particle.charge;
        
        particle.x += fieldX * 0.5;
        particle.y += fieldY * 0.5;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.fillStyle = particle.charge > 0 ? '#ff3366' : '#3366ff';
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.mass, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
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
        style={{ background: 'radial-gradient(circle, #001122, #000011)' }}
      />
    </div>
  );
}