import { useEffect, useRef, useState } from "react";

export const ParticleGravity = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      mass: number;
      hue: number;
      trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    const numParticles = 12;
    let animationId: number;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        mass: Math.random() * 5 + 2,
        hue: i * (360 / numParticles),
        trail: []
      });
    }

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        let fx = 0;
        let fy = 0;

        // Calculate gravitational forces
        particles.forEach((other, j) => {
          if (i === j) return;

          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            const force = (particle.mass * other.mass) / (distance * distance);
            const forceX = (dx / distance) * force * 0.1;
            const forceY = (dy / distance) * force * 0.1;
            
            fx += forceX;
            fy += forceY;
          }
        });

        // Update velocity and position
        particle.vx += fx / particle.mass;
        particle.vy += fy / particle.mass;
        
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Add to trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 30) {
          particle.trail.shift();
        }

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw trail
        particle.trail.forEach((point, index) => {
          const alpha = index / particle.trail.length;
          ctx.fillStyle = `hsla(${particle.hue}, 80%, 60%, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.mass * alpha, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw particle
        ctx.fillStyle = `hsl(${particle.hue}, 80%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.mass, 0, Math.PI * 2);
        ctx.fill();

        // Draw gravitational field lines
        ctx.strokeStyle = `hsla(${particle.hue}, 60%, 50%, 0.3)`;
        ctx.lineWidth = 1;
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
          const lineLength = particle.mass * 10;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(
            particle.x + Math.cos(angle) * lineLength,
            particle.y + Math.sin(angle) * lineLength
          );
          ctx.stroke();
        }

        particle.hue += 0.2;
      });

      animationId = requestAnimationFrame(animate);
    };

    if (isHovered) {
      animate();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};