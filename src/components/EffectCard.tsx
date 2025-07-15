import { Card } from "@/components/ui/card";
import { ElectricButton } from "./ElectricButton";
import { PlasmaEffect } from "./PlasmaEffect";
import { LSystemTree } from "./LSystemTree";
import { SineWaveEffect } from "./SineWaveEffect";
import { HologramShader } from "./HologramShader";
import { CyberGrid } from "./CyberGrid";
import { NeuralNetworkBackground } from "./NeuralNetworkBackground";
import { MorphingGeometry } from "./MorphingGeometry";
import { QuantumField } from "./QuantumField";
import { CrystalGrowth } from "./CrystalGrowth";
import { GalaxySpiral } from "./GalaxySpiral";
import { ElectricWeb } from "./ElectricWeb";
import { FluidDynamics } from "./FluidDynamics";
import { DNAHelix } from "./DNAHelix";
import { FractalMandelbrot } from "./FractalMandelbrot";
import { ParticleGravity } from "./ParticleGravity";
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
  const getEffectComponent = () => {
    // Map specific titles to components for variety
    switch (title) {
      case "Electric Plasma Storm":
      case "Plasma Tunnel":
        return <PlasmaEffect intensity={0.8} speed={1.2} />;
      case "Electric Web":
        return <ElectricWeb />;
      case "L-System Fractals":
      case "Fractal Trees":
        return <LSystemTree />;
      case "Fractal Mandelbrot":
        return <FractalMandelbrot />;
      case "Sine Wave Ocean":
      case "Sonic Waves":
        return <SineWaveEffect />;
      case "Fluid Dynamics":
        return <FluidDynamics />;
      case "Particle Gravity":
        return <ParticleGravity />;
      case "Holographic UI":
      case "Holographic Data":
        return <HologramShader />;
      case "Particle Galaxy":
      case "Galaxy Spiral":
        return <GalaxySpiral />;
      case "Cyber Matrix":
        return <CyberGrid />;
      case "Neural Networks":
        return <NeuralNetworkBackground />;
      case "Morphing Geometries":
      case "Volumetric Clouds":
        return <MorphingGeometry />;
      case "Quantum Fields":
      case "Quantum Tunneling":
      case "Magnetic Fields":
        return <QuantumField intensity={0.8} />;
      case "Crystal Growth":
      case "DNA Helix":
        return <DNAHelix />;
      case "Procedural Fire":
        return <CrystalGrowth />;
      default:
        // Fallback based on category
        if (category === "Plasma Effects") return <PlasmaEffect intensity={0.8} speed={1.2} />;
        if (category === "Generative") return <LSystemTree />;
        if (category === "Physics") return <SineWaveEffect />;
        if (category === "UI Effects") return <HologramShader />;
        if (category === "WebGPU") return <GalaxySpiral />;
        if (category === "Data Viz") return <NeuralNetworkBackground />;
        if (category === "3D Math") return <MorphingGeometry />;
        if (category === "Abstract") return <QuantumField intensity={0.8} />;
        if (category === "Simulation") return <DNAHelix />;
        return <PlasmaEffect intensity={0.8} speed={1.2} />;
    }
  };

  return (
    <Card className={`glass glass-hover electric-border p-6 group ${className}`} style={style}>
      {/* Preview Area */}
      <div className="relative aspect-video bg-gradient-to-br from-background to-muted rounded-lg mb-4 overflow-hidden">
        <div className="absolute inset-0">
          {getEffectComponent()}
        </div>
        
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