import React, { useEffect, useRef } from 'react';

interface CrystalCaveProps {
  className?: string;
}

export function CrystalCave({ className = "" }: CrystalCaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    const crystals = Array.from({ length: 15 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 20 + Math.random() * 40,
      faces: 6 + Math.floor(Math.random() * 6),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: `hsl(${180 + Math.random() * 60}, 80%, ${60 + Math.random() * 20}%)`,
      glowIntensity: Math.random()
    }));

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 15, 0.1)';
      ctx.fillRect(0, 0, width, height);

      time += 0.02;

      crystals.forEach(crystal => {
        crystal.rotation += crystal.rotationSpeed;
        crystal.glowIntensity = 0.5 + Math.sin(time * 2 + crystal.x * 0.01) * 0.5;

        const { x, y, size, faces, rotation, color, glowIntensity } = crystal;

        // Draw crystal glow
        const glowSize = size * (1 + glowIntensity * 0.5);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        gradient.addColorStop(0, color.replace(')', ', 0.3)').replace('hsl', 'hsla'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x - glowSize, y - glowSize, glowSize * 2, glowSize * 2);

        // Draw crystal facets
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        // Main crystal body
        ctx.fillStyle = color.replace(')', ', 0.7)').replace('hsl', 'hsla');
        ctx.beginPath();
        for (let i = 0; i < faces; i++) {
          const angle = (i / faces) * Math.PI * 2;
          const px = Math.cos(angle) * size;
          const py = Math.sin(angle) * size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        // Crystal highlights
        ctx.strokeStyle = color.replace('%)', '%, 90%)').replace('hsl', 'hsla');
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner facets for depth
        ctx.fillStyle = color.replace(')', ', 0.9)').replace('hsl', 'hsla');
        ctx.beginPath();
        for (let i = 0; i < faces; i++) {
          const angle = (i / faces) * Math.PI * 2;
          const px = Math.cos(angle) * size * 0.6;
          const py = Math.sin(angle) * size * 0.6;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        // Bright center
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = glowIntensity * 0.8;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.restore();
      });

      // Add floating particles
      for (let i = 0; i < 50; i++) {
        const px = (Math.sin(time * 0.5 + i * 0.1) * 0.5 + 0.5) * width;
        const py = (Math.cos(time * 0.3 + i * 0.15) * 0.5 + 0.5) * height;
        const size = 1 + Math.sin(time * 3 + i) * 0.5;
        
        ctx.fillStyle = `hsla(${200 + Math.sin(i) * 60}, 80%, 70%, 0.6)`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'radial-gradient(circle, #0a0a20, #050510)' }}
      />
    </div>
  );
}