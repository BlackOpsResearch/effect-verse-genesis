import React, { useEffect, useRef, useState } from 'react';

export function WormholeTravel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;
    let animationId: number;

    const rings: Array<{
      z: number;
      rotation: number;
      color: string;
    }> = [];

    // Initialize rings
    for (let i = 0; i < 50; i++) {
      rings.push({
        z: i * 20,
        rotation: Math.random() * Math.PI * 2,
        color: `hsl(${(i * 7) % 360}, 70%, 60%)`
      });
    }

    const animate = () => {
      if (!isHovered) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      time += 0.05;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Update and draw rings
      rings.forEach((ring, index) => {
        ring.z -= 5;
        ring.rotation += 0.02;
        
        if (ring.z <= 0) {
          ring.z = 1000;
          ring.color = `hsl(${(time * 50 + index * 7) % 360}, 70%, 60%)`;
        }

        const scale = 1000 / ring.z;
        const radius = scale * 100;
        const opacity = Math.min(1, scale);
        
        if (radius > 5 && radius < 500) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(ring.rotation);
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = ring.color;
          ctx.lineWidth = 2 * scale;
          
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.stroke();
          
          // Inner glow
          ctx.globalAlpha = opacity * 0.3;
          ctx.lineWidth = 6 * scale;
          ctx.stroke();
          
          ctx.restore();
        }
      });

      // Center vortex
      const vortexGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
      vortexGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      vortexGradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.3)');
      vortexGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = vortexGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  return (
    <div 
      className="w-full h-full relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'radial-gradient(circle, #001122 0%, #000000 100%)' }}
      />
    </div>
  );
}