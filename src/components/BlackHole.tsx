import React, { useEffect, useRef } from 'react';

interface BlackHoleProps {
  className?: string;
}

export function BlackHole({ className = "" }: BlackHoleProps) {
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
    const centerX = width / 2;
    const centerY = height / 2;

    const particles = Array.from({ length: 300 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 200 + Math.random() * 100,
      speed: 0.01 + Math.random() * 0.02,
      size: 1 + Math.random() * 2
    }));

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      time += 0.02;

      // Draw event horizon
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      particles.forEach(particle => {
        particle.angle += particle.speed;
        particle.radius *= 0.999; // Spiral inward
        
        if (particle.radius < 20) {
          particle.radius = 200 + Math.random() * 100;
          particle.angle = Math.random() * Math.PI * 2;
        }

        const x = centerX + Math.cos(particle.angle) * particle.radius;
        const y = centerY + Math.sin(particle.angle) * particle.radius;

        const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const brightness = Math.max(0, 1 - distanceFromCenter / 200);

        ctx.fillStyle = `hsla(${30 + brightness * 60}, 80%, ${20 + brightness * 60}%, ${brightness})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
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
        style={{ background: 'radial-gradient(circle, #000011, #000000)' }}
      />
    </div>
  );
}