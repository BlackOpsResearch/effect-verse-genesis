import { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  activation: number;
  pulseTime: number;
}

interface Connection {
  from: number;
  to: number;
  weight: number;
  activity: number;
  lastPulse: number;
}

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes: Node[] = [];
    let connections: Connection[] = [];
    const nodeCount = 80;
    const maxConnections = 4;

    const colors = {
      node: 'hsl(260, 100%, 65%)',
      activeNode: 'hsl(185, 100%, 70%)',
      connection: 'hsl(260, 100%, 65%)',
      activeConnection: 'hsl(320, 100%, 70%)',
      pulse: 'hsl(195, 100%, 80%)'
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createNetwork = () => {
      nodes = [];
      connections = [];

      // Create nodes
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          connections: [],
          activation: Math.random(),
          pulseTime: 0
        });
      }

      // Create connections
      nodes.forEach((node, i) => {
        const connectionCount = Math.floor(Math.random() * maxConnections) + 1;
        const availableNodes = nodes
          .map((_, index) => index)
          .filter(index => index !== i)
          .sort(() => Math.random() - 0.5)
          .slice(0, connectionCount);

        availableNodes.forEach(targetIndex => {
          if (!node.connections.includes(targetIndex)) {
            node.connections.push(targetIndex);
            connections.push({
              from: i,
              to: targetIndex,
              weight: Math.random() * 0.5 + 0.3,
              activity: 0,
              lastPulse: 0
            });
          }
        });
      });

      setIsLoaded(true);
    };

    const updateNetwork = (time: number) => {
      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Update activation with smooth waves
        node.activation = (Math.sin(time * 0.001 + node.x * 0.01) + 1) * 0.5;
        node.pulseTime = time;
      });

      // Update connections and propagate signals
      connections.forEach(conn => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        // Calculate distance for connection strength
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Propagate activity based on source node activation
        if (fromNode.activation > 0.7 && time - conn.lastPulse > 1000) {
          conn.activity = 1.0;
          conn.lastPulse = time;
          toNode.activation = Math.min(1, toNode.activation + 0.3);
        }

        // Decay activity
        conn.activity = Math.max(0, conn.activity - 0.02);
      });
    };

    const drawNetwork = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(conn => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) { // Only draw nearby connections
          ctx.save();
          
          const opacity = Math.max(0.1, (200 - distance) / 200 * 0.4);
          const activity = conn.activity;
          
          if (activity > 0.1) {
            // Active connection with pulse effect
            ctx.strokeStyle = colors.activeConnection.replace('70%', `70%, ${opacity + activity * 0.6}`);
            ctx.lineWidth = 1 + activity * 2;
            
            // Draw pulse animation
            const pulseProgress = (time - conn.lastPulse) / 1000;
            if (pulseProgress < 1) {
              const pulseX = fromNode.x + dx * pulseProgress;
              const pulseY = fromNode.y + dy * pulseProgress;
              
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 3 + Math.sin(pulseProgress * Math.PI) * 2, 0, Math.PI * 2);
              ctx.fillStyle = colors.pulse.replace('80%', `80%, ${1 - pulseProgress}`);
              ctx.fill();
            }
          } else {
            // Normal connection
            ctx.strokeStyle = colors.connection.replace('65%', `65%, ${opacity}`);
            ctx.lineWidth = 0.5;
          }
          
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        ctx.save();
        
        const baseSize = 2;
        const activation = node.activation;
        const size = baseSize + activation * 3;
        
        // Glow effect
        ctx.shadowBlur = 15 + activation * 10;
        ctx.shadowColor = activation > 0.7 ? colors.activeNode : colors.node;
        
        // Node body
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = activation > 0.7 ? colors.activeNode : colors.node;
        ctx.globalAlpha = 0.3 + activation * 0.7;
        ctx.fill();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.globalAlpha = activation * 0.8;
        ctx.fill();
        
        ctx.restore();
      });
    };

    const animate = (time: number) => {
      updateNetwork(time);
      drawNetwork(time);
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createNetwork();
    };

    resizeCanvas();
    createNetwork();
    animate(0);

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{ zIndex: -2 }}
      />
      {!isLoaded && (
        <div className="fixed inset-0 bg-background animate-pulse" style={{ zIndex: -1 }} />
      )}
    </>
  );
}
