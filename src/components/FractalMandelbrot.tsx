import { useEffect, useRef, useState } from "react";

export const FractalMandelbrot = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    let animationId: number;
    let time = 0;

    const mandelbrot = (x: number, y: number, maxIterations: number) => {
      let real = x;
      let imag = y;
      let iterations = 0;

      while (iterations < maxIterations && real * real + imag * imag <= 4) {
        const tempReal = real * real - imag * imag + x;
        imag = 2 * real * imag + y;
        real = tempReal;
        iterations++;
      }

      return iterations;
    };

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      const zoom = 1 + Math.sin(time * 0.02) * 0.5;
      const offsetX = Math.sin(time * 0.01) * 0.5;
      const offsetY = Math.cos(time * 0.015) * 0.3;

      for (let px = 0; px < canvas.width; px++) {
        for (let py = 0; py < canvas.height; py++) {
          const x = (px - canvas.width / 2) / (canvas.width / 4) / zoom + offsetX;
          const y = (py - canvas.height / 2) / (canvas.height / 4) / zoom + offsetY;

          const iterations = mandelbrot(x, y, 50);
          const hue = (iterations * 8 + time) % 360;
          const saturation = iterations < 50 ? 80 : 0;
          const lightness = iterations < 50 ? 50 : 0;

          // Convert HSL to RGB
          const c = (1 - Math.abs(2 * lightness / 100 - 1)) * saturation / 100;
          const x1 = c * (1 - Math.abs((hue / 60) % 2 - 1));
          const m = lightness / 100 - c / 2;

          let r = 0, g = 0, b = 0;
          if (hue < 60) { r = c; g = x1; b = 0; }
          else if (hue < 120) { r = x1; g = c; b = 0; }
          else if (hue < 180) { r = 0; g = c; b = x1; }
          else if (hue < 240) { r = 0; g = x1; b = c; }
          else if (hue < 300) { r = x1; g = 0; b = c; }
          else { r = c; g = 0; b = x1; }

          const index = (py * canvas.width + px) * 4;
          data[index] = Math.round((r + m) * 255);
          data[index + 1] = Math.round((g + m) * 255);
          data[index + 2] = Math.round((b + m) * 255);
          data[index + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      time++;
      animationId = requestAnimationFrame(animate);
    };

    if (isHovered) {
      animate();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};