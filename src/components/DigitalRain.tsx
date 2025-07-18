import React, { useRef, useEffect, useState } from 'react';

interface DigitalDrop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
}

export function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const dropsRef = useRef<DigitalDrop[]>([]);
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

    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops
    dropsRef.current = Array.from({ length: columns }, (_, i) => ({
      x: i * fontSize,
      y: Math.random() * canvas.height,
      speed: Math.random() * 3 + 2,
      chars: Array.from({ length: 20 }, () => characters[Math.floor(Math.random() * characters.length)]),
      opacity: Math.random() * 0.8 + 0.2
    }));

    const animate = () => {
      if (!isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      dropsRef.current.forEach(drop => {
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -fontSize * drop.chars.length;
        }

        // Randomly update characters
        if (Math.random() > 0.98) {
          drop.chars = drop.chars.map(() => 
            characters[Math.floor(Math.random() * characters.length)]
          );
        }

        // Draw the trail
        drop.chars.forEach((char, i) => {
          const charY = drop.y - i * fontSize;
          const alpha = (1 - i / drop.chars.length) * drop.opacity;
          
          if (i === 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
          }
          
          ctx.fillText(char, drop.x, charY);
        });
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