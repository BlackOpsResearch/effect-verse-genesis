import { useEffect, useRef } from 'react';

interface Lightning {
  points: { x: number; y: number }[];
  life: number;
  intensity: number;
}

export function LightningStorm() {
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

    const lightnings: Lightning[] = [];

    const generateLightning = (startX: number, startY: number, endX: number, endY: number): { x: number; y: number }[] => {
      const points = [{ x: startX, y: startY }];
      let currentX = startX;
      let currentY = startY;

      while (currentY < endY) {
        const stepY = 10 + Math.random() * 20;
        currentY += stepY;
        currentX += (Math.random() - 0.5) * 40;
        
        if (currentY >= endY) {
          points.push({ x: endX, y: endY });
          break;
        }
        
        points.push({ x: currentX, y: currentY });
      }

      return points;
    };

    const createLightning = () => {
      const startX = Math.random() * canvas.width;
      const endX = startX + (Math.random() - 0.5) * 200;
      
      lightnings.push({
        points: generateLightning(startX, 0, endX, canvas.height),
        life: 1,
        intensity: 0.5 + Math.random() * 0.5
      });
    };

    let lastLightning = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      if (now - lastLightning > 500 + Math.random() * 1500) {
        createLightning();
        lastLightning = now;
      }

      for (let i = lightnings.length - 1; i >= 0; i--) {
        const lightning = lightnings[i];
        lightning.life -= 0.05;

        if (lightning.life <= 0) {
          lightnings.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = lightning.life * lightning.intensity;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#88ccff';
        ctx.shadowBlur = 15;

        ctx.beginPath();
        for (let j = 0; j < lightning.points.length; j++) {
          const point = lightning.points[j];
          if (j === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
        ctx.stroke();

        // Add secondary bolts
        ctx.globalAlpha = lightning.life * lightning.intensity * 0.5;
        ctx.strokeStyle = '#aaddff';
        ctx.lineWidth = 1;
        ctx.stroke();

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
      style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)' }}
    />
  );
}