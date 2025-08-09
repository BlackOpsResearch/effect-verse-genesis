import { useEffect, useRef, useState } from 'react';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Play, 
  Pause, 
  Settings, 
  Palette, 
  Zap, 
  Sparkles, 
  Bot,
  Code,
  Monitor,
  Layers,
  Wand2,
  Atom,
  Orbit,
  Waves,
  Mountain,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Star,
  Eye,
  Brain,
  CircuitBoard
} from 'lucide-react';

import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';
import { PerformancePanel } from './PerformancePanel';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { AuroraWavesLogo } from './logos/AuroraWavesLogo';
import { BinaryMatrixLogo } from './logos/BinaryMatrixLogo';
import { CrystalGrowthLogo } from './logos/CrystalGrowthLogo';
import { PlasmaEffectLogo } from './logos/PlasmaEffectLogo';
import { ElectricWebLogo } from './logos/ElectricWebLogo';
import { ParticleSwarmLogo } from './logos/ParticleSwarmLogo';
import { FractalMandelbrotLogo } from './logos/FractalMandelbrotLogo';
import { NeuralNetworkLogo } from './logos/NeuralNetworkLogo';
import { EffectLogo } from './logos/EffectLogo';
// Import all effects
import { AuroraWaves } from './AuroraWaves';
import { BinaryMatrix } from './BinaryMatrix';
import { BlackHole } from './BlackHole';
import { CellularAutomata } from './CellularAutomata';
import { CosmicDust } from './CosmicDust';
import { CrystalCave } from './CrystalCave';
import { CrystalGrid } from './CrystalGrid';
import { CrystalGrowth } from './CrystalGrowth';
import { CyberCells } from './CyberCells';
import { CyberCircuit } from './CyberCircuit';
import { CyberGrid } from './CyberGrid';
import { DNAHelix } from './DNAHelix';
import { DataStream } from './DataStream';
import { DigitalRain } from './DigitalRain';
import { ElectricWeb } from './ElectricWeb';
import { ElectromagneticField } from './ElectromagneticField';
import { EnergyOrbs } from './EnergyOrbs';
import { FiberOptics } from './FiberOptics';
import { FireworksBurst } from './FireworksBurst';
import { FlockingBirds } from './FlockingBirds';
import { FlowField } from './FlowField';
import { FluidDynamics } from './FluidDynamics';
import { FluidWarp } from './FluidWarp';
import { FractalFlame } from './FractalFlame';
import { FractalMandelbrot } from './FractalMandelbrot';
import { GalaxySpiral } from './GalaxySpiral';
import { GeometricTunnel } from './GeometricTunnel';
import { GravityWells } from './GravityWells';
import { HologramShader } from './HologramShader';
import { HolographicNoise } from './HolographicNoise';
import { Hyperdrive } from './Hyperdrive';
import { LSystemTree } from './LSystemTree';
import { LaserGrid } from './LaserGrid';
import { LightTrails } from './LightTrails';
import { LightningStorm } from './LightningStorm';
import { LiquidMetal } from './LiquidMetal';
import { MagneticField } from './MagneticField';
import { MatrixRain } from './MatrixRain';
import { MolecularDance } from './MolecularDance';
import { MorphingGeometry } from './MorphingGeometry';
import { NebulaCloud } from './NebulaCloud';
import { NeonPulse } from './NeonPulse';
import { NeuralNetworkBackground } from './NeuralNetworkBackground';
import { NeuralPulse } from './NeuralPulse';
import { OceanWaves } from './OceanWaves';
import { ParticleBackground } from './ParticleBackground';
import { ParticleExplosion } from './ParticleExplosion';
import { ParticleGravity } from './ParticleGravity';
import { ParticlePhysics } from './ParticlePhysics';
import { ParticleSwarm } from './ParticleSwarm';
import { PerlinNoise } from './PerlinNoise';
import { PlasmaEffect } from './PlasmaEffect';
import { PlasmaBall } from './PlasmaBall';
import { QuantumEntanglement } from './QuantumEntanglement';
import { QuantumField } from './QuantumField';
import { QuantumTunnel } from './QuantumTunnel';
import { QuantumWave } from './QuantumWave';
import { RippleEffect } from './RippleEffect';
import { SineWaveEffect } from './SineWaveEffect';
import { SolarFlare } from './SolarFlare';
import { SpaceDebris } from './SpaceDebris';
import { StormClouds } from './StormClouds';
import { Supernova } from './Supernova';
import { TessellationPattern } from './TessellationPattern';
import { VoronoiCells } from './VoronoiCells';
import { VortexField } from './VortexField';
import { WaveInterference } from './WaveInterference';
import { Wormhole } from './Wormhole';
import { WormholeTravel } from './WormholeTravel';

