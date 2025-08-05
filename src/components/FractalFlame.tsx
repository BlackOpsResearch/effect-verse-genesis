import React, { useEffect, useRef } from 'react';

export function FractalFlame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;

    const transform1 = (x: number, y: number, t: number) => {
      const r = Math.sqrt(x * x + y * y);
      const theta = Math.atan2(y, x);
      return {
        x: r * Math.cos(theta + t),
        y: r * Math.sin(theta + t)
      };
    };

    const transform2 = (x: number, y: number, t: number) => {
      return {
        x: Math.sin(x + t) * 0.8,
        y: Math.cos(y + t) * 0.8
      };
    };

    const transform3 = (x: number, y: number, t: number) => {
      const r = Math.sqrt(x * x + y * y);
      return {
        x: x / (r + 0.1) + Math.sin(t) * 0.1,
        y: y / (r + 0.1) + Math.cos(t) * 0.1
      };
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.3;

      // Generate fractal flame points
      for (let i = 0; i < 1000; i++) {
        let x = (Math.random() - 0.5) * 2;
        let y = (Math.random() - 0.5) * 2;
        
        // Apply multiple transformations
        for (let j = 0; j < 5; j++) {
          const choice = Math.random();
          
          if (choice < 0.33) {
            const result = transform1(x, y, time);
            x = result.x;
            y = result.y;
          } else if (choice < 0.66) {
            const result = transform2(x, y, time);
            x = result.x;
            y = result.y;
          } else {
            const result = transform3(x, y, time);
            x = result.x;
            y = result.y;
          }
        }

        // Map to screen coordinates
        const screenX = centerX + x * scale;
        const screenY = centerY + y * scale;

        if (screenX >= 0 && screenX < canvas.width && screenY >= 0 && screenY < canvas.height) {
          const intensity = Math.sqrt(x * x + y * y);
          const hue = (intensity * 100 + time * 50) % 360;
          const saturation = 80 + intensity * 20;
          const lightness = 40 + intensity * 30;

          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
          ctx.fillRect(screenX, screenY, 1, 1);

          // Add glow effect
          ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
          ctx.shadowBlur = 2;
          ctx.fillRect(screenX, screenY, 1, 1);
          ctx.shadowBlur = 0;
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'radial-gradient(circle, #2a0845, #000)' }}
    />
  );
}