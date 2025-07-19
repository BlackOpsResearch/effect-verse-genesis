import React, { useEffect, useRef } from 'react';

interface SupernovaProps {
  className?: string;
}

export function Supernova({ className = "" }: SupernovaProps) {
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

    let explosionRadius = 0;
    let time = 0;
    const maxRadius = Math.max(width, height);

    const particles = Array.from({ length: 200 }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: 1 + Math.random() * 3,
      size: 1 + Math.random() * 3,
      life: 1
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      time += 0.02;
      explosionRadius += 2;

      if (explosionRadius > maxRadius) {
        explosionRadius = 0;
        particles.forEach(particle => {
          particle.angle = Math.random() * Math.PI * 2;
          particle.speed = 1 + Math.random() * 3;
          particle.life = 1;
        });
      }

      // Central explosion
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, explosionRadius);
      coreGradient.addColorStop(0, '#ffffff');
      coreGradient.addColorStop(0.3, '#ffaa00');
      coreGradient.addColorStop(0.7, '#ff3300');
      coreGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGradient;
      ctx.globalAlpha = Math.max(0, 1 - explosionRadius / maxRadius);
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      // Explosion particles
      particles.forEach(particle => {
        const distance = particle.speed * explosionRadius * 0.1;
        const x = centerX + Math.cos(particle.angle) * distance;
        const y = centerY + Math.sin(particle.angle) * distance;

        particle.life -= 0.005;

        if (particle.life > 0) {
          ctx.fillStyle = `hsla(${Math.random() * 60}, 100%, 70%, ${particle.life})`;
          ctx.beginPath();
          ctx.arc(x, y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Particle trail
          ctx.strokeStyle = `hsla(${Math.random() * 60}, 100%, 50%, ${particle.life * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
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
        style={{ background: 'radial-gradient(circle, #000033, #000000)' }}
      />
    </div>
  );
}