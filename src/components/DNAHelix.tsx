import { useEffect, useRef, useState } from "react";

export const DNAHelix = () => {
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

      const centerX = canvas.width / 2;
      const helixHeight = canvas.height;
      const radius = 60;
      const segments = 100;

      // Draw DNA strands
      for (let i = 0; i < segments; i++) {
        const y = (i / segments) * helixHeight;
        const angle1 = (i * 0.3) + time * 0.02;
        const angle2 = angle1 + Math.PI;

        const x1 = centerX + Math.cos(angle1) * radius;
        const x2 = centerX + Math.cos(angle2) * radius;

        // Base pairs
        ctx.strokeStyle = `hsl(${(i * 3 + time) % 360}, 70%, 60%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        // Backbone
        if (i > 0) {
          const prevY = ((i - 1) / segments) * helixHeight;
          const prevAngle1 = ((i - 1) * 0.3) + time * 0.02;
          const prevAngle2 = prevAngle1 + Math.PI;
          const prevX1 = centerX + Math.cos(prevAngle1) * radius;
          const prevX2 = centerX + Math.cos(prevAngle2) * radius;

          ctx.strokeStyle = "hsl(200, 80%, 50%)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(prevX1, prevY);
          ctx.lineTo(x1, y);
          ctx.stroke();

          ctx.strokeStyle = "hsl(320, 80%, 50%)";
          ctx.beginPath();
          ctx.moveTo(prevX2, prevY);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }

        // Nucleotides
        ctx.fillStyle = `hsl(${(i * 4 + time * 2) % 360}, 80%, 60%)`;
        ctx.beginPath();
        ctx.arc(x1, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsl(${(i * 4 + time * 2 + 180) % 360}, 80%, 60%)`;
        ctx.beginPath();
        ctx.arc(x2, y, 4, 0, Math.PI * 2);
        ctx.fill();
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