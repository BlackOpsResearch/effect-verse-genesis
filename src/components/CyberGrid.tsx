import { useEffect, useRef, useState } from 'react';

export function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gridSize = 40;
    const lines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
      pulse: number;
    }> = [];

    // Generate grid lines
    for (let x = 0; x <= canvas.offsetWidth; x += gridSize) {
      lines.push({
        x1: x,
        y1: 0,
        x2: x,
        y2: canvas.offsetHeight,
        opacity: Math.random() * 0.3 + 0.1,
        pulse: Math.random() * Math.PI * 2
      });
    }

    for (let y = 0; y <= canvas.offsetHeight; y += gridSize) {
      lines.push({
        x1: 0,
        y1: y,
        x2: canvas.offsetWidth,
        y2: y,
        opacity: Math.random() * 0.3 + 0.1,
        pulse: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const animate = () => {
      if (!isHovered) {
        requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.02;

      lines.forEach((line, index) => {
        const pulseIntensity = Math.sin(time + line.pulse) * 0.3 + 0.7;
        const opacity = line.opacity * pulseIntensity;
        
        ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();

        // Add glowing nodes at intersections
        if (index % 5 === 0) {
          const nodeX = line.x1 || line.x2;
          const nodeY = line.y1 || line.y2;
          
          ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 2})`;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 2 * pulseIntensity, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}