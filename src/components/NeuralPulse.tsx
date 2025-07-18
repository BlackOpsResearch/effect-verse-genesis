import React, { useRef, useEffect, useState } from 'react';

interface Node {
  x: number;
  y: number;
  connections: number[];
  pulse: number;
  pulseSpeed: number;
}

export function NeuralPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>();

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
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes
    const nodeCount = 20;
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => {
      const node: Node = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.05 + Math.random() * 0.05
      };

      // Create connections to nearby nodes
      for (let j = 0; j < nodeCount; j++) {
        if (i !== j && Math.random() > 0.7) {
          node.connections.push(j);
        }
      }

      return node;
    });

    const animate = () => {
      if (!isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update pulses
      nodesRef.current.forEach(node => {
        node.pulse += node.pulseSpeed;
      });

      // Draw connections
      nodesRef.current.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const connectedNode = nodesRef.current[connectionIndex];
          const pulseIntensity = Math.sin(node.pulse) * 0.5 + 0.5;
          
          ctx.strokeStyle = `rgba(0, 255, 255, ${pulseIntensity * 0.6})`;
          ctx.lineWidth = 1 + pulseIntensity * 2;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();
        });
      });

      // Draw nodes
      nodesRef.current.forEach(node => {
        const pulseIntensity = Math.sin(node.pulse) * 0.5 + 0.5;
        const radius = 3 + pulseIntensity * 5;
        
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
        gradient.addColorStop(0, `rgba(0, 255, 255, ${pulseIntensity})`);
        gradient.addColorStop(1, 'rgba(0, 100, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: '#000' }}
    />
  );
}