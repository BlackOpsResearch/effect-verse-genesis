import { useEffect, useRef } from 'react';

export function GalaxySpiral() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const centerX = canvas.width / 4;
    const centerY = canvas.height / 4;
    const stars: Array<{
      angle: number;
      distance: number;
      speed: number;
      size: number;
      opacity: number;
      hue: number;
    }> = [];

    // Create spiral stars
    for (let i = 0; i < 800; i++) {
      stars.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 150 + 10,
        speed: (Math.random() * 0.02 + 0.005) * (1 + Math.random() * 0.5),
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        hue: Math.random() * 60 + 200 // Blue to purple range
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

      stars.forEach((star, index) => {
        // Spiral motion
        star.angle += star.speed;
        const spiralFactor = star.distance * 0.02;
        
        const x = centerX + Math.cos(star.angle + spiralFactor) * star.distance;
        const y = centerY + Math.sin(star.angle + spiralFactor) * star.distance;

        // Create gradient for each star
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3);
        gradient.addColorStop(0, `hsla(${star.hue}, 80%, 70%, ${star.opacity})`);
        gradient.addColorStop(0.5, `hsla(${star.hue}, 60%, 50%, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core star
        ctx.fillStyle = `hsla(${star.hue}, 90%, 85%, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Slowly expand the galaxy
        star.distance += star.speed * 0.1;
        if (star.distance > 200) {
          star.distance = 10;
          star.angle = Math.random() * Math.PI * 2;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'radial-gradient(circle, #0a0a0a 0%, #000000 100%)' }}
    />
  );
}