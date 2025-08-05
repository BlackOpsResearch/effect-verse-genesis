import React, { useEffect, useRef } from 'react';

interface LightTrail {
  points: Array<{ x: number; y: number; time: number }>;
  hue: number;
  speed: number;
}

export function LightTrails() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const trails: LightTrail[] = [];
    let time = 0;

    // Create initial trails
    for (let i = 0; i < 5; i++) {
      trails.push({
        points: [],
        hue: Math.random() * 360,
        speed: 0.5 + Math.random() * 2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.02;

      trails.forEach((trail, trailIndex) => {
        // Add new point to trail
        const angle = time * trail.speed + trailIndex * 2;
        const x = canvas.width / 2 + Math.cos(angle) * (100 + trailIndex * 50);
        const y = canvas.height / 2 + Math.sin(angle * 0.7) * (80 + trailIndex * 30);
        
        trail.points.push({ x, y, time: Date.now() });

        // Remove old points
        const maxAge = 2000;
        trail.points = trail.points.filter(point => 
          Date.now() - point.time < maxAge
        );

        // Draw trail
        if (trail.points.length > 1) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          for (let i = 1; i < trail.points.length; i++) {
            const point = trail.points[i];
            const prevPoint = trail.points[i - 1];
            const age = (Date.now() - point.time) / maxAge;
            const alpha = 1 - age;
            const width = (1 - age) * 3;

            ctx.globalAlpha = alpha;
            ctx.strokeStyle = `hsl(${trail.hue}, 100%, 60%)`;
            ctx.lineWidth = width;
            
            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();

            // Glow effect
            ctx.shadowColor = `hsl(${trail.hue}, 100%, 50%)`;
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        trail.hue = (trail.hue + 0.5) % 360;
      });

      ctx.globalAlpha = 1;
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
      style={{ background: 'linear-gradient(45deg, #0a0a2e, #2e0a2e)' }}
    />
  );
}