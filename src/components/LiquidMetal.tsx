import React, { useEffect, useRef } from 'react';

interface LiquidMetalProps {
  className?: string;
}

export function LiquidMetal({ className = "" }: LiquidMetalProps) {
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

    let time = 0;
    const metaballCount = 6;
    const metaballs = Array.from({ length: metaballCount }, (_, i) => ({
      x: width / 2 + Math.cos(i * Math.PI * 2 / metaballCount) * 100,
      y: height / 2 + Math.sin(i * Math.PI * 2 / metaballCount) * 100,
      radius: 40 + Math.random() * 30,
      speed: 0.5 + Math.random() * 1,
      phase: i * Math.PI * 2 / metaballCount
    }));

    const animate = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      time += 0.02;

      // Update metaballs
      metaballs.forEach((ball, i) => {
        ball.x = width / 2 + Math.cos(time * ball.speed + ball.phase) * (80 + Math.sin(time * 0.5) * 40);
        ball.y = height / 2 + Math.sin(time * ball.speed + ball.phase) * (60 + Math.cos(time * 0.3) * 30);
        ball.radius = 30 + Math.sin(time * 2 + i) * 15;
      });

      // Create liquid metal effect using metaballs
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          let sum = 0;
          
          metaballs.forEach(ball => {
            const dx = x - ball.x;
            const dy = y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0) {
              sum += ball.radius / distance;
            }
          });

          // Threshold for liquid metal effect
          if (sum > 1) {
            const index = (y * width + x) * 4;
            const intensity = Math.min(255, sum * 30);
            
            // Metallic silver-blue color
            data[index] = intensity * 0.7;     // Red
            data[index + 1] = intensity * 0.8; // Green  
            data[index + 2] = intensity;       // Blue
            data[index + 3] = 255;             // Alpha

            // Add highlights
            if (sum > 1.5) {
              data[index] = 255;
              data[index + 1] = 255;
              data[index + 2] = 255;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Add liquid metal highlights
      metaballs.forEach(ball => {
        const gradient = ctx.createRadialGradient(
          ball.x, ball.y, 0,
          ball.x, ball.y, ball.radius * 0.6
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(0.7, 'rgba(200, 220, 255, 0.1)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          ball.x - ball.radius, 
          ball.y - ball.radius, 
          ball.radius * 2, 
          ball.radius * 2
        );
      });

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
        style={{ background: 'linear-gradient(45deg, #1a1a2e, #16213e)' }}
      />
    </div>
  );
}