import { useEffect, useRef, useState } from "react";

export const ParticleSwarm = () => {
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
      ax: number;
      ay: number;
      hue: number;
      size: number;
    }

    const particles: Particle[] = [];
    const numParticles = 80;
    let animationId: number;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        ax: 0,
        ay: 0,
        hue: Math.random() * 360,
        size: Math.random() * 3 + 1
      });
    }

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Reset acceleration
        particle.ax = 0;
        particle.ay = 0;

        // Swarm behavior
        particles.forEach((other, j) => {
          if (i === j) return;

          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0 && distance < 50) {
            // Cohesion and alignment
            const force = 0.0002;
            particle.ax += dx * force;
            particle.ay += dy * force;

            // Separation
            if (distance < 20) {
              const separationForce = 0.001;
              particle.ax -= dx * separationForce;
              particle.ay -= dy * separationForce;
            }
          }
        });

        // Center attraction
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const centerDx = centerX - particle.x;
        const centerDy = centerY - particle.y;
        particle.ax += centerDx * 0.00005;
        particle.ay += centerDy * 0.00005;

        // Update velocity and position
        particle.vx += particle.ax;
        particle.vy += particle.ay;
        
        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = `hsl(${particle.hue}, 80%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach((other, j) => {
          if (i >= j) return;
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50) {
            ctx.strokeStyle = `hsla(${(particle.hue + other.hue) / 2}, 70%, 50%, ${1 - distance / 50})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        particle.hue += 0.5;
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