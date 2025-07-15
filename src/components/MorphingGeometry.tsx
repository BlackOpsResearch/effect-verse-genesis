import { useEffect, useRef } from 'react';

export function MorphingGeometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    
    // Define shape vertices for morphing
    const shapes = [
      // Triangle
      [
        { x: 0, y: -80 },
        { x: -70, y: 40 },
        { x: 70, y: 40 }
      ],
      // Square
      [
        { x: -50, y: -50 },
        { x: 50, y: -50 },
        { x: 50, y: 50 },
        { x: -50, y: 50 }
      ],
      // Pentagon
      [
        { x: 0, y: -60 },
        { x: 57, y: -18 },
        { x: 35, y: 48 },
        { x: -35, y: 48 },
        { x: -57, y: -18 }
      ],
      // Hexagon
      [
        { x: 0, y: -60 },
        { x: 52, y: -30 },
        { x: 52, y: 30 },
        { x: 0, y: 60 },
        { x: -52, y: 30 },
        { x: -52, y: -30 }
      ]
    ];

    let time = 0;
    let currentShapeIndex = 0;
    let morphProgress = 0;

    const interpolatePoints = (p1: any, p2: any, t: number) => ({
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t
    });

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.008;
      morphProgress += 0.005;

      if (morphProgress >= 1) {
        morphProgress = 0;
        currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
      }

      const currentShape = shapes[currentShapeIndex];
      const nextShape = shapes[(currentShapeIndex + 1) % shapes.length];
      const easedProgress = easeInOutCubic(morphProgress);

      // Create morphed vertices
      const maxVertices = Math.max(currentShape.length, nextShape.length);
      const morphedVertices = [];

      for (let i = 0; i < maxVertices; i++) {
        const currentVertex = currentShape[i % currentShape.length];
        const nextVertex = nextShape[i % nextShape.length];
        
        morphedVertices.push(
          interpolatePoints(currentVertex, nextVertex, easedProgress)
        );
      }

      // Draw main shape with glow
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Outer glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00ffff';
      
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      morphedVertices.forEach((vertex, index) => {
        const x = vertex.x + Math.sin(time + index) * 3;
        const y = vertex.y + Math.cos(time + index) * 3;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.closePath();
      ctx.stroke();

      // Inner gradient fill
      ctx.shadowBlur = 0;
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 80);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw connecting nodes
      morphedVertices.forEach((vertex, index) => {
        const pulseSize = 2 + Math.sin(time * 2 + index) * 1;
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // Draw mathematical formula overlay
      ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
      ctx.font = '12px monospace';
      ctx.fillText(`morph(t) = ${Math.round(morphProgress * 100)}%`, 10, 20);
      ctx.fillText(`shape: ${currentShapeIndex + 1}/${shapes.length}`, 10, 35);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}