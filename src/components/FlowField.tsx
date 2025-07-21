import { useEffect, useRef, useState } from "react";

export const FlowField = () => {
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
      life: number;
      maxLife: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const numParticles = 200;
    let animationId: number;
    let time = 0;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        life: Math.random() * 100,
        maxLife: 100,
        hue: Math.random() * 360
      });
    }

    const getFlowDirection = (x: number, y: number, time: number) => {
      const angle = Math.sin(x * 0.01) + Math.cos(y * 0.01) + Math.sin(time * 0.01);
      const force = 0.5;
      return {
        fx: Math.cos(angle) * force,
        fy: Math.sin(angle) * force
      };
    };

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Apply flow field
        const flow = getFlowDirection(particle.x, particle.y, time);
        particle.vx += flow.fx;
        particle.vy += flow.fy;

        // Apply damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update life
        particle.life--;
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = 0;
          particle.vy = 0;
          particle.life = particle.maxLife;
          particle.hue = Math.random() * 360;
        }

        // Wrap edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        const alpha = particle.life / particle.maxLife;
        const size = alpha * 3;
        
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw trail
        const trailLength = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy) * 10;
        if (trailLength > 1) {
          ctx.strokeStyle = `hsla(${particle.hue}, 70%, 50%, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
          ctx.stroke();
        }
      });

      time++;
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