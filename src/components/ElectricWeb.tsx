import { useEffect, useRef } from 'react';

export function ElectricWeb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      charge: number;
    }> = [];

    // Create nodes
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * canvas.width / 2,
        y: Math.random() * canvas.height / 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        charge: Math.random() * 0.8 + 0.2
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

      // Update nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width / 2) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height / 2) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width / 2, node.x));
        node.y = Math.max(0, Math.min(canvas.height / 2, node.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          const distance = Math.sqrt(
            Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
          );

          if (distance < 80) {
            const opacity = (80 - distance) / 80;
            const intensity = (nodeA.charge + nodeB.charge) / 2;
            
            // Create electric arc
            ctx.strokeStyle = `hsla(${180 + Math.sin(Date.now() * 0.01) * 60}, 80%, 60%, ${opacity * intensity})`;
            ctx.lineWidth = 1 + intensity;
            ctx.shadowColor = `hsl(${180 + Math.sin(Date.now() * 0.01) * 60}, 80%, 60%)`;
            ctx.shadowBlur = 5;
            
            ctx.beginPath();
            
            // Create jagged lightning effect
            const segments = 5;
            for (let k = 0; k <= segments; k++) {
              const t = k / segments;
              const x = nodeA.x + (nodeB.x - nodeA.x) * t;
              const y = nodeA.y + (nodeB.y - nodeA.y) * t;
              
              // Add random offset for lightning effect
              const offsetX = (Math.random() - 0.5) * 10 * (1 - Math.abs(t - 0.5) * 2);
              const offsetY = (Math.random() - 0.5) * 10 * (1 - Math.abs(t - 0.5) * 2);
              
              if (k === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x + offsetX, y + offsetY);
              }
            }
            
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
        gradient.addColorStop(0, `hsla(200, 100%, 80%, ${node.charge})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(200, 100%, 90%, ${node.charge})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'linear-gradient(45deg, #000005 0%, #000015 100%)' }}
    />
  );
}
