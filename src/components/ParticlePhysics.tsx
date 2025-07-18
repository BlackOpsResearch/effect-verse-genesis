import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  trail: { x: number; y: number }[];
}

export function ParticlePhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
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

    // Initialize particles
    particlesRef.current = Array.from({ length: 20 }, () => {
      const colors = ['#ff4444', '#44ff44', '#4444ff', '#ffff44', '#ff44ff', '#44ffff'];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 8 + 4,
        mass: Math.random() * 5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: []
      };
    });

    const animate = () => {
      if (!isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update particles
      particlesRef.current.forEach((particle, i) => {
        // Apply gravity between particles
        particlesRef.current.forEach((other, j) => {
          if (i !== j) {
            const dx = other.x - particle.x;
            const dy = other.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0 && distance < 200) {
              const force = (particle.mass * other.mass) / (distance * distance) * 0.1;
              const fx = (dx / distance) * force;
              const fy = (dy / distance) * force;
              
              particle.vx += fx / particle.mass;
              particle.vy += fy / particle.mass;
            }
          }
        });

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x <= particle.radius || particle.x >= canvas.width - particle.radius) {
          particle.vx *= -0.8;
          particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        }
        if (particle.y <= particle.radius || particle.y >= canvas.height - particle.radius) {
          particle.vy *= -0.8;
          particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
        }

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 20) {
          particle.trail.shift();
        }

        // Draw trail
        particle.trail.forEach((point, index) => {
          const alpha = index / particle.trail.length * 0.5;
          ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('#', 'rgba(').replace(/(.{2})/g, (match, p1, offset) => {
            if (offset === 0) return `${parseInt(p1, 16)}, `;
            if (offset === 2) return `${parseInt(p1, 16)}, `;
            if (offset === 4) return `${parseInt(p1, 16)}, `;
            return match;
          });
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.radius * (index / particle.trail.length), 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, particle.color + '40');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
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