import { useEffect, useRef, useState } from "react";

export const CrystalGrid = () => {
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

      ctx.fillStyle = "rgba(0, 0, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gridSize = 30;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const centerX = x * gridSize + gridSize / 2;
          const centerY = y * gridSize + gridSize / 2;
          
          const wave = Math.sin((x + time * 0.02) * 0.5) * Math.cos((y + time * 0.015) * 0.5);
          const size = (wave + 1) * 8 + 5;
          const hue = (wave * 180 + time + x * 10 + y * 15) % 360;
          
          // Crystal facets
          const facets = 6;
          ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
          ctx.strokeStyle = `hsl(${hue}, 90%, 80%)`;
          ctx.lineWidth = 2;
          
          ctx.beginPath();
          for (let i = 0; i < facets; i++) {
            const angle = (i / facets) * Math.PI * 2 + time * 0.01;
            const x1 = centerX + Math.cos(angle) * size;
            const y1 = centerY + Math.sin(angle) * size;
            
            if (i === 0) {
              ctx.moveTo(x1, y1);
            } else {
              ctx.lineTo(x1, y1);
            }
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          
          // Inner glow
          ctx.fillStyle = `hsl(${hue}, 80%, 80%)`;
          ctx.beginPath();
          ctx.arc(centerX, centerY, size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

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