const effectLogos: Record<string, any> = {
  'Aurora Waves': AuroraWavesLogo,
  'Binary Matrix': BinaryMatrixLogo,
  'Crystal Growth': CrystalGrowthLogo,
  'Plasma Effect': PlasmaEffectLogo,
  'Electric Web': ElectricWebLogo,
  'Particle Swarm': ParticleSwarmLogo,
  'Fractal Mandelbrot': FractalMandelbrotLogo,
  'Neural Network': NeuralNetworkLogo,
};

const effectCategories = {
  'Particle Systems': {
    icon: Sparkles,
    effects: [
      { name: 'Particle Background', component: ParticleBackground, color: 'blue' },
      { name: 'Particle Explosion', component: ParticleExplosion, color: 'red' },
      { name: 'Particle Gravity', component: ParticleGravity, color: 'purple' },
      { name: 'Particle Physics', component: ParticlePhysics, color: 'green' },
      { name: 'Particle Swarm', component: ParticleSwarm, color: 'yellow' },
      { name: 'Cosmic Dust', component: CosmicDust, color: 'indigo' },
      { name: 'Space Debris', component: SpaceDebris, color: 'gray' },
      { name: 'Energy Orbs', component: EnergyOrbs, color: 'cyan' },
      { name: 'Flocking Birds', component: FlockingBirds, color: 'emerald' },
    ]
  },
  'Quantum Effects': {
    icon: Atom,
    effects: [
      { name: 'Quantum Field', component: QuantumField, color: 'violet' },
      { name: 'Quantum Tunnel', component: QuantumTunnel, color: 'purple' },
      { name: 'Quantum Wave', component: QuantumWave, color: 'blue' },
      { name: 'Quantum Entanglement', component: QuantumEntanglement, color: 'pink' },
      { name: 'Hologram Shader', component: HologramShader, color: 'cyan' },
      { name: 'Holographic Noise', component: HolographicNoise, color: 'teal' },
    ]
  },
  'Space & Cosmic': {
    icon: Orbit,
    effects: [
      { name: 'Aurora Waves', component: AuroraWaves, color: 'green' },
      { name: 'Galaxy Spiral', component: GalaxySpiral, color: 'purple' },
      { name: 'Black Hole', component: BlackHole, color: 'gray' },
      { name: 'Nebula Cloud', component: NebulaCloud, color: 'blue' },
      { name: 'Supernova', component: Supernova, color: 'orange' },
      { name: 'Solar Flare', component: SolarFlare, color: 'yellow' },
      { name: 'Wormhole', component: Wormhole, color: 'violet' },
      { name: 'Wormhole Travel', component: WormholeTravel, color: 'indigo' },
      { name: 'Hyperdrive', component: Hyperdrive, color: 'blue' },
    ]
  },
  'Plasma & Energy': {
    icon: Zap,
    effects: [
      { name: 'Plasma Effect', component: PlasmaEffect, color: 'purple' },
      { name: 'Plasma Ball', component: PlasmaBall, color: 'violet' },
      { name: 'Electric Web', component: ElectricWeb, color: 'blue' },
      { name: 'Electromagnetic Field', component: ElectromagneticField, color: 'cyan' },
      { name: 'Lightning Storm', component: LightningStorm, color: 'yellow' },
      { name: 'Fireworks Burst', component: FireworksBurst, color: 'red' },
      { name: 'Laser Grid', component: LaserGrid, color: 'green' },
      { name: 'Light Trails', component: LightTrails, color: 'orange' },
      { name: 'Neon Pulse', component: NeonPulse, color: 'pink' },
    ]
  },
  'Fractals & Math': {
    icon: Mountain,
    effects: [
      { name: 'Fractal Mandelbrot', component: FractalMandelbrot, color: 'purple' },
      { name: 'Fractal Flame', component: FractalFlame, color: 'red' },
      { name: 'Perlin Noise', component: PerlinNoise, color: 'green' },
      { name: 'Tessellation Pattern', component: TessellationPattern, color: 'blue' },
      { name: 'Voronoi Cells', component: VoronoiCells, color: 'yellow' },
      { name: 'L-System Tree', component: LSystemTree, color: 'emerald' },
      { name: 'Geometric Tunnel', component: GeometricTunnel, color: 'indigo' },
      { name: 'Morphing Geometry', component: MorphingGeometry, color: 'violet' },
    ]
  },
  'Fluid Dynamics': {
    icon: Waves,
    effects: [
      { name: 'Fluid Dynamics', component: FluidDynamics, color: 'blue' },
      { name: 'Fluid Warp', component: FluidWarp, color: 'cyan' },
      { name: 'Ocean Waves', component: OceanWaves, color: 'teal' },
      { name: 'Ripple Effect', component: RippleEffect, color: 'blue' },
      { name: 'Wave Interference', component: WaveInterference, color: 'green' },
      { name: 'Sine Wave Effect', component: SineWaveEffect, color: 'purple' },
      { name: 'Flow Field', component: FlowField, color: 'orange' },
      { name: 'Vortex Field', component: VortexField, color: 'red' },
      { name: 'Liquid Metal', component: LiquidMetal, color: 'gray' },
      { name: 'Storm Clouds', component: StormClouds, color: 'slate' },
    ]
  },
  'Crystal & Materials': {
    icon: Snowflake,
    effects: [
      { name: 'Crystal Grid', component: CrystalGrid, color: 'blue' },
      { name: 'Crystal Growth', component: CrystalGrowth, color: 'cyan' },
      { name: 'Crystal Cave', component: CrystalCave, color: 'purple' },
      { name: 'Gravity Wells', component: GravityWells, color: 'indigo' },
      { name: 'Magnetic Field', component: MagneticField, color: 'red' },
    ]
  },
  'Digital & Cyber': {
    icon: CircuitBoard,
    effects: [
      { name: 'Binary Matrix', component: BinaryMatrix, color: 'green' },
      { name: 'Matrix Rain', component: MatrixRain, color: 'lime' },
      { name: 'Digital Rain', component: DigitalRain, color: 'emerald' },
      { name: 'Cyber Grid', component: CyberGrid, color: 'cyan' },
      { name: 'Cyber Circuit', component: CyberCircuit, color: 'blue' },
      { name: 'Cyber Cells', component: CyberCells, color: 'purple' },
      { name: 'Data Stream', component: DataStream, color: 'orange' },
      { name: 'Fiber Optics', component: FiberOptics, color: 'yellow' },
    ]
  },
  'Neural & Bio': {
    icon: Brain,
    effects: [
      { name: 'Neural Network', component: NeuralNetworkBackground, color: 'purple' },
      { name: 'Neural Pulse', component: NeuralPulse, color: 'pink' },
      { name: 'DNA Helix', component: DNAHelix, color: 'green' },
      { name: 'Molecular Dance', component: MolecularDance, color: 'blue' },
      { name: 'Cellular Automata', component: CellularAutomata, color: 'yellow' },
    ]
  }
};

