import { useEffect, useRef, useState } from 'react';

export function LSystemTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // L-System rules
    const axiom = "F";
    const rules = {
      "F": "F[+F]F[-F]F"
    };

    let generation = 0;
    let currentString = axiom;

    const generateLSystem = () => {
      let newString = "";
      for (let char of currentString) {
        newString += rules[char as keyof typeof rules] || char;
      }
      return newString;
    };

    const drawLSystem = (instructions: string, startX: number, startY: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let x = startX;
      let y = startY;
      let angle = -Math.PI / 2; // Start pointing up
      let length = 8;
      
      const stack: Array<{x: number, y: number, angle: number}> = [];
      
      ctx.strokeStyle = 'hsl(120, 100%, 60%)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'hsl(120, 100%, 60%)';

      for (let char of instructions) {
        switch (char) {
          case 'F':
            const newX = x + Math.cos(angle) * length;
            const newY = y + Math.sin(angle) * length;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(newX, newY);
            ctx.stroke();
            
            x = newX;
            y = newY;
            break;
            
          case '+':
            angle += Math.PI / 6; // 30 degrees
            break;
            
          case '-':
            angle -= Math.PI / 6; // 30 degrees
            break;
            
          case '[':
            stack.push({x, y, angle});
            break;
            
          case ']':
            const state = stack.pop();
            if (state) {
              x = state.x;
              y = state.y;
              angle = state.angle;
            }
            break;
        }
      }
    };

    const animate = () => {
      if (!isHovered) return;
      
      generation++;
      if (generation < 5) {
        currentString = generateLSystem();
        setTimeout(() => {
          if (isHovered) {
            drawLSystem(currentString, canvas.width / 2, canvas.height - 20);
            setTimeout(animate, 2000);
          }
        }, 500);
      } else {
        // Reset
        generation = 0;
        currentString = axiom;
        setTimeout(animate, 3000);
      }
    };

    if (isHovered) {
      drawLSystem(currentString, canvas.width / 2, canvas.height - 20);
      setTimeout(animate, 2000);
    }

  }, [isHovered]);

  return (
    <div 
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="absolute inset-0 w-full h-full opacity-80"
      />
    </div>
  );
}