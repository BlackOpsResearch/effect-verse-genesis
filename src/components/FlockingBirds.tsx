import { useEffect, useRef } from 'react';

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  hue: number;
}

export function FlockingBirds() {
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

    const boids: Boid[] = [];
    const boidCount = 60;
    const maxSpeed = 2;
    const maxForce = 0.03;

    // Initialize boids
    for (let i = 0; i < boidCount; i++) {
      boids.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        angle: 0,
        hue: 200 + Math.random() * 100
      });
    }

    const limit = (vector: {x: number, y: number}, max: number) => {
      const mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
      if (mag > max) {
        vector.x = (vector.x / mag) * max;
        vector.y = (vector.y / mag) * max;
      }
    };

    const separate = (boid: Boid) => {
      const desiredSeparation = 25;
      let steer = { x: 0, y: 0 };
      let count = 0;

      boids.forEach(other => {
        const d = Math.sqrt((boid.x - other.x) ** 2 + (boid.y - other.y) ** 2);
        if (d > 0 && d < desiredSeparation) {
          const diff = {
            x: boid.x - other.x,
            y: boid.y - other.y
          };
          const mag = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
          diff.x /= mag;
          diff.y /= mag;
          diff.x /= d; // Weight by distance
          diff.y /= d;
          steer.x += diff.x;
          steer.y += diff.y;
          count++;
        }
      });

      if (count > 0) {
        steer.x /= count;
        steer.y /= count;
        const mag = Math.sqrt(steer.x * steer.x + steer.y * steer.y);
        if (mag > 0) {
          steer.x = (steer.x / mag) * maxSpeed;
          steer.y = (steer.y / mag) * maxSpeed;
          steer.x -= boid.vx;
          steer.y -= boid.vy;
          limit(steer, maxForce);
        }
      }
      return steer;
    };

    const align = (boid: Boid) => {
      const neighborDist = 50;
      let sum = { x: 0, y: 0 };
      let count = 0;

      boids.forEach(other => {
        const d = Math.sqrt((boid.x - other.x) ** 2 + (boid.y - other.y) ** 2);
        if (d > 0 && d < neighborDist) {
          sum.x += other.vx;
          sum.y += other.vy;
          count++;
        }
      });

      if (count > 0) {
        sum.x /= count;
        sum.y /= count;
        const mag = Math.sqrt(sum.x * sum.x + sum.y * sum.y);
        if (mag > 0) {
          sum.x = (sum.x / mag) * maxSpeed;
          sum.y = (sum.y / mag) * maxSpeed;
          const steer = {
            x: sum.x - boid.vx,
            y: sum.y - boid.vy
          };
          limit(steer, maxForce);
          return steer;
        }
      }
      return { x: 0, y: 0 };
    };

    const cohesion = (boid: Boid) => {
      const neighborDist = 50;
      let sum = { x: 0, y: 0 };
      let count = 0;

      boids.forEach(other => {
        const d = Math.sqrt((boid.x - other.x) ** 2 + (boid.y - other.y) ** 2);
        if (d > 0 && d < neighborDist) {
          sum.x += other.x;
          sum.y += other.y;
          count++;
        }
      });

      if (count > 0) {
        sum.x /= count;
        sum.y /= count;
        const target = {
          x: sum.x - boid.x,
          y: sum.y - boid.y
        };
        const mag = Math.sqrt(target.x * target.x + target.y * target.y);
        if (mag > 0) {
          target.x = (target.x / mag) * maxSpeed;
          target.y = (target.y / mag) * maxSpeed;
          const steer = {
            x: target.x - boid.vx,
            y: target.y - boid.vy
          };
          limit(steer, maxForce);
          return steer;
        }
      }
      return { x: 0, y: 0 };
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 15, 35, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      boids.forEach(boid => {
        const sep = separate(boid);
        const ali = align(boid);
        const coh = cohesion(boid);

        // Apply forces
        boid.vx += sep.x * 1.5 + ali.x + coh.x;
        boid.vy += sep.y * 1.5 + ali.y + coh.y;

        // Limit speed
        limit({ x: boid.vx, y: boid.vy }, maxSpeed);

        // Update position
        boid.x += boid.vx;
        boid.y += boid.vy;

        // Wrap around screen
        if (boid.x < 0) boid.x = canvas.width;
        if (boid.x > canvas.width) boid.x = 0;
        if (boid.y < 0) boid.y = canvas.height;
        if (boid.y > canvas.height) boid.y = 0;

        // Calculate angle
        boid.angle = Math.atan2(boid.vy, boid.vx);

        // Draw boid
        ctx.save();
        ctx.translate(boid.x, boid.y);
        ctx.rotate(boid.angle);

        // Draw bird shape
        ctx.fillStyle = `hsl(${boid.hue}, 70%, 60%)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(-4, -3);
        ctx.lineTo(-2, 0);
        ctx.lineTo(-4, 3);
        ctx.closePath();
        ctx.fill();

        // Draw wings
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-2, -2);
        ctx.lineTo(-6, -4);
        ctx.moveTo(-2, 2);
        ctx.lineTo(-6, 4);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
      // Reposition boids if they're outside new bounds
      boids.forEach(boid => {
        if (boid.x > canvas.width) boid.x = canvas.width;
        if (boid.y > canvas.height) boid.y = canvas.height;
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'linear-gradient(180deg, #1a1a3a, #0a0a1a)' }}
    />
  );
}