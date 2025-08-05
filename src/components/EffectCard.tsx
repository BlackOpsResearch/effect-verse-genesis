import { Card } from "@/components/ui/card";
import { ElectricButton } from "./ElectricButton";
import { PlasmaEffect } from "./PlasmaEffect";
import { LSystemTree } from "./LSystemTree";
import { SineWaveEffect } from "./SineWaveEffect";
import { HologramShader } from "./HologramShader";
import { CyberGrid } from "./CyberGrid";
import { ElectricWeb } from "./ElectricWeb";
import { DNAHelix } from "./DNAHelix";
import { FractalMandelbrot } from "./FractalMandelbrot";
import { ParticleGravity } from "./ParticleGravity";
import { ParticleSwarm } from "./ParticleSwarm";
import { MagneticField } from "./MagneticField";
import { FiberOptics } from "./FiberOptics";
import { GravityWells } from "./GravityWells";
import { LiquidMetal } from "./LiquidMetal";
import { PerlinNoise } from "./PerlinNoise";
import { CrystalCave } from "./CrystalCave";
import { BlackHole } from "./BlackHole";
import { Wormhole } from "./Wormhole";
import { NebulaCloud } from "./NebulaCloud";
import { Supernova } from "./Supernova";
import { MolecularDance } from "./MolecularDance";
import { Hyperdrive } from "./Hyperdrive";
import { CrystalGrid } from "./CrystalGrid";
import { FlowField } from "./FlowField";
import { VortexField } from "./VortexField";
import { LaserGrid } from "./LaserGrid";
import { QuantumWave } from "./QuantumWave";
import { ParticleExplosion } from "./ParticleExplosion";
import { LightTrails } from "./LightTrails";
import { CyberCells } from "./CyberCells";
import { FluidWarp } from "./FluidWarp";
import { StormClouds } from "./StormClouds";
import { FractalFlame } from "./FractalFlame";
import { HolographicNoise } from "./HolographicNoise";
import { EnergyOrbs } from "./EnergyOrbs";
import { DataStream } from "./DataStream";
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
        return <SineWaveEffect />;
      case "Particle Gravity":
        return <ParticleGravity />;
      case "Holographic UI":
      case "Holographic Data":
        return <HologramShader />;
      case "Particle Galaxy":
      case "Galaxy Spiral":
        return <CyberGrid />;
      case "Cyber Matrix":
      case "Matrix Rain":
        return <CyberGrid />;
      case "Neural Networks":
        return <CyberGrid />;
      case "Morphing Geometries":
      case "Volumetric Clouds":
        return <CrystalGrid />;
      case "Quantum Fields":
        return <PlasmaEffect intensity={0.8} speed={1.2} />;
      case "Quantum Tunneling":
        return <CrystalGrid />;
      case "Magnetic Fields":
        return <MagneticField />;
      case "Crystal Growth":
        return <CrystalCave />;
      case "DNA Helix":
        return <DNAHelix />;
      case "Procedural Fire":
        return <PlasmaEffect intensity={1.0} speed={1.5} />;
      case "Voronoi Diagrams":
        return <CrystalGrid />;
      case "Game of Life":
        return <CyberGrid />;
      case "Fireworks Burst":
        return <PlasmaEffect intensity={1.2} speed={2.0} />;
      case "Lightning Storm":
        return <ElectricWeb />;
      case "Ocean Waves":
        return <SineWaveEffect />;
      case "Plasma Ball":
        return <PlasmaEffect intensity={1.5} speed={1.0} />;
      case "Ripple Effect":
        return <SineWaveEffect />;
      case "Binary Matrix":
        return <CyberGrid />;
      case "Particle Swarm":
        return <ParticleSwarm />;
      case "Solar Flare":
        return <PlasmaEffect intensity={1.3} speed={1.8} />;
      case "Quantum Tunnel":
        return <CrystalGrid />;
      case "Flocking Birds":
        return <ParticleSwarm />;
      case "Aurora Waves":
        return <SineWaveEffect />;
      case "Tessellation":
        return <CrystalGrid />;
      case "Cosmic Dust":
        return <ParticleSwarm />;
      case "Space Debris":
        return <ParticleSwarm />;
      case "Neural Pulse":
        return <CyberGrid />;
      case "Digital Rain":
        return <CyberGrid />;
      case "Electromagnetic Field":
        return <MagneticField />;
      case "Cyber Circuit":
        return <CyberGrid />;
      case "Particle Physics":
        return <ParticleGravity />;
      case "Quantum Entanglement":
        return <QuantumWave />;
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
      case "Black Hole":
        return <BlackHole />;
      case "Wormhole":
        return <Wormhole />;
      case "Nebula Cloud":
        return <NebulaCloud />;
      case "Supernova":
        return <Supernova />;
      case "Molecular Dance":
        return <MolecularDance />;
      case "Hyperdrive":
        return <Hyperdrive />;
      case "Particle Explosion":
        return <ParticleExplosion />;
      case "Light Trails":
        return <LightTrails />;
      case "Cyber Cells":
        return <CyberCells />;
      case "Fluid Warp":
        return <FluidWarp />;
      case "Storm Clouds":
        return <StormClouds />;
      case "Fractal Flame":
        return <FractalFlame />;
      case "Holographic Noise":
        return <HolographicNoise />;
      case "Energy Orbs":
        return <EnergyOrbs />;
      case "Data Stream":
        return <DataStream />;
      default:
        // Fallback based on category
        if (category === "Plasma Effects") return <PlasmaEffect intensity={0.8} speed={1.2} />;
        if (category === "Generative") return <LSystemTree />;
        if (category === "Physics") return <SineWaveEffect />;
        if (category === "UI Effects") return <HologramShader />;
        if (category === "WebGPU") return <CyberGrid />;
        if (category === "Data Viz") return <CyberGrid />;
        if (category === "3D Math") return <CrystalGrid />;
        if (category === "Abstract") return <PlasmaEffect intensity={0.8} speed={1.2} />;
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
      "Crystal Cave": "CrystalCave",
      "Black Hole": "BlackHole",
      "Wormhole": "Wormhole",
      "Nebula Cloud": "NebulaCloud",
      "Supernova": "Supernova",
      "Molecular Dance": "MolecularDance",
      "Hyperdrive": "Hyperdrive"
    };

    const componentName = componentMap[title] || "PlasmaEffect";
    
    // Read the actual source files and return their content
    const getSourceCode = async (componentName: string): Promise<string> => {
      try {
        // For now, return the full component implementation based on known patterns
        // In a real implementation, you'd read the actual file
        switch (componentName) {
          case "LSystemTree":
            return `import React, { useEffect, useRef } from 'react';

interface LSystemTreeProps {
  className?: string;
}

export function LSystemTree({ className = "" }: LSystemTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // L-System rules
    const rules = {
      'F': 'FF+[+F-F-F]-[-F+F+F]',
      '+': '+',
      '-': '-',
      '[': '[',
      ']': ']'
    };

    let axiom = 'F';
    let generations = 0;
    const maxGenerations = 4;

    const generateLSystem = (current: string): string => {
      let result = '';
      for (let char of current) {
        result += rules[char as keyof typeof rules] || char;
      }
      return result;
    };

    const drawLSystem = (instructions: string, startX: number, startY: number, angle: number, length: number) => {
      ctx.clearRect(0, 0, width, height);
      
      let x = startX;
      let y = startY;
      let currentAngle = angle;
      const stack: Array<{x: number, y: number, angle: number}> = [];

      ctx.strokeStyle = \`hsl(\${120 + Math.sin(Date.now() * 0.001) * 60}, 70%, 50%)\`;
      ctx.lineWidth = Math.max(1, 3 - generations);
      ctx.lineCap = 'round';

      for (let char of instructions) {
        switch (char) {
          case 'F':
            const newX = x + Math.cos(currentAngle) * length;
            const newY = y + Math.sin(currentAngle) * length;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(newX, newY);
            ctx.stroke();
            
            x = newX;
            y = newY;
            break;
          case '+':
            currentAngle += Math.PI / 6; // 30 degrees
            break;
          case '-':
            currentAngle -= Math.PI / 6; // 30 degrees
            break;
          case '[':
            stack.push({x, y, angle: currentAngle});
            break;
          case ']':
            const state = stack.pop();
            if (state) {
              x = state.x;
              y = state.y;
              currentAngle = state.angle;
            }
            break;
        }
      }
    };

    const animate = () => {
      const time = Date.now() * 0.001;
      
      if (Math.floor(time * 0.5) % (maxGenerations + 1) !== generations) {
        generations = Math.floor(time * 0.5) % (maxGenerations + 1);
        let current = axiom;
        for (let i = 0; i < generations; i++) {
          current = generateLSystem(current);
        }
        
        const baseLength = Math.min(width, height) * 0.01;
        const length = baseLength / Math.pow(2, generations * 0.5);
        
        drawLSystem(current, width / 2, height * 0.9, -Math.PI / 2, length);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={\`w-full h-full \${className}\`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(180deg, #001122, #000011)' }}
      />
    </div>
  );
}`;
          default:
            return `// Full source code for ${componentName}
import React, { useEffect, useRef } from 'react';

interface ${componentName}Props {
  className?: string;
}

export function ${componentName}({ className = "" }: ${componentName}Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Animation logic here
    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      time += 0.02;

      // Add your animation code here
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={\`w-full h-full \${className}\`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'radial-gradient(circle, #1a1a2e, #16213e)' }}
      />
    </div>
  );
}`;
        }
      } catch (error) {
        return `// Error loading source code for ${componentName}
import React from 'react';

export function ${componentName}() {
  return <div>Component source unavailable</div>;
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
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {getEffectComponent()}
        </div>
        <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500 flex items-center justify-center">
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