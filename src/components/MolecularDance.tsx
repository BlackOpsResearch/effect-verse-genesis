import React, { useEffect, useRef } from 'react';

interface MolecularDanceProps {
  className?: string;
}

export function MolecularDance({ className = "" }: MolecularDanceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    const molecules = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 5 + Math.random() * 10,
      connections: [] as number[]
    }));

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      time += 0.02;

      // Update molecule positions
      molecules.forEach((molecule, i) => {
        molecule.x += molecule.vx;
        molecule.y += molecule.vy;

        // Bounce off edges
        if (molecule.x < 0 || molecule.x > width) molecule.vx *= -1;
        if (molecule.y < 0 || molecule.y > height) molecule.vy *= -1;
        
        molecule.x = Math.max(0, Math.min(width, molecule.x));
        molecule.y = Math.max(0, Math.min(height, molecule.y));

        // Find connections
        molecule.connections = [];
        molecules.forEach((other, j) => {
          if (i !== j) {
            const dx = molecule.x - other.x;
            const dy = molecule.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              molecule.connections.push(j);
            }
          }
        });
      });

      // Draw connections
      molecules.forEach((molecule, i) => {
        molecule.connections.forEach(connectionIndex => {
          const other = molecules[connectionIndex];
          const dx = molecule.x - other.x;
          const dy = molecule.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const alpha = Math.max(0, 1 - distance / 100);

          ctx.strokeStyle = `hsla(${(i * 50) % 360}, 70%, 60%, ${alpha})`;
          ctx.lineWidth = alpha * 2;
          ctx.beginPath();
          ctx.moveTo(molecule.x, molecule.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        });
      });

      // Draw molecules
      molecules.forEach((molecule, i) => {
        const pulse = Math.sin(time * 3 + i) * 0.3 + 1;
        ctx.fillStyle = `hsl(${(i * 50) % 360}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(molecule.x, molecule.y, molecule.size * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        const gradient = ctx.createRadialGradient(
          molecule.x, molecule.y, 0,
          molecule.x, molecule.y, molecule.size * 2
        );
        gradient.addColorStop(0, `hsla(${(i * 50) % 360}, 70%, 80%, 0.5)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(
          molecule.x - molecule.size * 2,
          molecule.y - molecule.size * 2,
          molecule.size * 4,
          molecule.size * 4
        );
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a3a)' }}
      />
    </div>
  );
}