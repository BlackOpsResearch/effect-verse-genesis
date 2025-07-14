import { Card } from "@/components/ui/card";
import { ElectricButton } from "./ElectricButton";
import { PlasmaEffect } from "./PlasmaEffect";
import { LSystemTree } from "./LSystemTree";
import { SineWaveEffect } from "./SineWaveEffect";
import { Play, Eye, Download } from "lucide-react";

interface EffectCardProps {
  title: string;
  description: string;
  category: string;
  preview?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function EffectCard({ title, description, category, preview, className, style }: EffectCardProps) {
  return (
    <Card className={`glass glass-hover electric-border p-6 group ${className}`} style={style}>
      {/* Preview Area */}
      <div className="relative aspect-video bg-gradient-to-br from-background to-muted rounded-lg mb-4 overflow-hidden">
        {/* Dynamic effect based on category */}
        {category === "Plasma Effects" && (
          <div className="absolute inset-0">
            <PlasmaEffect intensity={0.8} speed={1.2} />
          </div>
        )}
        {category === "Generative" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LSystemTree />
          </div>
        )}
        {category === "Physics" && (
          <div className="absolute inset-0">
            <SineWaveEffect />
          </div>
        )}
        {(!["Plasma Effects", "Generative", "Physics"].includes(category)) && (
          <>
            <div className="absolute inset-0 particle-bg opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full gradient-electric animate-float opacity-80" />
              <div className="absolute w-16 h-16 rounded-full gradient-plasma animate-glow" />
            </div>
          </>
        )}
        
        {/* Overlay controls */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
          <ElectricButton variant="electric" size="sm">
            <Play className="w-4 h-4" />
          </ElectricButton>
          <ElectricButton variant="cyber" size="sm">
            <Eye className="w-4 h-4" />
          </ElectricButton>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-electric-cyan uppercase tracking-wider font-medium">
            {category}
          </span>
          <ElectricButton variant="plasma" size="sm">
            <Download className="w-4 h-4" />
          </ElectricButton>
        </div>
        
        <h3 className="text-xl font-bold text-electric group-hover:text-glow transition-all">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
}