import { useEffect, useRef } from 'react';

export function OceanWaves() {
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

    let time = 0;
    const waves = [
      { amplitude: 30, frequency: 0.02, phase: 0, speed: 0.03, color: 'rgba(64, 164, 223, 0.8)' },
      { amplitude: 25, frequency: 0.025, phase: Math.PI / 3, speed: 0.025, color: 'rgba(100, 200, 255, 0.6)' },
      { amplitude: 20, frequency: 0.03, phase: Math.PI / 2, speed: 0.04, color: 'rgba(150, 220, 255, 0.4)' },
    ];

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#001122');
      gradient.addColorStop(0.5, '#003366');
      gradient.addColorStop(1, '#006699');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height * 0.6;

      waves.forEach((wave, index) => {
        ctx.fillStyle = wave.color;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 2) {
          const y = centerY + 
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
            Math.sin(x * 0.01 + time * 0.02) * 10; // Secondary wave
          
          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Add foam effect on top wave
        if (index === 0) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 5;
          
          ctx.beginPath();
          for (let x = 0; x <= canvas.width; x += 2) {
            const y = centerY + 
              Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
              Math.sin(x * 0.01 + time * 0.02) * 10;
            
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
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
    />
  );
}