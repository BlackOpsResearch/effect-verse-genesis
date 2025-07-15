import { useEffect, useRef } from 'react';

export function DNAHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const centerX = canvas.width / 4;
    const centerY = canvas.height / 4;
    let time = 0;

    function animate() {
      time += 0.02;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

      const helixHeight = canvas.height / 2 - 40;
      const helixRadius = 40;
      const helixCount = 4;

      // Draw DNA strands
      for (let strand = 0; strand < 2; strand++) {
        const strandOffset = strand * Math.PI;
        
        ctx.strokeStyle = strand === 0 
          ? `hsla(200, 80%, 60%, 0.8)` 
          : `hsla(300, 80%, 60%, 0.8)`;
        ctx.lineWidth = 3;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        
        for (let i = 0; i <= 100; i++) {
          const t = i / 100;
          const y = 20 + t * helixHeight;
          const angle = time + strandOffset + t * Math.PI * 2 * helixCount;
          const x = centerX + Math.cos(angle) * helixRadius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw base pairs (rungs)
      for (let i = 0; i <= 50; i++) {
        const t = i / 50;
        const y = 20 + t * helixHeight;
        const angle1 = time + t * Math.PI * 2 * helixCount;
        const angle2 = time + Math.PI + t * Math.PI * 2 * helixCount;
        
        const x1 = centerX + Math.cos(angle1) * helixRadius;
        const x2 = centerX + Math.cos(angle2) * helixRadius;
        
        // Base pair connections
        ctx.strokeStyle = `hsla(${120 + Math.sin(time + i * 0.2) * 60}, 70%, 50%, 0.6)`;
        ctx.lineWidth = 2;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 4;
        
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
        
        // Base nucleotides
        const bases = ['A', 'T', 'C', 'G'];
        const baseIndex1 = Math.floor((i + time * 5) % 4);
        const baseIndex2 = (baseIndex1 + 2) % 4; // Complementary base
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = `hsla(${baseIndex1 * 90}, 80%, 70%, 0.9)`;
        ctx.beginPath();
        ctx.arc(x1, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `hsla(${baseIndex2 * 90}, 80%, 70%, 0.9)`;
        ctx.beginPath();
        ctx.arc(x2, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Base labels
        ctx.fillStyle = 'white';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(bases[baseIndex1], x1, y + 2);
        ctx.fillText(bases[baseIndex2], x2, y + 2);
      }

      // Phosphate backbone glow
      for (let strand = 0; strand < 2; strand++) {
        const strandOffset = strand * Math.PI;
        
        for (let i = 0; i <= 100; i += 5) {
          const t = i / 100;
          const y = 20 + t * helixHeight;
          const angle = time + strandOffset + t * Math.PI * 2 * helixCount;
          const x = centerX + Math.cos(angle) * helixRadius;
          
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
          gradient.addColorStop(0, strand === 0 
            ? `hsla(200, 100%, 80%, 0.8)` 
            : `hsla(300, 100%, 80%, 0.8)`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Phosphate molecule
          ctx.fillStyle = strand === 0 
            ? `hsla(200, 100%, 90%, 1)` 
            : `hsla(300, 100%, 90%, 1)`;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'linear-gradient(180deg, #000510 0%, #001020 100%)' }}
    />
  );
}