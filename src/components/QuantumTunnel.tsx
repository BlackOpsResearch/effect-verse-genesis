import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  speed: number;
  hue: number;
  size: number;
}

export function QuantumTunnel() {
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

    const particles: Particle[] = [];
    const particleCount = 200;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        z: Math.random() * 1000,
        speed: 2 + Math.random() * 3,
        hue: Math.random() * 60 + 180, // Blue to cyan range
        size: Math.random() * 2 + 1
      });
    }

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Sort particles by z-depth for proper rendering
      particles.sort((a, b) => b.z - a.z);

      particles.forEach((particle, index) => {
        // Move particle toward camera
        particle.z -= particle.speed;

        // Reset particle when it gets too close
        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = (Math.random() - 0.5) * 400;
          particle.y = (Math.random() - 0.5) * 400;
        }

        // Calculate 3D projection
        const scale = 200 / particle.z;
        const x = centerX + particle.x * scale;
        const y = centerY + particle.y * scale;

        // Calculate size based on distance
        const size = particle.size * scale;
        const alpha = Math.min(1, scale * 2);

        // Add tunnel warping effect
        const distance = Math.sqrt(particle.x * particle.x + particle.y * particle.y);
        const warp = Math.sin(time * 0.02 + distance * 0.01) * 20 * scale;
        
        const warpedX = x + Math.cos(Math.atan2(particle.y, particle.x)) * warp;
        const warpedY = y + Math.sin(Math.atan2(particle.y, particle.x)) * warp;

        // Draw particle
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${particle.hue + Math.sin(time * 0.01 + index * 0.1) * 30}, 100%, 60%)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = size * 2;
        
        ctx.beginPath();
        ctx.arc(warpedX, warpedY, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fill();

        // Draw connecting lines for tunnel effect
        if (index < particles.length - 1 && Math.random() > 0.7) {
          const nextParticle = particles[index + 1];
          const nextScale = 200 / nextParticle.z;
          const nextX = centerX + nextParticle.x * nextScale;
          const nextY = centerY + nextParticle.y * nextScale;
          
          ctx.strokeStyle = `hsla(${particle.hue}, 100%, 60%, ${alpha * 0.3})`;
          ctx.lineWidth = scale;
          ctx.beginPath();
          ctx.moveTo(warpedX, warpedY);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'linear-gradient(45deg, #000511, #000819)' }}
    />
  );
}