export function EffectsStudio() {
const [activeEffect, setActiveEffect] = useState('Particle Background');
  const [isPlaying, setIsPlaying] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [hoveredEffect, setHoveredEffect] = useState<string | null>(null);

  const ActiveEffectComponent = () => {
    for (const category of Object.values(effectCategories)) {
      const effect = category.effects.find(e => e.name === activeEffect);
      if (effect) {
        const Component = effect.component;
        return <Component />;
      }
    }
    return <ParticleBackground />;
  };

  const [perfOpen, setPerfOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const metrics = usePerformanceMetrics({ isActive: isPlaying });

  useEffect(() => {
    const update = () => {
      const el = canvasRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setCanvasSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 h-12 bg-background/95 backdrop-blur-sm border-b border-border z-50 flex items-center px-4">
          <SidebarTrigger />
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-lg font-bold text-primary">Lucid Effects Studio</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isPlaying ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Effect Settings</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Settings for {activeEffect} would go here
                  </p>
                </div>
              </SheetContent>
            </Sheet>
            <Sheet open={perfOpen} onOpenChange={setPerfOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Monitor className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[28rem]">
                <SheetHeader>
                  <SheetTitle>Performance Panel</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <PerformancePanel metrics={metrics} />
                </div>
              </SheetContent>
            </Sheet>
            <Sheet open={chatOpen} onOpenChange={setChatOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Bot className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-96">
                <SheetHeader>
                  <SheetTitle>AI Assistant</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    AI chat interface would go here
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Effects Sidebar */}
        <Sidebar collapsible="icon" className="pt-12">
          <SidebarContent>
            <Tabs defaultValue="effects" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="effects">Effects</TabsTrigger>
                <TabsTrigger value="presets">Presets</TabsTrigger>
              </TabsList>
              
              <TabsContent value="effects" className="space-y-4">
                {Object.entries(effectCategories).map(([categoryName, category]) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={categoryName} className="glass bg-background/30 backdrop-blur-md border border-border/50"> 
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <IconComponent className="w-4 h-4" />
                          {categoryName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2">
                          {category.effects.map((effect) => {
                            const Logo = (effectLogos as any)[effect.name] as React.ComponentType<any> | undefined;
                            const isActive = activeEffect === effect.name;
                            const shouldAnimate = isActive || hoveredEffect === effect.name;
                            return (
                              <Tooltip key={effect.name}>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => setActiveEffect(effect.name)}
                                    onMouseEnter={() => setHoveredEffect(effect.name)}
                                    onMouseLeave={() => setHoveredEffect(null)}
                                    aria-label={effect.name}
                                    className={`aspect-square rounded-md border flex items-center justify-center transition-colors ${isActive ? 'ring-2 ring-primary' : ''} hover:bg-muted/40 border-border`}
                                  >
                                    {Logo ? (
                                      <Logo size={40} className="opacity-90" animate={shouldAnimate} />
                                    ) : (
                                      <EffectLogo name={effect.name} size={40} className="opacity-90" animate={shouldAnimate} />
                                    )}
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">{effect.name}</TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="presets">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Saved Presets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">No presets saved yet</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </SidebarContent>
        </Sidebar>

        {/* Main Canvas Area */}
        <main className="flex-1 pt-12 pb-12">
          <div className="w-full h-full relative">
            <div ref={canvasRef} className="absolute inset-4 rounded-lg overflow-hidden border border-border bg-black">
              {isPlaying && <ActiveEffectComponent />}
              {!isPlaying && (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Pause className="w-12 h-12 mx-auto mb-2" />
                    <p>Effect Paused</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
              <p className="text-sm font-medium">{activeEffect}</p>
            </div>
          </div>
        </main>

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-background/95 backdrop-blur-sm border-t border-border z-40 flex items-center px-4">
          <div className="flex items-center gap-4">
            <Badge variant="outline">FPS: {Math.round(metrics.fps)}</Badge>
            <Badge variant="outline">Frame: {metrics.frameTime.toFixed(1)}ms</Badge>
            <Badge variant="outline">Canvas: {canvasSize.width}x{canvasSize.height}</Badge>
            <Badge variant="outline">Heap: {metrics.memory ? `${metrics.memory.usedMB}/${metrics.memory.totalMB} MB` : '—'}</Badge>
          </div>
          <div className="flex-1 flex justify-center">
            <Button variant="ghost" size="sm">
              <Code className="w-4 h-4 mr-2" />
              View Code
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Monitor className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Layers className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}