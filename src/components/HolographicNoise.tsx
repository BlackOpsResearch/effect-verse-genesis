import React, { useEffect, useRef } from 'react';

export function HolographicNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;

    const noise = (x: number, y: number, z: number): number => {
      return Math.sin(x * 0.02 + z) * Math.cos(y * 0.015 + z) * Math.sin((x + y) * 0.01 + z);
    };

    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      time += 0.05;

      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const index = (y * canvas.width + x) * 4;
          
          // Multiple noise layers
          const noise1 = noise(x, y, time);
          const noise2 = noise(x * 2, y * 2, time * 1.5);
          const noise3 = noise(x * 4, y * 4, time * 2);
          
          const combined = (noise1 + noise2 * 0.5 + noise3 * 0.25) / 1.75;
          
          // Holographic interference pattern
          const interference = Math.sin(x * 0.1 + time * 2) * Math.sin(y * 0.08 + time * 1.8);
          const hologram = combined + interference * 0.3;
          
          // Scanline effect
          const scanline = Math.sin(y * 0.5 + time * 10) * 0.1;
          
          const finalValue = (hologram + scanline + 1) * 0.5;
          
          // Color mapping
          const hue = (finalValue * 180 + time * 20) % 360;
          const saturation = 80 + finalValue * 20;
          const lightness = 30 + finalValue * 40;
          
          // Convert HSL to RGB
          const c = (1 - Math.abs(2 * lightness / 100 - 1)) * saturation / 100;
          const x1 = c * (1 - Math.abs((hue / 60) % 2 - 1));
          const m = lightness / 100 - c / 2;
          
          let r = 0, g = 0, b = 0;
          
          if (hue < 60) {
            r = c; g = x1; b = 0;
          } else if (hue < 120) {
            r = x1; g = c; b = 0;
          } else if (hue < 180) {
            r = 0; g = c; b = x1;
          } else if (hue < 240) {
            r = 0; g = x1; b = c;
          } else if (hue < 300) {
            r = x1; g = 0; b = c;
          } else {
            r = c; g = 0; b = x1;
          }
          
          data[index] = Math.round((r + m) * 255);     // Red
          data[index + 1] = Math.round((g + m) * 255); // Green
          data[index + 2] = Math.round((b + m) * 255); // Blue
          data[index + 3] = 255; // Alpha
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Add holographic glitch lines
      if (Math.random() < 0.1) {
        const glitchY = Math.random() * canvas.height;
        const glitchHeight = 2 + Math.random() * 5;
        
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.fillRect(0, glitchY, canvas.width, glitchHeight);
      }

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
      style={{ background: 'linear-gradient(45deg, #001122, #112200)' }}
    />
  );
}