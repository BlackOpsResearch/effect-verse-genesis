import React, { useEffect, useRef } from 'react';

export function FluidWarp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;
    const gridSize = 20;

    const noise = (x: number, y: number): number => {
      return Math.sin(x * 0.1) * Math.cos(y * 0.1);
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Create fluid distortion grid
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const warpX = noise(x + time * 100, y) * 30;
          const warpY = noise(x, y + time * 80) * 25;
          
          const finalX = x + warpX;
          const finalY = y + warpY;

          const intensity = Math.sin(time * 3 + x * 0.01 + y * 0.01) * 0.5 + 0.5;
          const hue = (time * 50 + x * 0.5 + y * 0.3) % 360;

          const gradient = ctx.createRadialGradient(
            finalX, finalY, 0,
            finalX, finalY, gridSize
          );
          gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, ${intensity * 0.8})`);
          gradient.addColorStop(1, `hsla(${hue}, 80%, 40%, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(finalX, finalY, gridSize / 2, 0, Math.PI * 2);
          ctx.fill();

          // Flow lines
          const nextWarpX = noise(x + gridSize + time * 100, y) * 30;
          const nextWarpY = noise(x, y + gridSize + time * 80) * 25;
          
          ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${intensity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(finalX, finalY);
          ctx.lineTo(x + gridSize + nextWarpX, y + nextWarpY);
          ctx.stroke();
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
      style={{ background: 'linear-gradient(45deg, #001122, #220011)' }}
    />
  );
}