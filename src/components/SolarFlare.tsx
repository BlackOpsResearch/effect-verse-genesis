import { useEffect, useRef } from 'react';

interface Flare {
  x: number;
  y: number;
  angle: number;
  length: number;
  intensity: number;
  speed: number;
}

export function SolarFlare() {
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

    const flares: Flare[] = [];
    let time = 0;

    // Create solar flares
    for (let i = 0; i < 12; i++) {
      flares.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: (i / 12) * Math.PI * 2,
        length: 100 + Math.random() * 150,
        intensity: 0.3 + Math.random() * 0.7,
        speed: 0.01 + Math.random() * 0.02
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw sun core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
      coreGradient.addColorStop(0, '#ffff80');
      coreGradient.addColorStop(0.5, '#ff8000');
      coreGradient.addColorStop(1, '#ff4000');

      ctx.fillStyle = coreGradient;
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40 + Math.sin(time * 0.05) * 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw solar flares
      flares.forEach((flare, index) => {
        flare.angle += flare.speed;
        
        const flareLength = flare.length + Math.sin(time * 0.03 + index) * 50;
        const endX = centerX + Math.cos(flare.angle) * flareLength;
        const endY = centerY + Math.sin(flare.angle) * flareLength;

        // Create flare gradient
        const gradient = ctx.createLinearGradient(centerX, centerY, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 100, ${flare.intensity})`);
        gradient.addColorStop(0.3, `rgba(255, 150, 0, ${flare.intensity * 0.8})`);
        gradient.addColorStop(0.7, `rgba(255, 80, 0, ${flare.intensity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        // Draw main flare
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 8 + Math.sin(time * 0.1 + index) * 4;
        ctx.shadowColor = '#ff8000';
        ctx.shadowBlur = 20;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        
        // Add some curve to the flare
        const midX = centerX + Math.cos(flare.angle) * (flareLength * 0.6);
        const midY = centerY + Math.sin(flare.angle) * (flareLength * 0.6);
        const curveX = midX + Math.sin(flare.angle + Math.PI / 2) * (Math.sin(time * 0.02 + index) * 30);
        const curveY = midY + Math.cos(flare.angle + Math.PI / 2) * (Math.sin(time * 0.02 + index) * 30);
        
        ctx.quadraticCurveTo(curveX, curveY, endX, endY);
        ctx.stroke();

        // Draw secondary smaller flares
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      time += 1;
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
      style={{ background: 'radial-gradient(circle, #0a0a1a, #000)' }}
    />
  );
}