import { useEffect, useRef } from 'react';

export function FluidDynamics() {
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
    
    // Fluid simulation grid
    const resolution = 64;
    const velocityX = new Array(resolution * resolution).fill(0);
    const velocityY = new Array(resolution * resolution).fill(0);
    const density = new Array(resolution * resolution).fill(0);

    let mouseX = width / 2;
    let mouseY = height / 2;

    // Add mouse interaction
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (width / rect.width);
      mouseY = (e.clientY - rect.top) * (height / rect.height);
    });

    function getIndex(x: number, y: number) {
      return Math.floor(y) * resolution + Math.floor(x);
    }

    function addForce(x: number, y: number, forceX: number, forceY: number) {
      const gridX = (x / width) * resolution;
      const gridY = (y / height) * resolution;
      
      if (gridX >= 0 && gridX < resolution && gridY >= 0 && gridY < resolution) {
        const index = getIndex(gridX, gridY);
        velocityX[index] += forceX;
        velocityY[index] += forceY;
        density[index] += 0.5;
      }
    }

    function diffuse(b: number, x: number[], x0: number[], diffusion: number, dt: number) {
      const a = dt * diffusion * resolution * resolution;
      for (let k = 0; k < 4; k++) {
        for (let i = 1; i < resolution - 1; i++) {
          for (let j = 1; j < resolution - 1; j++) {
            const index = getIndex(i, j);
            x[index] = (x0[index] + a * (
              x[getIndex(i - 1, j)] + x[getIndex(i + 1, j)] +
              x[getIndex(i, j - 1)] + x[getIndex(i, j + 1)]
            )) / (1 + 4 * a);
          }
        }
      }
    }

    function advect(b: number, d: number[], d0: number[], u: number[], v: number[], dt: number) {
      for (let i = 1; i < resolution - 1; i++) {
        for (let j = 1; j < resolution - 1; j++) {
          const x = i - dt * resolution * u[getIndex(i, j)];
          const y = j - dt * resolution * v[getIndex(i, j)];
          
          const x0 = Math.max(0.5, Math.min(resolution - 1.5, x));
          const y0 = Math.max(0.5, Math.min(resolution - 1.5, y));
          
          const i0 = Math.floor(x0);
          const j0 = Math.floor(y0);
          const i1 = i0 + 1;
          const j1 = j0 + 1;
          
          const s1 = x0 - i0;
          const s0 = 1 - s1;
          const t1 = y0 - j0;
          const t0 = 1 - t1;
          
          d[getIndex(i, j)] = s0 * (t0 * d0[getIndex(i0, j0)] + t1 * d0[getIndex(i0, j1)]) +
                              s1 * (t0 * d0[getIndex(i1, j0)] + t1 * d0[getIndex(i1, j1)]);
        }
      }
    }

    let time = 0;

    function animate() {
      time += 0.016;
      
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, width, height);

      // Add swirling forces
      const centerX = width / 2 + Math.sin(time * 0.5) * 50;
      const centerY = height / 2 + Math.cos(time * 0.3) * 30;
      
      addForce(centerX, centerY, 
        Math.cos(time * 2) * 0.5, 
        Math.sin(time * 2) * 0.5
      );

      // Add mouse force
      addForce(mouseX, mouseY, 
        (mouseX - width / 2) * 0.001, 
        (mouseY - height / 2) * 0.001
      );

      // Simulate fluid
      const velocityX0 = [...velocityX];
      const velocityY0 = [...velocityY];
      const density0 = [...density];

      diffuse(1, velocityX, velocityX0, 0.00001, 0.016);
      diffuse(2, velocityY, velocityY0, 0.00001, 0.016);
      
      advect(1, velocityX0, velocityX, velocityX, velocityY, 0.016);
      advect(2, velocityY0, velocityY, velocityX, velocityY, 0.016);
      
      advect(0, density0, density, velocityX, velocityY, 0.016);
      diffuse(0, density, density0, 0.00001, 0.016);

      // Render fluid
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
          const d = Math.min(1, density[getIndex(i, j)]);
          const hue = (time * 50 + i * 2 + j * 2) % 360;
          
          // Convert HSL to RGB
          const c = (1 - Math.abs(2 * 0.5 - 1)) * 0.8;
          const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
          const m = 0.5 - c / 2;
          
          let r = 0, g = 0, b = 0;
          
          if (hue < 60) { r = c; g = x; b = 0; }
          else if (hue < 120) { r = x; g = c; b = 0; }
          else if (hue < 180) { r = 0; g = c; b = x; }
          else if (hue < 240) { r = 0; g = x; b = c; }
          else if (hue < 300) { r = x; g = 0; b = c; }
          else { r = c; g = 0; b = x; }
          
          const pixelX = Math.floor((i / resolution) * width);
          const pixelY = Math.floor((j / resolution) * height);
          
          for (let px = 0; px < Math.ceil(width / resolution); px++) {
            for (let py = 0; py < Math.ceil(height / resolution); py++) {
              const index = ((pixelY + py) * width + (pixelX + px)) * 4;
              if (index < data.length - 3) {
                data[index] = Math.floor((r + m) * 255 * d);
                data[index + 1] = Math.floor((g + m) * 255 * d);
                data[index + 2] = Math.floor((b + m) * 255 * d);
                data[index + 3] = Math.floor(255 * d * 0.8);
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Decay density
      for (let i = 0; i < density.length; i++) {
        density[i] *= 0.995;
        velocityX[i] *= 0.99;
        velocityY[i] *= 0.99;
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      style={{ background: 'radial-gradient(circle, #001122 0%, #000000 100%)' }}
    />
  );
}