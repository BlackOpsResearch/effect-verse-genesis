import { useEffect, useRef } from 'react';

export function CrystalGrowth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Crystal {
      x: number;
      y: number;
      size: number;
      growth: number;
      angle: number;
      color: string;
      facets: number;
      maxSize: number;
    }

    const crystals: Crystal[] = [];
    const maxCrystals = 8;
    let time = 0;

    // Initialize crystals
    for (let i = 0; i < maxCrystals; i++) {
      crystals.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: 0,
        growth: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        color: `hsl(${180 + Math.random() * 60}, 100%, 60%)`,
        facets: Math.floor(Math.random() * 3) + 6,
        maxSize: Math.random() * 40 + 20
      });
    }

    const drawCrystal = (crystal: Crystal) => {
      ctx.save();
      ctx.translate(crystal.x, crystal.y);
      ctx.rotate(crystal.angle + time * 0.1);

      // Draw crystal facets
      const angleStep = (Math.PI * 2) / crystal.facets;
      
      for (let layer = 0; layer < 3; layer++) {
        const layerSize = crystal.size * (1 - layer * 0.2);
        const layerAlpha = 1 - layer * 0.3;
        
        ctx.strokeStyle = crystal.color.replace('60%)', `60%, ${layerAlpha})`);
        ctx.lineWidth = 2 - layer * 0.5;
        
        // Outer glow for first layer
        if (layer === 0) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = crystal.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        
        for (let i = 0; i <= crystal.facets; i++) {
          const angle = i * angleStep;
          const x = Math.cos(angle) * layerSize;
          const y = Math.sin(angle) * layerSize;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();

        // Fill with gradient
        if (layer === 0) {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layerSize);
          gradient.addColorStop(0, crystal.color.replace('60%)', '60%, 0.2)'));
          gradient.addColorStop(1, crystal.color.replace('60%)', '60%, 0)'));
          
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      // Draw inner core
      ctx.shadowBlur = 10;
      ctx.shadowColor = crystal.color;
      ctx.fillStyle = crystal.color.replace('60%)', '80%, 0.8)');
      ctx.beginPath();
      ctx.arc(0, 0, crystal.size * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Draw light reflections
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < crystal.facets; i += 2) {
        const angle = i * angleStep;
        const startX = Math.cos(angle) * crystal.size * 0.7;
        const startY = Math.sin(angle) * crystal.size * 0.7;
        const endX = Math.cos(angle) * crystal.size * 0.9;
        const endY = Math.sin(angle) * crystal.size * 0.9;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.01;

      crystals.forEach((crystal, index) => {
        // Grow crystal
        if (crystal.size < crystal.maxSize) {
          crystal.size += crystal.growth;
        } else if (crystal.size > crystal.maxSize * 1.2) {
          // Reset crystal for regrowth
          crystal.size = 0;
          crystal.x = Math.random() * canvas.offsetWidth;
          crystal.y = Math.random() * canvas.offsetHeight;
          crystal.angle = Math.random() * Math.PI * 2;
        }

        // Slow rotation
        crystal.angle += 0.002;

        // Pulse effect
        const pulse = Math.sin(time * 2 + index) * 0.1 + 1;
        const originalSize = crystal.size;
        crystal.size *= pulse;

        drawCrystal(crystal);

        crystal.size = originalSize;
      });

      // Draw connecting energy lines between crystals
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < crystals.length; i++) {
        for (let j = i + 1; j < crystals.length; j++) {
          const dx = crystals[i].x - crystals[j].x;
          const dy = crystals[i].y - crystals[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150 && crystals[i].size > 10 && crystals[j].size > 10) {
            const alpha = (1 - distance / 150) * 0.5;
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            
            ctx.beginPath();
            ctx.moveTo(crystals[i].x, crystals[i].y);
            ctx.lineTo(crystals[j].x, crystals[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}