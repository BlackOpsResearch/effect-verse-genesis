import { useEffect, useRef, useState } from "react";

export const VortexField = () => {
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
      angle: number;
      radius: number;
      hue: number;
      life: number;
    }

    const particles: Particle[] = [];
    const numParticles = 150;
    const vortexCenters = [
      { x: canvas.width * 0.3, y: canvas.height * 0.5 },
      { x: canvas.width * 0.7, y: canvas.height * 0.5 }
    ];
    let animationId: number;
    let time = 0;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 100 + 20,
        hue: Math.random() * 360,
        life: Math.random() * 200 + 100
      });
    }

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        let totalFx = 0;
        let totalFy = 0;

        // Calculate vortex forces
        vortexCenters.forEach((center, j) => {
          const dx = particle.x - center.x;
          const dy = particle.y - center.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            const vortexStrength = 0.5 * (j === 0 ? 1 : -1); // Opposite rotations
            const falloff = 1 / (1 + distance * 0.01);
            
            // Tangential force (creates rotation)
            totalFx += (-dy / distance) * vortexStrength * falloff;
            totalFy += (dx / distance) * vortexStrength * falloff;
            
            // Radial force (creates spiral)
            const radialForce = 0.1 * falloff;
            totalFx += (-dx / distance) * radialForce;
            totalFy += (-dy / distance) * radialForce;
          }
        });

        // Apply forces
        particle.vx += totalFx;
        particle.vy += totalFy;

        // Apply damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

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
          particle.life = Math.random() * 200 + 100;
          particle.hue = Math.random() * 360;
        }

        // Boundary handling
        if (particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height) {
          particle.life = 0;
        }

        // Draw particle
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        const size = Math.min(speed * 2 + 1, 4);
        const alpha = Math.min(particle.life / 100, 1);
        
        ctx.fillStyle = `hsla(${particle.hue + time * 0.5}, 80%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw velocity trail
        if (speed > 0.5) {
          ctx.strokeStyle = `hsla(${particle.hue + time * 0.5}, 70%, 50%, ${alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x - particle.vx * 8, particle.y - particle.vy * 8);
          ctx.stroke();
        }
      });

      // Draw vortex centers
      vortexCenters.forEach((center, i) => {
        const pulseSize = 8 + Math.sin(time * 0.1 + i) * 4;
        ctx.fillStyle = `hsl(${i * 180 + time}, 80%, 60%)`;
        ctx.beginPath();
        ctx.arc(center.x, center.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Vortex rings
        for (let r = 20; r < 100; r += 20) {
          ctx.strokeStyle = `hsla(${i * 180 + time}, 60%, 50%, ${0.3 * (1 - r / 100)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(center.x, center.y, r + Math.sin(time * 0.05) * 5, 0, Math.PI * 2);
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