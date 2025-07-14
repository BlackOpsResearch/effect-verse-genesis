import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ElectricButtonProps {
  children: React.ReactNode;
  variant?: "electric" | "plasma" | "cyber" | "neural";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function ElectricButton({ 
  children, 
  variant = "electric", 
  size = "md", 
  className, 
  onClick 
}: ElectricButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x,
        y
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
    
    onClick?.();
  };

  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 border-0";
  
  const variants = {
    electric: "bg-gradient-to-r from-electric-blue to-electric-purple text-white shadow-lg hover:shadow-electric-blue/50",
    plasma: "bg-gradient-to-r from-electric-purple to-electric-pink text-white shadow-lg hover:shadow-electric-purple/50",
    cyber: "bg-gradient-to-r from-electric-cyan to-electric-blue text-white shadow-lg hover:shadow-electric-cyan/50",
    neural: "bg-gradient-to-r from-electric-green to-electric-cyan text-white shadow-lg hover:shadow-electric-green/50"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const hoverEffects = {
    electric: "hover:scale-105 hover:brightness-110",
    plasma: "hover:scale-105 hover:brightness-110",
    cyber: "hover:scale-105 hover:brightness-110",
    neural: "hover:scale-105 hover:brightness-110"
  };

  return (
    <Button
      ref={buttonRef}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        hoverEffects[variant],
        isHovered && "animate-pulse",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Electric border effect */}
      <div className="absolute inset-0 rounded-lg opacity-50">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -skew-x-12 transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
      </div>

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '0.6s'
          }}
        />
      ))}

      {/* Content with glow effect */}
      <span className="relative z-10 drop-shadow-lg">
        {children}
      </span>

      {/* Hover glow overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-white/10 rounded-lg animate-pulse" />
      )}
    </Button>
  );
}