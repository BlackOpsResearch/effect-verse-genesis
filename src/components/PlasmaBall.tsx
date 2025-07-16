import { useEffect, useRef } from 'react';

interface Arc {
  startAngle: number;
  endAngle: number;
  radius: number;
  intensity: number;
  speed: number;
}

export function PlasmaBall() {
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

    const arcs: Arc[] = [];
    let time = 0;

    // Create initial arcs
    for (let i = 0; i < 8; i++) {
      arcs.push({
        startAngle: Math.random() * Math.PI * 2,
        endAngle: Math.random() * Math.PI * 2,
        radius: 50 + Math.random() * 100,
        intensity: 0.5 + Math.random() * 0.5,
        speed: 0.02 + Math.random() * 0.03
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const coreRadius = 40;

      // Draw core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      coreGradient.addColorStop(0, `rgba(255, 100, 255, ${0.8 + Math.sin(time * 0.1) * 0.2})`);
      coreGradient.addColorStop(0.5, `rgba(100, 255, 255, ${0.6 + Math.sin(time * 0.15) * 0.2})`);
      coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw plasma arcs
      arcs.forEach((arc, index) => {
        arc.startAngle += arc.speed;
        arc.endAngle += arc.speed * 1.2;

        const arcRadius = arc.radius + Math.sin(time * 0.05 + index) * 20;
        const startX = centerX + Math.cos(arc.startAngle) * coreRadius;
        const startY = centerY + Math.sin(arc.startAngle) * coreRadius;
        const endX = centerX + Math.cos(arc.endAngle) * arcRadius;
        const endY = centerY + Math.sin(arc.endAngle) * arcRadius;

        // Create lightning-like path
        const steps = 20;
        const points = [];
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const x = startX + (endX - startX) * t + (Math.random() - 0.5) * 15 * (1 - t);
          const y = startY + (endY - startY) * t + (Math.random() - 0.5) * 15 * (1 - t);
          points.push({ x, y });
        }

        ctx.globalAlpha = arc.intensity * (0.5 + Math.sin(time * 0.1 + index) * 0.3);
        ctx.strokeStyle = `hsl(${280 + index * 20}, 100%, 70%)`;
        ctx.lineWidth = 2 + Math.sin(time * 0.1 + index) * 1;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
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
      style={{ background: 'radial-gradient(circle, #0a0a0a, #000)' }}
    />
  );
}