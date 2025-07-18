import { useEffect, useRef } from 'react';

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
  twinkle: number;
}

export function CosmicDust() {
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

    const particles: DustParticle[] = [];
    const maxParticles = 150;
    let time = 0;

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 0.5,
        life: 1,
        maxLife: Math.random() * 300 + 200,
        hue: Math.random() * 60 + 180, // Blue to purple range
        twinkle: Math.random() * Math.PI * 2
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 2, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add cosmic wind effect
      const windX = Math.sin(time * 0.001) * 0.2;
      const windY = Math.cos(time * 0.0015) * 0.1;

      particles.forEach((particle, index) => {
        // Apply cosmic wind
        particle.vx += windX * 0.1;
        particle.vy += windY * 0.1;

        // Add gravitational waves
        const waveX = Math.sin(time * 0.002 + particle.y * 0.01) * 0.05;
        const waveY = Math.cos(time * 0.002 + particle.x * 0.01) * 0.05;
        
        particle.vx += waveX;
        particle.vy += waveY;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply drag
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update life
        particle.life -= 1;
        particle.twinkle += 0.1;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate alpha based on life and twinkle
        const lifeRatio = particle.life / particle.maxLife;
        const twinkleAlpha = Math.sin(particle.twinkle) * 0.3 + 0.7;
        const alpha = lifeRatio * twinkleAlpha;

        // Color shifts over time
        const hue = (particle.hue + time * 0.1) % 360;
        const saturation = 80 + Math.sin(time * 0.01 + index * 0.1) * 20;
        const lightness = 60 + Math.sin(particle.twinkle) * 20;

        // Draw particle with glow
        const glowSize = particle.size * (2 + Math.sin(particle.twinkle) * 0.5);
        
        // Outer glow
        ctx.globalAlpha = alpha * 0.3;
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = glowSize * 2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Inner particle
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = particle.size;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        // Add connecting lines for dust clouds
        if (Math.random() > 0.98) {
          particles.slice(index + 1, index + 3).forEach(other => {
            const distance = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2);
            if (distance < 80) {
              ctx.globalAlpha = alpha * other.life / other.maxLife * 0.2;
              ctx.strokeStyle = `hsl(${(hue + other.hue) / 2}, 70%, 50%)`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          });
        }

        // Respawn particle if it dies
        if (particle.life <= 0) {
          Object.assign(particle, createParticle());
        }
      });

      ctx.globalAlpha = 1;

      // Add nebula effect
      if (time % 60 === 0) {
        const nebulaX = Math.random() * canvas.width;
        const nebulaY = Math.random() * canvas.height;
        const nebulaSize = 100 + Math.random() * 100;
        
        const gradient = ctx.createRadialGradient(nebulaX, nebulaY, 0, nebulaX, nebulaY, nebulaSize);
        gradient.addColorStop(0, 'rgba(120, 50, 200, 0.1)');
        gradient.addColorStop(0.5, 'rgba(50, 100, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebulaX, nebulaY, nebulaSize, 0, Math.PI * 2);
        ctx.fill();
      }

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
      style={{ background: 'radial-gradient(ellipse at center, #0a0520 0%, #020208 70%, #000000 100%)' }}
    />
  );
}