import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  color: string;
}

export function VoronoiCells() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    const points: Point[] = [];

    for (let i = 0; i < 12; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color: colors[i % colors.length]
      });
    }

    let time = 0;

    const draw = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      // Update point positions
      points.forEach((point, i) => {
        point.x += Math.sin(time + i) * 0.5;
        point.y += Math.cos(time + i * 0.7) * 0.5;
        
        if (point.x < 0) point.x = canvas.width;
        if (point.x > canvas.width) point.x = 0;
        if (point.y < 0) point.y = canvas.height;
        if (point.y > canvas.height) point.y = 0;
      });

      for (let x = 0; x < canvas.width; x += 2) {
        for (let y = 0; y < canvas.height; y += 2) {
          let minDist = Infinity;
          let closestPoint = points[0];

          points.forEach(point => {
            const dist = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
            if (dist < minDist) {
              minDist = dist;
              closestPoint = point;
            }
          });

          const index = (y * canvas.width + x) * 4;
          const color = closestPoint.color;
          const alpha = Math.max(0.3, 1 - minDist / 150);

          const rgb = hexToRgb(color);
          if (rgb && index < data.length) {
            data[index] = rgb.r;
            data[index + 1] = rgb.g;
            data[index + 2] = rgb.b;
            data[index + 3] = alpha * 255;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      time += 0.01;
    };

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      resizeCanvas();
      points.forEach(point => {
        point.x = Math.random() * canvas.width;
        point.y = Math.random() * canvas.height;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: '#000' }}
    />
  );
}