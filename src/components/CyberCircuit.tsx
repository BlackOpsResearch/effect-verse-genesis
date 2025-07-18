import React, { useRef, useEffect, useState } from 'react';

interface CircuitNode {
  x: number;
  y: number;
  type: 'junction' | 'resistor' | 'capacitor';
  connections: number[];
  active: boolean;
  pulse: number;
}

interface Signal {
  fromNode: number;
  toNode: number;
  progress: number;
  intensity: number;
}

export function CyberCircuit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const nodesRef = useRef<CircuitNode[]>([]);
  const signalsRef = useRef<Signal[]>([]);
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

    // Initialize circuit nodes
    const nodeCount = 25;
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => {
      const types: ('junction' | 'resistor' | 'capacitor')[] = ['junction', 'resistor', 'capacitor'];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        type: types[Math.floor(Math.random() * types.length)],
        connections: [],
        active: Math.random() > 0.5,
        pulse: Math.random() * Math.PI * 2
      };
    });

    // Create connections
    nodesRef.current.forEach((node, i) => {
      for (let j = i + 1; j < nodeCount; j++) {
        const other = nodesRef.current[j];
        const distance = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
        if (distance < 120 && Math.random() > 0.6) {
          node.connections.push(j);
          other.connections.push(i);
        }
      }
    });

    signalsRef.current = [];

    const animate = () => {
      if (!isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update pulses
      nodesRef.current.forEach(node => {
        node.pulse += 0.05;
      });

      // Generate new signals
      if (Math.random() > 0.95) {
        const activeNodes = nodesRef.current.filter(n => n.active);
        if (activeNodes.length > 1) {
          const fromIndex = nodesRef.current.indexOf(activeNodes[Math.floor(Math.random() * activeNodes.length)]);
          const fromNode = nodesRef.current[fromIndex];
          if (fromNode.connections.length > 0) {
            const toIndex = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];
            signalsRef.current.push({
              fromNode: fromIndex,
              toNode: toIndex,
              progress: 0,
              intensity: Math.random() * 0.8 + 0.2
            });
          }
        }
      }

      // Draw connections (circuit traces)
      nodesRef.current.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const connectedNode = nodesRef.current[connectionIndex];
          
          ctx.strokeStyle = 'rgba(0, 255, 100, 0.3)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();
        });
      });

      // Update and draw signals
      signalsRef.current = signalsRef.current.filter(signal => {
        signal.progress += 0.02;
        
        if (signal.progress >= 1) {
          nodesRef.current[signal.toNode].active = true;
          return false;
        }

        const fromNode = nodesRef.current[signal.fromNode];
        const toNode = nodesRef.current[signal.toNode];
        
        const x = fromNode.x + (toNode.x - fromNode.x) * signal.progress;
        const y = fromNode.y + (toNode.y - fromNode.y) * signal.progress;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, `rgba(0, 255, 255, ${signal.intensity})`);
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        return true;
      });

      // Draw nodes
      nodesRef.current.forEach(node => {
        const pulseIntensity = Math.sin(node.pulse) * 0.5 + 0.5;
        let color = node.active ? 'rgba(0, 255, 100, 0.8)' : 'rgba(100, 100, 100, 0.5)';
        
        ctx.fillStyle = color;
        
        switch (node.type) {
          case 'junction':
            ctx.beginPath();
            ctx.arc(node.x, node.y, 4 + pulseIntensity * 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'resistor':
            ctx.fillRect(node.x - 6, node.y - 3, 12, 6);
            break;
          case 'capacitor':
            ctx.fillRect(node.x - 4, node.y - 6, 2, 12);
            ctx.fillRect(node.x + 2, node.y - 6, 2, 12);
            break;
        }
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