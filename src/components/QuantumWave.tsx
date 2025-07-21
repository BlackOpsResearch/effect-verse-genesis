import { useEffect, useRef, useState } from "react";

export const QuantumWave = () => {
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

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.fillStyle = "rgba(0, 0, 30, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const amplitude = 60;
      const frequency = 0.02;
      const waveSpeed = 0.05;
      const numWaves = 5;

      // Draw quantum waves
      for (let wave = 0; wave < numWaves; wave++) {
        const waveOffset = wave * Math.PI / 3;
        const waveAmplitude = amplitude * (1 - wave * 0.15);
        const hue = (240 + wave * 40 + time * 0.5) % 360;
        
        // Main wave
        ctx.strokeStyle = `hsl(${hue}, 80%, ${60 - wave * 8}%)`;
        ctx.lineWidth = 3 - wave * 0.4;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 8 - wave;
        
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 2) {
          const y = centerY + Math.sin(x * frequency + time * waveSpeed + waveOffset) * waveAmplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Probability clouds
        for (let x = 0; x < canvas.width; x += 8) {
          const baseY = centerY + Math.sin(x * frequency + time * waveSpeed + waveOffset) * waveAmplitude;
          const uncertainty = 20 * Math.sin(x * 0.01 + time * 0.02 + waveOffset);
          
          for (let i = 0; i < 5; i++) {
            const cloudY = baseY + (Math.random() - 0.5) * uncertainty;
            const cloudSize = Math.random() * 3 + 1;
            const alpha = 0.3 * (1 - wave * 0.1);
            
            ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${alpha})`;
            ctx.shadowBlur = 3;
            ctx.beginPath();
            ctx.arc(x, cloudY, cloudSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Wave interference patterns
        if (wave > 0) {
          for (let x = 0; x < canvas.width; x += 4) {
            const y1 = centerY + Math.sin(x * frequency + time * waveSpeed) * amplitude;
            const y2 = centerY + Math.sin(x * frequency + time * waveSpeed + waveOffset) * waveAmplitude;
            const interference = Math.abs(y1 - y2);
            
            if (interference < 10) {
              ctx.fillStyle = `hsla(${hue}, 100%, 80%, 0.6)`;
              ctx.shadowBlur = 6;
              ctx.beginPath();
              ctx.arc(x, (y1 + y2) / 2, 4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Quantum tunneling effect
      const tunnelX = (time * 2) % (canvas.width + 40) - 20;
      const tunnelHeight = 80;
      const tunnelTop = centerY - tunnelHeight / 2;
      const tunnelBottom = centerY + tunnelHeight / 2;
      
      // Barrier
      ctx.fillStyle = "rgba(100, 100, 255, 0.3)";
      ctx.fillRect(canvas.width * 0.6, tunnelTop, 20, tunnelHeight);
      
      // Particle
      if (tunnelX > 0 && tunnelX < canvas.width) {
        const probability = tunnelX > canvas.width * 0.6 ? 0.3 : 1.0;
        
        if (Math.random() < probability) {
          ctx.fillStyle = `hsl(60, 100%, 70%)`;
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(tunnelX, centerY, 6, 0, Math.PI * 2);
          ctx.fill();
          
          // Particle trail
          for (let i = 1; i <= 8; i++) {
            const alpha = 1 - i / 8;
            ctx.fillStyle = `hsla(60, 100%, 70%, ${alpha * probability})`;
            ctx.shadowBlur = 5 * alpha;
            ctx.beginPath();
            ctx.arc(tunnelX - i * 4, centerY, 6 * alpha, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

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