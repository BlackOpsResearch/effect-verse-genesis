import { useEffect, useRef } from 'react';

interface Tile {
  x: number;
  y: number;
  size: number;
  rotation: number;
  hue: number;
  pulsePhase: number;
}

export function TessellationPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const tiles: Tile[] = [];
    let time = 0;

    const initTiles = () => {
      tiles.length = 0;
      const tileSize = 40;
      const cols = Math.ceil(canvas.width / tileSize) + 2;
      const rows = Math.ceil(canvas.height / tileSize) + 2;

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          // Hexagonal offset
          const offsetX = (row % 2) * (tileSize * 0.5);
          tiles.push({
            x: col * tileSize + offsetX - tileSize,
            y: row * tileSize * 0.866 - tileSize,
            size: tileSize * 0.8,
            rotation: 0,
            hue: (col + row) * 30 % 360,
            pulsePhase: (col + row) * 0.5
          });
        }
      }
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initTiles();
    };

    const drawHexagon = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hexX = Math.cos(angle) * size;
        const hexY = Math.sin(angle) * size;
        
        if (i === 0) {
          ctx.moveTo(hexX, hexY);
        } else {
          ctx.lineTo(hexX, hexY);
        }
      }
      ctx.closePath();
      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      tiles.forEach((tile, index) => {
        // Update tile properties
        tile.rotation += 0.005;
        const pulse = Math.sin(time * 0.02 + tile.pulsePhase) * 0.3 + 1;
        const currentSize = tile.size * pulse;

        // Distance-based effects
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distance = Math.sqrt((tile.x - centerX) ** 2 + (tile.y - centerY) ** 2);
        const wave = Math.sin(distance * 0.01 - time * 0.05) * 0.5 + 0.5;

        // Color based on position and time
        const hue = (tile.hue + time * 0.5 + distance * 0.1) % 360;
        const saturation = 60 + wave * 40;
        const lightness = 40 + wave * 30;
        const alpha = 0.6 + wave * 0.4;

        // Create gradient
        const gradient = ctx.createRadialGradient(
          tile.x, tile.y, 0,
          tile.x, tile.y, currentSize
        );
        gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness + 20}%, ${alpha})`);
        gradient.addColorStop(0.7, `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.7})`);
        gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness - 10}%, 0)`);

        // Draw hexagon
        ctx.fillStyle = gradient;
        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness + 30}%, ${alpha * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.3)`;
        ctx.shadowBlur = 8;

        drawHexagon(tile.x, tile.y, currentSize, tile.rotation + wave * 0.2);
        ctx.fill();
        ctx.stroke();

        // Add connecting lines between nearby tiles
        if (index % 7 === 0) {
          tiles.slice(index + 1, index + 4).forEach(nearTile => {
            const dist = Math.sqrt((tile.x - nearTile.x) ** 2 + (tile.y - nearTile.y) ** 2);
            if (dist < 60) {
              ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${0.2 * wave})`;
              ctx.lineWidth = 1;
              ctx.shadowBlur = 4;
              ctx.beginPath();
              ctx.moveTo(tile.x, tile.y);
              ctx.lineTo(nearTile.x, nearTile.y);
              ctx.stroke();
            }
          });
        }

        ctx.shadowBlur = 0;
      });

      time += 1;
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'radial-gradient(circle, #0a0520, #050210)' }}
    />
  );
}