import { useEffect, useRef } from 'react';

interface Drop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
}

export function BinaryMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const binaryChars = ['0', '1'];
    const drops: Drop[] = [];
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * fontSize,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 3,
        chars: Array.from({ length: 20 }, () => binaryChars[Math.floor(Math.random() * 2)]),
        opacity: Math.random()
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      drops.forEach(drop => {
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -fontSize * drop.chars.length;
          drop.speed = 1 + Math.random() * 3;
          drop.opacity = Math.random();
        }

        // Update characters occasionally
        if (Math.random() < 0.005) {
          drop.chars = drop.chars.map(() => binaryChars[Math.floor(Math.random() * 2)]);
        }

        // Draw the trail
        drop.chars.forEach((char, index) => {
          const charY = drop.y - index * fontSize;
          if (charY > 0 && charY < canvas.height) {
            const alpha = (drop.opacity * (1 - index / drop.chars.length));
            
            // Main character
            ctx.fillStyle = `rgba(0, 255, 100, ${alpha})`;
            ctx.fillText(char, drop.x, charY);

            // Glow effect for first few characters
            if (index < 3) {
              ctx.shadowColor = '#00ff64';
              ctx.shadowBlur = 5;
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
              ctx.fillText(char, drop.x, charY);
              ctx.shadowBlur = 0;
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
      // Recalculate columns and reinitialize drops
      const newColumns = Math.floor(canvas.width / fontSize);
      drops.length = 0;
      for (let i = 0; i < newColumns; i++) {
        drops.push({
          x: i * fontSize,
          y: Math.random() * canvas.height,
          speed: 1 + Math.random() * 3,
          chars: Array.from({ length: 20 }, () => binaryChars[Math.floor(Math.random() * 2)]),
          opacity: Math.random()
        });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: '#000' }}
    />
  );
}