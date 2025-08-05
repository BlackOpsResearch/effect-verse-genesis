import React, { useEffect, useRef } from 'react';

interface Cloud {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  lightningCharge: number;
}

export function StormClouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const clouds: Cloud[] = [];
    const cloudCount = 8;

    // Create clouds
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.6,
        size: 50 + Math.random() * 100,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.5,
        lightningCharge: Math.random() * 100
      });
    }

    let time = 0;

    const drawLightning = (startX: number, startY: number, endX: number, endY: number, segments: number = 10) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;

      let currentX = startX;
      let currentY = startY;
      
      ctx.beginPath();
      ctx.moveTo(currentX, currentY);

      for (let i = 1; i <= segments; i++) {
        const progress = i / segments;
        const targetX = startX + (endX - startX) * progress;
        const targetY = startY + (endY - startY) * progress;
        
        // Add randomness
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 10;
        
        currentX = targetX + offsetX;
        currentY = targetY + offsetY;
        
        ctx.lineTo(currentX, currentY);
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Branches
      if (Math.random() < 0.3) {
        const branchX = currentX + (Math.random() - 0.5) * 50;
        const branchY = currentY + Math.random() * 30;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(branchX, branchY);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.02;

      // Background lightning flashes
      if (Math.random() < 0.01) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      clouds.forEach((cloud, i) => {
        // Move clouds
        cloud.x += cloud.speed;
        if (cloud.x > canvas.width + cloud.size) {
          cloud.x = -cloud.size;
        }

        cloud.lightningCharge += 1 + Math.random() * 2;

        // Draw cloud
        const cloudOpacity = cloud.opacity + Math.sin(time * 3 + i) * 0.1;
        
        // Multiple cloud layers for volume
        for (let layer = 0; layer < 3; layer++) {
          const layerSize = cloud.size * (0.8 + layer * 0.1);
          const layerX = cloud.x + (layer - 1) * 10;
          const layerY = cloud.y + (layer - 1) * 5;
          
          const gradient = ctx.createRadialGradient(
            layerX, layerY, 0,
            layerX, layerY, layerSize
          );
          gradient.addColorStop(0, `rgba(60, 60, 100, ${cloudOpacity * (1 - layer * 0.2)})`);
          gradient.addColorStop(0.5, `rgba(40, 40, 80, ${cloudOpacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(20, 20, 60, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(layerX, layerY, layerSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Lightning strikes
        if (cloud.lightningCharge > 100 && Math.random() < 0.02) {
          cloud.lightningCharge = 0;
          
          const lightningStartX = cloud.x + (Math.random() - 0.5) * cloud.size;
          const lightningStartY = cloud.y + cloud.size * 0.5;
          const lightningEndX = lightningStartX + (Math.random() - 0.5) * 100;
          const lightningEndY = canvas.height;

          drawLightning(lightningStartX, lightningStartY, lightningEndX, lightningEndY);

          // Flash effect
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Electric charge visualization
        if (cloud.lightningCharge > 50) {
          const chargeIntensity = (cloud.lightningCharge - 50) / 50;
          ctx.strokeStyle = `rgba(255, 255, 0, ${chargeIntensity * 0.5})`;
          ctx.lineWidth = 1;
          
          for (let j = 0; j < 5; j++) {
            const sparkX = cloud.x + (Math.random() - 0.5) * cloud.size;
            const sparkY = cloud.y + (Math.random() - 0.5) * cloud.size * 0.5;
            
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2);
            ctx.stroke();
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
      style={{ background: 'linear-gradient(180deg, #1a1a3e, #0a0a1e)' }}
    />
  );
}