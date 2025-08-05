import React, { useEffect, useRef } from 'react';

interface DataPacket {
  x: number;
  y: number;
  speed: number;
  data: string;
  trail: Array<{ x: number; y: number; age: number }>;
}

export function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const packets: DataPacket[] = [];
    const streamCount = 8;
    const dataChars = '01';
    
    // Create data streams
    for (let i = 0; i < streamCount; i++) {
      packets.push({
        x: (i / (streamCount - 1)) * canvas.width,
        y: Math.random() * canvas.height,
        speed: 2 + Math.random() * 4,
        data: Array.from({ length: 8 }, () => 
          dataChars[Math.floor(Math.random() * dataChars.length)]
        ).join(''),
        trail: []
      });
    }

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.02;

      packets.forEach((packet, index) => {
        // Update position
        packet.y += packet.speed;
        
        // Reset if off screen
        if (packet.y > canvas.height + 50) {
          packet.y = -50;
          packet.x = (index / (streamCount - 1)) * canvas.width + 
                   (Math.random() - 0.5) * 100;
          // Generate new data
          packet.data = Array.from({ length: 8 }, () => 
            dataChars[Math.floor(Math.random() * dataChars.length)]
          ).join('');
        }

        // Add to trail
        packet.trail.push({ x: packet.x, y: packet.y, age: 0 });
        
        // Remove old trail points
        packet.trail = packet.trail.filter(point => point.age < 50);
        
        // Age trail points
        packet.trail.forEach(point => point.age++);

        // Draw trail
        packet.trail.forEach((point, trailIndex) => {
          const alpha = 1 - (point.age / 50);
          const intensity = alpha * (1 - trailIndex / packet.trail.length);
          
          ctx.fillStyle = `rgba(0, 255, 100, ${intensity * 0.6})`;
          ctx.fillRect(point.x - 1, point.y - 1, 2, 2);
        });

        // Draw main packet
        const packetIntensity = 0.8 + Math.sin(time * 8 + index) * 0.2;
        
        // Background glow
        const gradient = ctx.createRadialGradient(
          packet.x, packet.y, 0,
          packet.x, packet.y, 20
        );
        gradient.addColorStop(0, `rgba(0, 255, 100, ${packetIntensity * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 255, 100, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(packet.x, packet.y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Data text
        ctx.fillStyle = `rgba(0, 255, 100, ${packetIntensity})`;
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(packet.data, packet.x, packet.y + 4);

        // Connection lines to nearby packets
        packets.forEach((otherPacket, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(packet.x - otherPacket.x, 2) + 
              Math.pow(packet.y - otherPacket.y, 2)
            );

            if (distance < 100) {
              const alpha = 1 - distance / 100;
              ctx.strokeStyle = `rgba(0, 255, 100, ${alpha * 0.3})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(packet.x, packet.y);
              ctx.lineTo(otherPacket.x, otherPacket.y);
              ctx.stroke();

              // Data transfer indicator
              const transferProgress = (time * 3) % 1;
              const transferX = packet.x + (otherPacket.x - packet.x) * transferProgress;
              const transferY = packet.y + (otherPacket.y - packet.y) * transferProgress;

              ctx.fillStyle = `rgba(255, 255, 0, ${alpha})`;
              ctx.beginPath();
              ctx.arc(transferX, transferY, 1, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });

        // Side data streams
        for (let i = 0; i < 20; i++) {
          const sideY = packet.y + (i - 10) * 15;
          const sideX = packet.x + Math.sin(time * 2 + i * 0.5) * 30;
          const alpha = 0.3 * (1 - Math.abs(i - 10) / 10);

          if (sideY > 0 && sideY < canvas.height) {
            ctx.fillStyle = `rgba(0, 150, 255, ${alpha})`;
            ctx.font = '8px monospace';
            ctx.textAlign = 'center';
            const char = dataChars[Math.floor((time * 10 + i) % dataChars.length)];
            ctx.fillText(char, sideX, sideY);
          }
        }
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
      style={{ background: 'linear-gradient(180deg, #001100, #000011)' }}
    />
  );
}