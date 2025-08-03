import { useEffect, useRef, useState } from 'react';

interface PlasmaConfig {
  intensity?: number;
  speed?: number;
  color1?: string;
  color2?: string;
  color3?: string;
}

export function PlasmaEffect({ 
  intensity = 1.0,
  speed = 1.0,
  color1 = 'hsl(260, 100%, 65%)',
  color2 = 'hsl(320, 100%, 70%)',
  color3 = 'hsl(185, 100%, 70%)'
}: PlasmaConfig) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const width = canvas.width;
    const height = canvas.height;

    const animate = () => {
      if (!isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      time += 0.02 * speed;

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          // Plasma equations
          const value1 = Math.sin(x * 0.04 + time);
          const value2 = Math.sin(y * 0.03 + time * 0.7);
          const value3 = Math.sin((x + y) * 0.02 + time * 1.2);
          const value4 = Math.sin(Math.sqrt(x * x + y * y) * 0.02 + time * 0.8);
          
          const plasma = (value1 + value2 + value3 + value4) * 0.25 * intensity;
          
          // Convert to RGB with electric colors
          const hue1 = 260 + plasma * 60; // Purple to blue
          const hue2 = 320 + plasma * 40; // Pink to purple  
          const hue3 = 185 + plasma * 30; // Cyan variations
          
          const r = Math.floor(128 + 127 * Math.sin(plasma * Math.PI + time));
          const g = Math.floor(128 + 127 * Math.sin(plasma * Math.PI + time + 2));
          const b = Math.floor(128 + 127 * Math.sin(plasma * Math.PI + time + 4));
          
          const index = (y * width + x) * 4;
          data[index] = r;     // Red
          data[index + 1] = g; // Green
          data[index + 2] = b; // Blue
          data[index + 3] = Math.floor(100 + plasma * 100); // Alpha
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, speed, color1, color2, color3, isHovered]);

  return (
    <div 
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
      />
    </div>
  );
}