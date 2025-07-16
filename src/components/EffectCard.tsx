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
import { MatrixRain } from "./MatrixRain";
import { NeonPulse } from "./NeonPulse";
import { VoronoiCells } from "./VoronoiCells";
import { WaveInterference } from "./WaveInterference";
import { GeometricTunnel } from "./GeometricTunnel";
import { CellularAutomata } from "./CellularAutomata";
import { Play, Eye, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EffectCardProps {
  title: string;
  description: string;
  category: string;
  preview?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function EffectCard({ title, description, category, preview, className, style }: EffectCardProps) {
  const { toast } = useToast();

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
      case "Matrix Rain":
        return <MatrixRain />;
      case "Neural Networks":
        return <NeuralNetworkBackground />;
      case "Morphing Geometries":
      case "Volumetric Clouds":
        return <MorphingGeometry />;
      case "Quantum Fields":
        return <QuantumField intensity={0.8} />;
      case "Quantum Tunneling":
        return <GeometricTunnel />;
      case "Magnetic Fields":
        return <WaveInterference />;
      case "Crystal Growth":
        return <CrystalGrowth />;
      case "DNA Helix":
        return <DNAHelix />;
      case "Procedural Fire":
        return <NeonPulse />;
      case "Voronoi Diagrams":
        return <VoronoiCells />;
      case "Game of Life":
        return <CellularAutomata />;
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

  const getEffectCode = () => {
    const componentMap: Record<string, string> = {
      "Electric Plasma Storm": "PlasmaEffect",
      "Plasma Tunnel": "PlasmaEffect",
      "Electric Web": "ElectricWeb",
      "L-System Fractals": "LSystemTree",
      "Fractal Trees": "LSystemTree",
      "Fractal Mandelbrot": "FractalMandelbrot",
      "Sine Wave Ocean": "SineWaveEffect",
      "Sonic Waves": "SineWaveEffect",
      "Fluid Dynamics": "FluidDynamics",
      "Particle Gravity": "ParticleGravity",
      "Holographic UI": "HologramShader",
      "Holographic Data": "HologramShader",
      "Particle Galaxy": "GalaxySpiral",
      "Galaxy Spiral": "GalaxySpiral",
      "Cyber Matrix": "CyberGrid",
      "Matrix Rain": "MatrixRain",
      "Neural Networks": "NeuralNetworkBackground",
      "Morphing Geometries": "MorphingGeometry",
      "Volumetric Clouds": "MorphingGeometry",
      "Quantum Fields": "QuantumField",
      "Quantum Tunneling": "GeometricTunnel",
      "Magnetic Fields": "WaveInterference",
      "Crystal Growth": "CrystalGrowth",
      "DNA Helix": "DNAHelix",
      "Procedural Fire": "NeonPulse",
      "Voronoi Diagrams": "VoronoiCells",
      "Game of Life": "CellularAutomata"
    };

    const componentName = componentMap[title] || "PlasmaEffect";
    return `import { ${componentName} } from "@/components/${componentName}";

export function MyEffect() {
  return (
    <div className="w-full h-full">
      <${componentName} ${title.includes("Plasma") ? 'intensity={0.8} speed={1.2}' : title.includes("Quantum Fields") ? 'intensity={0.8}' : ''} />
    </div>
  );
}`;
  };

  const handleDownload = () => {
    const code = getEffectCode();
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '')}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Effect Downloaded",
      description: `${title} component has been downloaded successfully.`,
    });
  };

  const handleCopyCode = async () => {
    const code = getEffectCode();
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Code Copied",
        description: "Effect code has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      });
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
          <ElectricButton variant="plasma" size="sm" onClick={handleCopyCode}>
            <Copy className="w-4 h-4" />
          </ElectricButton>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-electric-cyan uppercase tracking-wider font-medium">
            {category}
          </span>
          <ElectricButton variant="plasma" size="sm" onClick={handleDownload}>
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