import { useEffect, useRef, useState } from "react";

export const ElectricWeb = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    interface Node {
      x: number;
      y: number;
      charge: number;
      connections: number[];
    }

    const nodes: Node[] = [];
    const numNodes = 8;
    let animationId: number;
    let time = 0;

    // Initialize nodes
    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * Math.PI * 2;
      const radius = 80;
      nodes.push({
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        charge: Math.random() * 100 + 50,
        connections: []
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      const numConnections = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * numNodes);
        if (targetIndex !== i && !node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);
        }
      }
    });

    const drawLightning = (x1: number, y1: number, x2: number, y2: number, intensity: number) => {
      const segments = 8;
      const points = [{ x: x1, y: y1 }];

      for (let i = 1; i < segments; i++) {
        const t = i / segments;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        const offset = (Math.random() - 0.5) * 20 * intensity;
        
        points.push({
          x: x + offset,
          y: y + offset
        });
      }
      points.push({ x: x2, y: y2 });

      ctx.strokeStyle = `hsl(${180 + Math.sin(time * 0.1) * 60}, 100%, ${50 + intensity * 50}%)`;
      ctx.lineWidth = intensity * 3;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      // Add glow effect
      ctx.lineWidth = intensity;
      ctx.shadowBlur = 20;
      ctx.stroke();
    };

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      nodes.forEach((node, i) => {
        const angle = (i / numNodes) * Math.PI * 2 + time * 0.01;
        const radius = 80 + Math.sin(time * 0.02 + i) * 20;
        node.x = canvas.width / 2 + Math.cos(angle) * radius;
        node.y = canvas.height / 2 + Math.sin(angle) * radius;
        node.charge = 50 + Math.sin(time * 0.05 + i) * 50;
      });

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex];
          const distance = Math.sqrt(
            (target.x - node.x) ** 2 + (target.y - node.y) ** 2
          );
          const intensity = Math.min(node.charge, target.charge) / 100;
          
          if (Math.random() < 0.3) { // Random lightning strikes
            drawLightning(node.x, node.y, target.x, target.y, intensity);
          }
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        const pulseSize = 5 + (node.charge / 100) * 10;
        
        ctx.fillStyle = `hsl(${200 + Math.sin(time * 0.1) * 60}, 80%, 60%)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 15;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Inner core
        ctx.fillStyle = "white";
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

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