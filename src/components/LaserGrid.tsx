import { useEffect, useRef, useState } from "react";

export const LaserGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    let animationId: number;
    let time = 0;

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gridSpacing = 40;
      const cols = Math.ceil(canvas.width / gridSpacing);
      const rows = Math.ceil(canvas.height / gridSpacing);

      // Draw grid lines
      for (let x = 0; x <= cols; x++) {
        const xPos = x * gridSpacing;
        const intensity = Math.sin(time * 0.02 + x * 0.1) * 0.5 + 0.5;
        
        ctx.strokeStyle = `hsl(180, 100%, ${30 + intensity * 40}%)`;
        ctx.lineWidth = 1 + intensity * 2;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 5 + intensity * 10;
        
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y <= rows; y++) {
        const yPos = y * gridSpacing;
        const intensity = Math.sin(time * 0.025 + y * 0.15) * 0.5 + 0.5;
        
        ctx.strokeStyle = `hsl(180, 100%, ${30 + intensity * 40}%)`;
        ctx.lineWidth = 1 + intensity * 2;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 5 + intensity * 10;
        
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(canvas.width, yPos);
        ctx.stroke();
      }

      // Draw intersection nodes
      for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
          const xPos = x * gridSpacing;
          const yPos = y * gridSpacing;
          
          const pulse = Math.sin(time * 0.03 + x * 0.2 + y * 0.15) * 0.5 + 0.5;
          const size = 3 + pulse * 5;
          
          ctx.fillStyle = `hsl(${160 + pulse * 40}, 100%, ${50 + pulse * 30}%)`;
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 8 + pulse * 12;
          
          ctx.beginPath();
          ctx.arc(xPos, yPos, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Outer ring
          ctx.strokeStyle = `hsl(${160 + pulse * 40}, 80%, 70%)`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.arc(xPos, yPos, size + 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Traveling laser pulses
      const numPulses = 6;
      for (let i = 0; i < numPulses; i++) {
        const progress = (time * 0.01 + i / numPulses) % 1;
        const isVertical = i % 2 === 0;
        
        if (isVertical) {
          const x = (i / 2) * gridSpacing * 2;
          const y = progress * canvas.height;
          
          ctx.fillStyle = `hsl(${200 + i * 30}, 100%, 70%)`;
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 15;
          
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
          
          // Trail
          for (let j = 1; j <= 10; j++) {
            const trailY = y - j * 8;
            const alpha = 1 - j / 10;
            
            ctx.fillStyle = `hsla(${200 + i * 30}, 100%, 70%, ${alpha})`;
            ctx.shadowBlur = 8 * alpha;
            ctx.beginPath();
            ctx.arc(x, trailY, 6 * alpha, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          const x = progress * canvas.width;
          const y = ((i - 1) / 2) * gridSpacing * 2;
          
          ctx.fillStyle = `hsl(${200 + i * 30}, 100%, 70%)`;
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 15;
          
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
          
          // Trail
          for (let j = 1; j <= 10; j++) {
            const trailX = x - j * 8;
            const alpha = 1 - j / 10;
            
            ctx.fillStyle = `hsla(${200 + i * 30}, 100%, 70%, ${alpha})`;
            ctx.shadowBlur = 8 * alpha;
            ctx.beginPath();
            ctx.arc(trailX, y, 6 * alpha, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      time++;
      animationId = requestAnimationFrame(animate);
    };

    if (isHovered) {
      animate();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};