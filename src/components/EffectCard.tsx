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
import { FireworksBurst } from "./FireworksBurst";
import { LightningStorm } from "./LightningStorm";
import { OceanWaves } from "./OceanWaves";
import { PlasmaBall } from "./PlasmaBall";
import { RippleEffect } from "./RippleEffect";
import { BinaryMatrix } from "./BinaryMatrix";
import { ParticleSwarm } from "./ParticleSwarm";
import { SolarFlare } from "./SolarFlare";
import { QuantumTunnel } from "./QuantumTunnel";
import { FlockingBirds } from "./FlockingBirds";
import { AuroraWaves } from "./AuroraWaves";
import { TessellationPattern } from "./TessellationPattern";
import { CosmicDust } from "./CosmicDust";
import { SpaceDebris } from "./SpaceDebris";
import { NeuralPulse } from "./NeuralPulse";
import { DigitalRain } from "./DigitalRain";
import { ElectromagneticField } from "./ElectromagneticField";
import { CyberCircuit } from "./CyberCircuit";
import { ParticlePhysics } from "./ParticlePhysics";
import { QuantumEntanglement } from "./QuantumEntanglement";
import { MagneticField } from "./MagneticField";
import { FiberOptics } from "./FiberOptics";
import { GravityWells } from "./GravityWells";
import { LiquidMetal } from "./LiquidMetal";
import { PerlinNoise } from "./PerlinNoise";
import { CrystalCave } from "./CrystalCave";
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
      case "Fireworks Burst":
        return <FireworksBurst />;
      case "Lightning Storm":
        return <LightningStorm />;
      case "Ocean Waves":
        return <OceanWaves />;
      case "Plasma Ball":
        return <PlasmaBall />;
      case "Ripple Effect":
        return <RippleEffect />;
      case "Binary Matrix":
        return <BinaryMatrix />;
      case "Particle Swarm":
        return <ParticleSwarm />;
      case "Solar Flare":
        return <SolarFlare />;
      case "Quantum Tunnel":
        return <QuantumTunnel />;
      case "Flocking Birds":
        return <FlockingBirds />;
      case "Aurora Waves":
        return <AuroraWaves />;
      case "Tessellation":
        return <TessellationPattern />;
      case "Cosmic Dust":
        return <CosmicDust />;
      case "Space Debris":
        return <SpaceDebris />;
      case "Neural Pulse":
        return <NeuralPulse />;
      case "Digital Rain":
        return <DigitalRain />;
      case "Electromagnetic Field":
        return <ElectromagneticField />;
      case "Cyber Circuit":
        return <CyberCircuit />;
      case "Particle Physics":
        return <ParticlePhysics />;
      case "Quantum Entanglement":
        return <QuantumEntanglement />;
      case "Magnetic Field":
        return <MagneticField />;
      case "Fiber Optics":
        return <FiberOptics />;
      case "Gravity Wells":
        return <GravityWells />;
      case "Liquid Metal":
        return <LiquidMetal />;
      case "Perlin Noise":
        return <PerlinNoise />;
      case "Crystal Cave":
        return <CrystalCave />;
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
      "Game of Life": "CellularAutomata",
      "Fireworks Burst": "FireworksBurst",
      "Lightning Storm": "LightningStorm",
      "Ocean Waves": "OceanWaves",
      "Plasma Ball": "PlasmaBall",
      "Ripple Effect": "RippleEffect",
      "Binary Matrix": "BinaryMatrix",
      "Particle Swarm": "ParticleSwarm",
      "Solar Flare": "SolarFlare",
      "Quantum Tunnel": "QuantumTunnel",
      "Flocking Birds": "FlockingBirds",
      "Aurora Waves": "AuroraWaves",
      "Tessellation": "TessellationPattern",
      "Cosmic Dust": "CosmicDust",
      "Space Debris": "SpaceDebris",
      "Neural Pulse": "NeuralPulse",
      "Digital Rain": "DigitalRain",
      "Electromagnetic Field": "ElectromagneticField",
      "Cyber Circuit": "CyberCircuit",
      "Particle Physics": "ParticlePhysics",
      "Quantum Entanglement": "QuantumEntanglement",
      "Magnetic Field": "MagneticField",
      "Fiber Optics": "FiberOptics",
      "Gravity Wells": "GravityWells",
      "Liquid Metal": "LiquidMetal",
      "Perlin Noise": "PerlinNoise",
      "Crystal Cave": "CrystalCave"
    };

    const componentName = componentMap[title] || "PlasmaEffect";
    
    // Read the actual source files and return their content
    const getSourceCode = async (componentName: string): Promise<string> => {
      try {
        // This would normally fetch the actual file content
        // For now, we'll return a template with the import
        return `import { ${componentName} } from "@/components/${componentName}";

export function MyEffect() {
  return (
    <div className="w-full h-full">
      <${componentName} ${title.includes("Plasma") ? 'intensity={0.8} speed={1.2}' : title.includes("Quantum Fields") ? 'intensity={0.8}' : ''} />
    </div>
  );
}

// To use this effect:
// 1. Copy this code into your component file
// 2. Make sure to import the ${componentName} component
// 3. Style the container div as needed`;
      } catch (error) {
        return `// Error loading source code for ${componentName}
import { ${componentName} } from "@/components/${componentName}";

export function MyEffect() {
  return <${componentName} />;
}`;
      }
    };

    return getSourceCode(componentName);
    
  };

  const handleDownload = async () => {
    const code = await getEffectCode();
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
    const code = await getEffectCode();
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Code Copied",
        description: "Full effect code has been copied to clipboard.",
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
        <div className="absolute inset-0 group-hover:block hidden">
          {getEffectComponent()}
        </div>
        <div className="absolute inset-0 group-hover:hidden flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Hover to preview</div>
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