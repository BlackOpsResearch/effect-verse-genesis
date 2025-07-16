import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function RippleEffect() {
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

    const ripples: Ripple[] = [];

    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 100 + Math.random() * 100,
        alpha: 1
      });
    };

    let lastRipple = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 15, 35, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      if (now - lastRipple > 800 + Math.random() * 1200) {
        createRipple(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
        lastRipple = now;
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        
        ripple.radius += 2;
        ripple.alpha = 1 - (ripple.radius / ripple.maxRadius);

        if (ripple.radius >= ripple.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = ripple.alpha;
        
        // Outer ring
        ctx.strokeStyle = `rgba(100, 200, 255, ${ripple.alpha})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#64c8ff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner ring
        if (ripple.radius > 20) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius - 10, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'linear-gradient(45deg, #051529, #0a2040)' }}
    />
  );
}