import React, { useEffect, useRef } from 'react';

interface WormholeProps {
  className?: string;
}

export function Wormhole({ className = "" }: WormholeProps) {
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

    let time = 0;
    const rings = Array.from({ length: 50 }, (_, i) => ({
      radius: i * 10,
      offset: i * 0.1
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      time += 0.05;

      rings.forEach((ring, i) => {
        const animatedRadius = ring.radius + Math.sin(time + ring.offset) * 5;
        const alpha = Math.max(0, 1 - i / 30);
        
        ctx.strokeStyle = `hsla(${(time * 50 + i * 10) % 360}, 70%, 60%, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, animatedRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glow
        if (i < 10) {
          ctx.strokeStyle = `hsla(${(time * 50 + i * 10) % 360}, 70%, 80%, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Central vortex
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
      gradient.addColorStop(0, `hsla(${time * 100 % 360}, 70%, 50%, 0.8)`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(centerX - 100, centerY - 100, 200, 200);

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
        style={{ background: 'radial-gradient(circle, #1a0033, #000000)' }}
      />
    </div>
  );
}