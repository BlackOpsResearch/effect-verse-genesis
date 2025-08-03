import { useEffect, useRef, useState } from 'react';

export function SineWaveEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const waves = [
      { amplitude: 30, frequency: 0.02, speed: 0.03, color: 'hsl(185, 100%, 70%)', width: 2 },
      { amplitude: 20, frequency: 0.03, speed: 0.02, color: 'hsl(260, 100%, 65%)', width: 1.5 },
      { amplitude: 25, frequency: 0.025, speed: 0.025, color: 'hsl(320, 100%, 70%)', width: 1 },
    ];

    const animate = () => {
      if (!isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;

      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.width;
        ctx.shadowBlur = 10;
        ctx.shadowColor = wave.color;

        let firstPoint = true;
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = centerY + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
          
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  return (
    <div 
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="absolute inset-0 w-full h-full opacity-70"
      />
    </div>
  );
}