import { useEffect, useRef } from 'react';

export function CellularAutomata() {
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

    const cellSize = 4;
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    
    let grid: number[][] = [];
    let nextGrid: number[][] = [];

    const initGrid = () => {
      grid = Array(rows).fill(null).map(() => Array(cols).fill(0));
      nextGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));

      // Random initialization
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          grid[i][j] = Math.random() > 0.7 ? 1 : 0;
        }
      }
    };

    const countNeighbors = (x: number, y: number): number => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          
          const newX = x + i;
          const newY = y + j;
          
          if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
            count += grid[newX][newY];
          }
        }
      }
      return count;
    };

    const update = () => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const neighbors = countNeighbors(i, j);
          const current = grid[i][j];

          // Conway's Game of Life rules
          if (current === 1) {
            nextGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            nextGrid[i][j] = neighbors === 3 ? 1 : 0;
          }
        }
      }

      // Swap grids
      [grid, nextGrid] = [nextGrid, grid];
    };

    const draw = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (grid[i][j] === 1) {
            const age = Math.random(); // Simulate cell age for color variation
            const hue = (age * 60 + 180) % 360;
            ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
            ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
          }
        }
      }
    };

    initGrid();

    const interval = setInterval(() => {
      update();
      draw();
    }, 100);

    const handleResize = () => {
      resizeCanvas();
      initGrid();
    };

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