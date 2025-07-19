import React, { useEffect, useRef } from 'react';

interface NebulaCloudProps {
  className?: string;
}

export function NebulaCloud({ className = "" }: NebulaCloudProps) {
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
    const cloudLayers = Array.from({ length: 5 }, (_, i) => ({
      particles: Array.from({ length: 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 10 + Math.random() * 30,
        speed: 0.1 + Math.random() * 0.3,
        alpha: 0.1 + Math.random() * 0.3
      })),
      hue: 240 + i * 30
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, width, height);

      time += 0.01;

      cloudLayers.forEach((layer, layerIndex) => {
        layer.particles.forEach(particle => {
          particle.x += Math.sin(time + particle.y * 0.01) * particle.speed;
          particle.y += Math.cos(time + particle.x * 0.01) * particle.speed * 0.5;

          if (particle.x < -50) particle.x = width + 50;
          if (particle.x > width + 50) particle.x = -50;
          if (particle.y < -50) particle.y = height + 50;
          if (particle.y > height + 50) particle.y = -50;

          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );
          gradient.addColorStop(0, `hsla(${layer.hue}, 70%, 60%, ${particle.alpha})`);
          gradient.addColorStop(1, 'transparent');

          ctx.fillStyle = gradient;
          ctx.fillRect(
            particle.x - particle.size,
            particle.y - particle.size,
            particle.size * 2,
            particle.size * 2
          );
        });
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
        style={{ background: 'linear-gradient(135deg, #0a0a20, #1a1a40)' }}
      />
    </div>
  );
}