import { useEffect, useRef } from 'react';

export function AuroraWaves() {
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
      { frequency: 0.01, amplitude: 80, speed: 0.02, color: [0, 255, 150], offset: 0 },
      { frequency: 0.015, amplitude: 60, speed: 0.025, color: [100, 200, 255], offset: Math.PI },
      { frequency: 0.008, amplitude: 100, speed: 0.015, color: [200, 100, 255], offset: Math.PI / 2 },
      { frequency: 0.012, amplitude: 70, speed: 0.03, color: [255, 150, 200], offset: Math.PI * 1.5 }
    ];

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 10, 25, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, waveIndex) => {
        const points: { x: number; y: number }[] = [];
        
        // Generate wave points
        for (let x = 0; x <= canvas.width; x += 4) {
          const y1 = canvas.height * 0.3 + Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude;
          const y2 = y1 + Math.sin(x * wave.frequency * 1.5 + time * wave.speed * 0.7 + wave.offset) * (wave.amplitude * 0.3);
          const y3 = y2 + Math.sin(x * wave.frequency * 2 + time * wave.speed * 0.5 + wave.offset) * (wave.amplitude * 0.15);
          
          points.push({ x, y: y3 });
        }

        // Create gradient for aurora effect
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const [r, g, b] = wave.color;
        const intensity = 0.6 + Math.sin(time * 0.01 + waveIndex) * 0.3;
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${intensity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${intensity * 0.4})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        // Draw filled wave
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        points.forEach((point, index) => {
          if (index === 0) {
            ctx.lineTo(point.x, point.y);
          } else {
            const prevPoint = points[index - 1];
            const cpx = (prevPoint.x + point.x) / 2;
            const cpy = (prevPoint.y + point.y) / 2;
            ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpx, cpy);
          }
        });
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Draw wave outline with glow
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${intensity})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
        ctx.shadowBlur = 20;
        
        ctx.beginPath();
        points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            const prevPoint = points[index - 1];
            const cpx = (prevPoint.x + point.x) / 2;
            const cpy = (prevPoint.y + point.y) / 2;
            ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpx, cpy);
          }
        });
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Add particle effects
        if (Math.random() > 0.95) {
          const particleX = Math.random() * canvas.width;
          const particleY = canvas.height * 0.3 + Math.sin(particleX * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude;
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
          ctx.fill();
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
      style={{ background: 'linear-gradient(180deg, #0a0a1a, #1a0a2a, #0a1a0a)' }}
    />
  );
}