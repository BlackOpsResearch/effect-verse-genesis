import React, { useEffect, useRef } from 'react';

interface FiberOpticsProps {
  className?: string;
}

export function FiberOptics({ className = "" }: FiberOpticsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    const fibers = Array.from({ length: 20 }, (_, i) => {
      const points = [];
      for (let j = 0; j <= 50; j++) {
        points.push({
          x: (j / 50) * width,
          y: height / 2 + Math.sin(j * 0.1 + i) * 20,
          baseY: height / 2 + Math.sin(j * 0.1 + i) * 20
        });
      }
      return {
        points,
        color: `hsl(${180 + i * 15}, 80%, 60%)`,
        lightPos: 0,
        speed: 0.5 + Math.random() * 2
      };
    });

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 5, 15, 0.1)';
      ctx.fillRect(0, 0, width, height);

      time += 0.02;

      fibers.forEach((fiber, fiberIndex) => {
        // Update fiber wave motion
        fiber.points.forEach((point, i) => {
          point.y = point.baseY + Math.sin(time * 2 + i * 0.1 + fiberIndex) * 5;
        });

        // Draw fiber core
        ctx.strokeStyle = fiber.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.moveTo(fiber.points[0].x, fiber.points[0].y);
        for (let i = 1; i < fiber.points.length; i++) {
          ctx.lineTo(fiber.points[i].x, fiber.points[i].y);
        }
        ctx.stroke();

        // Update light position
        fiber.lightPos += fiber.speed;
        if (fiber.lightPos > fiber.points.length - 1) {
          fiber.lightPos = 0;
        }

        // Draw light pulse
        const lightIndex = Math.floor(fiber.lightPos);
        const fraction = fiber.lightPos - lightIndex;
        
        if (lightIndex < fiber.points.length - 1) {
          const currentPoint = fiber.points[lightIndex];
          const nextPoint = fiber.points[lightIndex + 1];
          
          const lightX = currentPoint.x + (nextPoint.x - currentPoint.x) * fraction;
          const lightY = currentPoint.y + (nextPoint.y - currentPoint.y) * fraction;

          // Light glow
          const gradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, 15);
          gradient.addColorStop(0, fiber.color);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.globalAlpha = 0.8;
          ctx.fillRect(lightX - 15, lightY - 15, 30, 30);

          // Light core
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(lightX, lightY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(135deg, #000511, #001122)' }}
      />
    </div>
  );
}