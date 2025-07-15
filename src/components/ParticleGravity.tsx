import { useEffect, useRef } from 'react';

export function ParticleGravity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const width = canvas.width / 2;
    const height = canvas.height / 2;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      mass: number;
      size: number;
      hue: number;
      trail: Array<{ x: number; y: number }>;
    }> = [];

    const attractors: Array<{
      x: number;
      y: number;
      mass: number;
      size: number;
    }> = [];

    // Create attractors
    for (let i = 0; i < 3; i++) {
      attractors.push({
        x: Math.random() * width,
        y: Math.random() * height,
        mass: 1000 + Math.random() * 2000,
        size: 8 + Math.random() * 6
      });
    }

    // Create particles
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        mass: 1 + Math.random() * 3,
        size: 1 + Math.random() * 2,
        hue: Math.random() * 360,
        trail: []
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, width, height);

      // Update particles
      particles.forEach(particle => {
        let forceX = 0;
        let forceY = 0;

        // Calculate gravitational forces from attractors
        attractors.forEach(attractor => {
          const dx = attractor.x - particle.x;
          const dy = attractor.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > attractor.size) {
            const force = (attractor.mass * particle.mass) / (distance * distance);
            forceX += (dx / distance) * force * 0.0001;
            forceY += (dy / distance) * force * 0.0001;
          }
        });

        // Apply forces
        particle.vx += forceX / particle.mass;
        particle.vy += forceY / particle.mass;

        // Apply damping
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 20) {
          particle.trail.shift();
        }

        // Change hue based on velocity
        const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        particle.hue = (particle.hue + velocity * 2) % 360;
      });

      // Draw particle trails
      particles.forEach(particle => {
        if (particle.trail.length > 1) {
          ctx.strokeStyle = `hsla(${particle.hue}, 80%, 60%, 0.3)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          
          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          }
          
          ctx.stroke();
        }
      });

      // Draw particles
      particles.forEach(particle => {
        const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        const intensity = Math.min(1, velocity / 5);
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 90%, 70%, ${intensity})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 80%, 1)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw attractors
      attractors.forEach((attractor, index) => {
        const time = Date.now() * 0.001;
        
        // Move attractors in complex patterns
        attractor.x += Math.sin(time + index * 2) * 0.5;
        attractor.y += Math.cos(time * 0.7 + index * 2) * 0.3;
        
        // Keep attractors in bounds
        if (attractor.x < 0) attractor.x = width;
        if (attractor.x > width) attractor.x = 0;
        if (attractor.y < 0) attractor.y = height;
        if (attractor.y > height) attractor.y = 0;

        // Draw attractor glow
        const gradient = ctx.createRadialGradient(
          attractor.x, attractor.y, 0,
          attractor.x, attractor.y, attractor.size * 4
        );
        gradient.addColorStop(0, `hsla(${index * 120}, 100%, 60%, 0.8)`);
        gradient.addColorStop(0.5, `hsla(${index * 120}, 80%, 40%, 0.4)`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(attractor.x, attractor.y, attractor.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core attractor
        ctx.fillStyle = `hsla(${index * 120}, 100%, 80%, 1)`;
        ctx.beginPath();
        ctx.arc(attractor.x, attractor.y, attractor.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'radial-gradient(circle, #000030 0%, #000000 100%)' }}
    />
  );
}
