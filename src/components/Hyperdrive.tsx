import React, { useEffect, useRef } from 'react';

interface HyperdriveProps {
  className?: string;
}

export function Hyperdrive({ className = "" }: HyperdriveProps) {
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

    const stars = Array.from({ length: 300 }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * 1000,
      prevX: 0,
      prevY: 0
    }));

    let speed = 2;
    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

      time += 0.02;
      speed = 2 + Math.sin(time) * 5;

      stars.forEach(star => {
        star.prevX = (star.x / star.z) * 200 + centerX;
        star.prevY = (star.y / star.z) * 200 + centerY;

        star.z -= speed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = 1000;
        }

        const x = (star.x / star.z) * 200 + centerX;
        const y = (star.y / star.z) * 200 + centerY;

        const opacity = Math.max(0, 1 - star.z / 1000);
        const size = Math.max(0, 3 * opacity);

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          // Draw star trail
          ctx.strokeStyle = `hsla(200, 100%, 80%, ${opacity})`;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(x, y);
          ctx.stroke();

          // Draw star point
          ctx.fillStyle = `hsla(200, 100%, 90%, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fill();
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
        style={{ background: 'radial-gradient(circle, #000022, #000000)' }}
      />
    </div>
  );
}