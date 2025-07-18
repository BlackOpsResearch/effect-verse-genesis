import React, { useRef, useEffect, useState } from 'react';

interface FieldLine {
  points: { x: number; y: number }[];
  strength: number;
  phase: number;
}

export function ElectromagneticField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fieldLinesRef = useRef<FieldLine[]>([]);
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

    // Initialize field lines
    fieldLinesRef.current = Array.from({ length: 30 }, (_, i) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const angle = (i / 30) * Math.PI * 2;
      const radius = 100;
      
      return {
        points: Array.from({ length: 50 }, (_, j) => {
          const distance = j * 5;
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          return { x, y };
        }),
        strength: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2
      };
    });

    const animate = () => {
      if (!isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      fieldLinesRef.current.forEach(line => {
        line.phase += 0.02;
        
        ctx.beginPath();
        
        line.points.forEach((point, i) => {
          if (i >= line.points.length - 1) return;
          
          const intensity = Math.sin(line.phase + i * 0.1) * line.strength;
          const nextPoint = line.points[i + 1];
          
          const waveY = point.y + Math.sin(time * 2 + i * 0.1) * 20 * intensity;
          const nextWaveY = nextPoint.y + Math.sin(time * 2 + (i + 1) * 0.1) * 20 * intensity;
          
          if (i === 0) {
            ctx.moveTo(point.x, waveY);
          } else {
            ctx.lineTo(point.x, waveY);
          }
        });
        
        const alpha = Math.abs(Math.sin(line.phase)) * 0.8;
        ctx.strokeStyle = `rgba(100, 150, 255, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw field source
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const pulseRadius = 20 + Math.sin(time * 3) * 10;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius);
      gradient.addColorStop(0, 'rgba(255, 100, 100, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 100, 100, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

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