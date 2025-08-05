import React, { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  charge: number;
  energy: number;
}

export function EnergyOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const orbs: Orb[] = [];
    const orbCount = 6;

    // Create orbs
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 20 + Math.random() * 30,
        charge: Math.random() > 0.5 ? 1 : -1,
        energy: Math.random() * 100
      });
    }

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.02;

      // Update orbs
      orbs.forEach((orb, i) => {
        // Apply electromagnetic forces between orbs
        orbs.forEach((otherOrb, j) => {
          if (i !== j) {
            const dx = otherOrb.x - orb.x;
            const dy = otherOrb.y - orb.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
              const force = (orb.charge * otherOrb.charge * 100) / (distance * distance);
              const forceX = (dx / distance) * force;
              const forceY = (dy / distance) * force;
              
              orb.vx -= forceX * 0.001;
              orb.vy -= forceY * 0.001;
            }
          }
        });

        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Boundary collision
        if (orb.x < orb.size || orb.x > canvas.width - orb.size) {
          orb.vx *= -0.8;
          orb.x = Math.max(orb.size, Math.min(canvas.width - orb.size, orb.x));
        }
        if (orb.y < orb.size || orb.y > canvas.height - orb.size) {
          orb.vy *= -0.8;
          orb.y = Math.max(orb.size, Math.min(canvas.height - orb.size, orb.y));
        }

        // Apply damping
        orb.vx *= 0.995;
        orb.vy *= 0.995;

        // Update energy
        orb.energy = 50 + Math.sin(time * 3 + i * 2) * 30;
      });

      // Draw electromagnetic field lines
      orbs.forEach((orb, i) => {
        orbs.forEach((otherOrb, j) => {
          if (i < j) {
            const attraction = orb.charge * otherOrb.charge < 0;
            const distance = Math.sqrt(
              Math.pow(orb.x - otherOrb.x, 2) + 
              Math.pow(orb.y - otherOrb.y, 2)
            );

            if (distance < 200) {
              const alpha = 1 - distance / 200;
              ctx.strokeStyle = attraction 
                ? `rgba(0, 255, 255, ${alpha * 0.5})`
                : `rgba(255, 100, 100, ${alpha * 0.5})`;
              ctx.lineWidth = alpha * 3;
              
              ctx.beginPath();
              ctx.moveTo(orb.x, orb.y);
              ctx.lineTo(otherOrb.x, otherOrb.y);
              ctx.stroke();

              // Animated energy packets
              const packetCount = 3;
              for (let k = 0; k < packetCount; k++) {
                const progress = (time * 2 + k * 0.33) % 1;
                const packetX = orb.x + (otherOrb.x - orb.x) * progress;
                const packetY = orb.y + (otherOrb.y - orb.y) * progress;

                ctx.fillStyle = attraction ? '#00ffff' : '#ff6464';
                ctx.beginPath();
                ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        });
      });

      // Draw orbs
      orbs.forEach(orb => {
        const energyScale = orb.energy / 100;
        const currentSize = orb.size * (0.8 + energyScale * 0.4);
        
        // Energy field
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, currentSize * 2
        );
        
        if (orb.charge > 0) {
          gradient.addColorStop(0, `rgba(255, 255, 100, ${energyScale * 0.8})`);
          gradient.addColorStop(0.5, `rgba(255, 150, 0, ${energyScale * 0.4})`);
          gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
        } else {
          gradient.addColorStop(0, `rgba(100, 255, 255, ${energyScale * 0.8})`);
          gradient.addColorStop(0.5, `rgba(0, 150, 255, ${energyScale * 0.4})`);
          gradient.addColorStop(1, 'rgba(0, 100, 255, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = orb.charge > 0 ? '#ffff88' : '#88ffff';
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentSize * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Charge indicator
        ctx.fillStyle = orb.charge > 0 ? '#ffffff' : '#000000';
        ctx.font = '14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(orb.charge > 0 ? '+' : '-', orb.x, orb.y + 4);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'radial-gradient(circle, #001122, #000)' }}
    />
  );
}