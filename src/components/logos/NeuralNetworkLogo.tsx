import React, { useRef, useEffect } from 'react';

export function NeuralNetworkLogo({ className = "", size = 64 }: { className?: string; size?: number }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.03;
      
      const nodes = logo.querySelectorAll('.node');
      const connections = logo.querySelectorAll('.connection');
      
      nodes.forEach((node, index) => {
        const htmlNode = node as HTMLElement;
        const pulse = Math.sin(time * 2 + index * 0.5) * 0.3 + 0.7;
        htmlNode.style.transform = `scale(${pulse})`;
        htmlNode.style.opacity = pulse.toString();
      });
      
      connections.forEach((connection, index) => {
        const htmlConnection = connection as HTMLElement;
        const flow = Math.sin(time * 3 + index * 0.8) * 0.5 + 0.5;
        htmlConnection.style.opacity = flow.toString();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div ref={logoRef} className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-green-500/20" />
      
      {/* Neural network structure */}
      <svg className="absolute inset-2" viewBox="0 0 48 48">
        {/* Connections */}
        <line className="connection" x1="12" y1="12" x2="24" y2="24" stroke="#10b981" strokeWidth="1" opacity="0.6" />
        <line className="connection" x1="12" y1="36" x2="24" y2="24" stroke="#10b981" strokeWidth="1" opacity="0.6" />
        <line className="connection" x1="24" y1="24" x2="36" y2="12" stroke="#10b981" strokeWidth="1" opacity="0.6" />
        <line className="connection" x1="24" y1="24" x2="36" y2="36" stroke="#10b981" strokeWidth="1" opacity="0.6" />
        
        {/* Nodes */}
        <circle className="node" cx="12" cy="12" r="3" fill="#3b82f6" />
        <circle className="node" cx="12" cy="36" r="3" fill="#3b82f6" />
        <circle className="node" cx="24" cy="24" r="4" fill="#10b981" />
        <circle className="node" cx="36" cy="12" r="3" fill="#8b5cf6" />
        <circle className="node" cx="36" cy="36" r="3" fill="#8b5cf6" />
      </svg>
      
      {/* Processing core */}
      <div className="absolute inset-5 rounded-full bg-gradient-to-br from-blue-300 to-green-400 animate-pulse shadow-lg shadow-green-400/50" />
    </div>
  );
}