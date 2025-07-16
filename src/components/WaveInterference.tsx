import { useEffect, useRef } from 'react';

export function WaveInterference() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();

    let time = 0;
    const sources = [
      { x: 0.3, y: 0.3, frequency: 0.02, amplitude: 0.8 },
      { x: 0.7, y: 0.7, frequency: 0.015, amplitude: 0.6 },
      { x: 0.2, y: 0.8, frequency: 0.025, amplitude: 0.7 }
    ];

    const draw = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let x = 0; x < canvas.width; x += 2) {
        for (let y = 0; y < canvas.height; y += 2) {
          let wave = 0;

          sources.forEach(source => {
            const dx = x - source.x * canvas.width;
            const dy = y - source.y * canvas.height;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            wave += source.amplitude * Math.sin(distance * source.frequency - time);
          });

          wave = Math.max(-1, Math.min(1, wave));
          
          const intensity = (wave + 1) / 2;
          const hue = (intensity * 240 + time * 50) % 360;
          
          const rgb = hslToRgb(hue / 360, 0.8, intensity * 0.5 + 0.2);
          
          const index = (y * canvas.width + x) * 4;
          if (index < data.length) {
            data[index] = rgb[0];
            data[index + 1] = rgb[1];
            data[index + 2] = rgb[2];
            data[index + 3] = 255;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      time += 0.1;
    };

    const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h * 6) % 2 - 1));
      const m = l - c / 2;
      
      let r = 0, g = 0, b = 0;
      
      if (h < 1/6) { r = c; g = x; b = 0; }
      else if (h < 2/6) { r = x; g = c; b = 0; }
      else if (h < 3/6) { r = 0; g = c; b = x; }
      else if (h < 4/6) { r = 0; g = x; b = c; }
      else if (h < 5/6) { r = x; g = 0; b = c; }
      else { r = c; g = 0; b = x; }
      
      return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
      ];
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: '#000' }}
    />
  );
}