import { useEffect, useRef } from 'react';

export function GeometricTunnel() {
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

    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < 20; i++) {
        const z = i * 0.1 + time * 0.02;
        const scale = 1 / (z + 0.1);
        const size = 100 * scale;

        if (size < 2) continue;

        const rotation = time * 0.01 + i * 0.1;
        const sides = 6;
        const hue = (time * 50 + i * 20) % 360;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);

        ctx.beginPath();
        for (let j = 0; j < sides; j++) {
          const angle = (j / sides) * Math.PI * 2;
          const x = Math.cos(angle) * size;
          const y = Math.sin(angle) * size;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();

        const alpha = Math.max(0.1, scale);
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
        ctx.lineWidth = 2 / scale;
        ctx.stroke();

        ctx.shadowColor = `hsla(${hue}, 100%, 50%, ${alpha})`;
        ctx.shadowBlur = 10 / scale;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      time += 1;
    };

    const interval = setInterval(draw, 16);

    const handleResize = () => resizeCanvas();
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
      style={{ background: 'radial-gradient(circle, #001122, #000)' }}
    />
  );
}