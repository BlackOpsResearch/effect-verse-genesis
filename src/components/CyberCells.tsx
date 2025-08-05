import React, { useEffect, useRef } from 'react';

interface Cell {
  x: number;
  y: number;
  size: number;
  pulse: number;
  connections: number[];
}

export function CyberCells() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cells: Cell[] = [];
    const cellCount = 20;

    // Create cells
    for (let i = 0; i < cellCount; i++) {
      cells.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10 + Math.random() * 20,
        pulse: Math.random() * Math.PI * 2,
        connections: []
      });
    }

    // Find connections
    cells.forEach((cell, i) => {
      cells.forEach((otherCell, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(cell.x - otherCell.x, 2) + 
            Math.pow(cell.y - otherCell.y, 2)
          );
          if (distance < 150) {
            cell.connections.push(j);
          }
        }
      });
    });

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.02;

      // Draw connections
      cells.forEach((cell, i) => {
        cell.connections.forEach(connectionIndex => {
          const otherCell = cells[connectionIndex];
          const pulseValue = Math.sin(time * 3 + cell.pulse) * 0.5 + 0.5;
          
          ctx.strokeStyle = `rgba(0, 255, 255, ${pulseValue * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cell.x, cell.y);
          ctx.lineTo(otherCell.x, otherCell.y);
          ctx.stroke();

          // Data packets
          const progress = (time * 2 + i * 0.1) % 1;
          const packetX = cell.x + (otherCell.x - cell.x) * progress;
          const packetY = cell.y + (otherCell.y - cell.y) * progress;

          ctx.fillStyle = `rgba(255, 255, 0, ${pulseValue})`;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Draw cells
      cells.forEach(cell => {
        const pulseSize = cell.size + Math.sin(time * 4 + cell.pulse) * 5;
        const pulseAlpha = Math.sin(time * 4 + cell.pulse) * 0.3 + 0.7;

        // Cell body
        const gradient = ctx.createRadialGradient(
          cell.x, cell.y, 0,
          cell.x, cell.y, pulseSize
        );
        gradient.addColorStop(0, `rgba(0, 255, 255, ${pulseAlpha})`);
        gradient.addColorStop(0.7, `rgba(0, 150, 255, ${pulseAlpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 100, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, pulseSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
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
      style={{ background: 'radial-gradient(circle, #001a2e, #000)' }}
    />
  );
}