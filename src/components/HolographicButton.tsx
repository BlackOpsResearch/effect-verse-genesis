import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HolographicButtonProps {
  children: React.ReactNode;
  variant?: "default" | "electric" | "plasma" | "cyber";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function HolographicButton({ 
  children, 
  variant = "default", 
  size = "md", 
  className, 
  onClick 
}: HolographicButtonProps) {
  const baseClasses = "btn-holographic font-medium relative overflow-hidden transition-electric";
  
  const variants = {
    default: "gradient-electric text-white",
    electric: "gradient-electric text-white animate-electric-pulse",
    plasma: "gradient-plasma text-white",
    cyber: "gradient-cyber text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <Button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}