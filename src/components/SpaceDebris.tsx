import React, { useRef, useEffect, useState } from 'react';

interface Debris {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export function SpaceDebris() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const debrisRef = useRef<Debris[]>([]);
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

    // Initialize debris
    debrisRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.8 + 0.2
    }));

    const animate = () => {
      if (!isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      debrisRef.current.forEach(debris => {
        debris.y += debris.speed;
        debris.rotation += debris.rotationSpeed;

        if (debris.y > canvas.height + debris.size) {
          debris.y = -debris.size;
          debris.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(debris.x, debris.y);
        ctx.rotate(debris.rotation);
        ctx.globalAlpha = debris.opacity;
        
        // Draw debris as metallic fragments
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, debris.size);
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(0.5, '#888');
        gradient.addColorStop(1, '#333');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(-debris.size/2, -debris.size/2, debris.size, debris.size);
        
        ctx.restore();
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