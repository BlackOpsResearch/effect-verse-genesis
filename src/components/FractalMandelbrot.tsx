import { useEffect, useRef } from 'react';

export function FractalMandelbrot() {
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
    
    let zoom = 1;
    let offsetX = -0.5;
    let offsetY = 0;
    let time = 0;

    function mandelbrot(cx: number, cy: number, maxIter: number) {
      let x = 0;
      let y = 0;
      let iter = 0;
      
      while (x * x + y * y <= 4 && iter < maxIter) {
        const xtemp = x * x - y * y + cx;
        y = 2 * x * y + cy;
        x = xtemp;
        iter++;
      }
      
      return iter;
    }

    function drawMandelbrot() {
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      const maxIter = 80;
      const scale = 4 / zoom;
      
      for (let px = 0; px < width; px++) {
        for (let py = 0; py < height; py++) {
          const x = (px - width / 2) * scale / width + offsetX;
          const y = (py - height / 2) * scale / height + offsetY;
          
          const iter = mandelbrot(x, y, maxIter);
          const index = (py * width + px) * 4;
          
          if (iter === maxIter) {
            // Inside the set - black
            data[index] = 0;
            data[index + 1] = 0;
            data[index + 2] = 0;
            data[index + 3] = 255;
          } else {
            // Outside the set - colorful
            const hue = (iter * 8 + time * 2) % 360;
            const saturation = 0.8;
            const lightness = 0.5 + 0.3 * Math.sin(iter * 0.2 + time * 0.1);
            
            // Convert HSL to RGB
            const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
            const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
            const m = lightness - c / 2;
            
            let r = 0, g = 0, b = 0;
            
            if (hue < 60) { r = c; g = x; b = 0; }
            else if (hue < 120) { r = x; g = c; b = 0; }
            else if (hue < 180) { r = 0; g = c; b = x; }
            else if (hue < 240) { r = 0; g = x; b = c; }
            else if (hue < 300) { r = x; g = 0; b = c; }
            else { r = c; g = 0; b = x; }
            
            data[index] = Math.floor((r + m) * 255);
            data[index + 1] = Math.floor((g + m) * 255);
            data[index + 2] = Math.floor((b + m) * 255);
            data[index + 3] = 255;
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    }

    function animate() {
      time += 0.02;
      
      // Slowly zoom and pan
      zoom *= 1.005;
      offsetX += Math.sin(time * 0.1) * 0.001 / zoom;
      offsetY += Math.cos(time * 0.07) * 0.001 / zoom;
      
      // Reset zoom periodically for infinite exploration
      if (zoom > 100) {
        zoom = 1;
        offsetX = -0.5 + (Math.random() - 0.5) * 0.5;
        offsetY = (Math.random() - 0.5) * 0.5;
      }
      
      drawMandelbrot();
      
      // Add glow overlay
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = `hsla(${time * 5 % 360}, 50%, 30%, 0.1)`;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
      
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: '#000000' }}
    />
  );
}