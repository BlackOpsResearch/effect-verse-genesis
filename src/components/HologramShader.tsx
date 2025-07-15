import { useEffect, useRef } from 'react';

export function HologramShader() {
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

    let time = 0;
    const scanlines: Array<{
      y: number;
      speed: number;
      intensity: number;
      width: number;
    }> = [];

    // Generate scanlines
    for (let i = 0; i < 8; i++) {
      scanlines.push({
        y: Math.random() * canvas.offsetHeight,
        speed: Math.random() * 2 + 0.5,
        intensity: Math.random() * 0.5 + 0.3,
        width: Math.random() * 100 + 50
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.02;

      // Holographic scanlines
      scanlines.forEach((line) => {
        line.y += line.speed;
        if (line.y > canvas.offsetHeight + 50) {
          line.y = -50;
        }

        const gradient = ctx.createLinearGradient(0, line.y - line.width/2, 0, line.y + line.width/2);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
        gradient.addColorStop(0.5, `rgba(0, 255, 255, ${line.intensity})`);
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, line.y - line.width/2, canvas.offsetWidth, line.width);
      });

      // Holographic interference patterns
      for (let y = 0; y < canvas.offsetHeight; y += 4) {
        const noise = Math.sin(y * 0.1 + time * 3) * 0.1;
        const opacity = Math.abs(noise) * 0.2;
        
        ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`;
        ctx.fillRect(0, y, canvas.offsetWidth, 1);
      }

      // Glitch effects
      if (Math.random() < 0.02) {
        const glitchY = Math.random() * canvas.offsetHeight;
        const glitchHeight = Math.random() * 20 + 5;
        
        ctx.fillStyle = 'rgba(255, 0, 255, 0.3)';
        ctx.fillRect(0, glitchY, canvas.offsetWidth, glitchHeight);
      }

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
      className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
      style={{ background: 'transparent' }}
    />
  );
}