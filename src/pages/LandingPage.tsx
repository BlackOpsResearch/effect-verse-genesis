import React, { useState } from 'react';
import { LucidLogo } from '@/components/LucidLogo';
import { BackgroundSelector } from '@/components/BackgroundSelector';
import { SettingsDrawer } from '@/components/SettingsDrawer';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Sparkles } from 'lucide-react';

// Import effect components
import { AuroraWaves } from '@/components/AuroraWaves';
import { BinaryMatrix } from '@/components/BinaryMatrix';
import { BlackHole } from '@/components/BlackHole';
import { CellularAutomata } from '@/components/CellularAutomata';
import { CosmicDust } from '@/components/CosmicDust';
import { CrystalCave } from '@/components/CrystalCave';
import { CrystalGrid } from '@/components/CrystalGrid';
import { CrystalGrowth } from '@/components/CrystalGrowth';
import { CyberCells } from '@/components/CyberCells';
import { CyberCircuit } from '@/components/CyberCircuit';
import { DNAHelix } from '@/components/DNAHelix';
import { DataStream } from '@/components/DataStream';
import { DigitalRain } from '@/components/DigitalRain';
import { ElectricWeb } from '@/components/ElectricWeb';
import { ElectromagneticField } from '@/components/ElectromagneticField';
import { EnergyOrbs } from '@/components/EnergyOrbs';
import { FiberOptics } from '@/components/FiberOptics';
import { FireworksBurst } from '@/components/FireworksBurst';
import { FlockingBirds } from '@/components/FlockingBirds';
import { FlowField } from '@/components/FlowField';
import { FluidDynamics } from '@/components/FluidDynamics';
import { FluidWarp } from '@/components/FluidWarp';
import { FractalFlame } from '@/components/FractalFlame';
import { FractalMandelbrot } from '@/components/FractalMandelbrot';
import { GalaxySpiral } from '@/components/GalaxySpiral';
import { GeometricTunnel } from '@/components/GeometricTunnel';
import { GravityWells } from '@/components/GravityWells';
import { HologramShader } from '@/components/HologramShader';
import { HolographicNoise } from '@/components/HolographicNoise';
import { Hyperdrive } from '@/components/Hyperdrive';

// Background effect mapping
const backgroundComponents: Record<string, React.ComponentType> = {
  'Aurora Waves': AuroraWaves,
  'Binary Matrix': BinaryMatrix,
  'Black Hole': BlackHole,
  'Cellular Automata': CellularAutomata,
  'Cosmic Dust': CosmicDust,
  'Crystal Cave': CrystalCave,
  'Crystal Grid': CrystalGrid,
  'Crystal Growth': CrystalGrowth,
  'Cyber Cells': CyberCells,
  'Cyber Circuit': CyberCircuit,
  'DNA Helix': DNAHelix,
  'Data Stream': DataStream,
  'Digital Rain': DigitalRain,
  'Electric Web': ElectricWeb,
  'Electromagnetic Field': ElectromagneticField,
  'Energy Orbs': EnergyOrbs,
  'Fiber Optics': FiberOptics,
  'Fireworks Burst': FireworksBurst,
  'Flocking Birds': FlockingBirds,
  'Flow Field': FlowField,
  'Fluid Dynamics': FluidDynamics,
  'Fluid Warp': FluidWarp,
  'Fractal Flame': FractalFlame,
  'Fractal Mandelbrot': FractalMandelbrot,
  'Galaxy Spiral': GalaxySpiral,
  'Geometric Tunnel': GeometricTunnel,
  'Gravity Wells': GravityWells,
  'Hologram Shader': HologramShader,
  'Holographic Noise': HolographicNoise,
  'Hyperdrive': Hyperdrive,
};

export default function LandingPage() {
  const [currentBackground, setCurrentBackground] = useState('Holographic Noise');
  const [settings, setSettings] = useState<Record<string, any>>({
    globalSpeed: 1,
    paused: false,
  });

  const handleSettingsChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleResetSettings = () => {
    setSettings({
      globalSpeed: 1,
      paused: false,
    });
  };

  const BackgroundComponent = backgroundComponents[currentBackground];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {BackgroundComponent && <BackgroundComponent />}
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10" />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="flex items-center justify-between">
            <LucidLogo />
            
            <div className="flex items-center space-x-4">
              <BackgroundSelector 
                currentBackground={currentBackground}
                onBackgroundChange={setCurrentBackground}
              />
              <SettingsDrawer
                currentBackground={currentBackground}
                settings={settings}
                onSettingsChange={handleSettingsChange}
                onResetSettings={handleResetSettings}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            {/* Style Label */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-electric-cyan/30 mb-8">
              <Sparkles className="w-4 h-4 text-electric-cyan" />
              <span className="text-sm text-electric-cyan">Current Style: {currentBackground}</span>
            </div>

            {/* Hero Text */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-electric-cyan to-electric-purple bg-clip-text text-transparent">
              Experience
              <br />
              <span className="text-electric">Lucid</span>
              <br />
              Dreams
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Immerse yourself in mind-bending visual effects. Choose your reality, 
              customize every detail, and lose yourself in the infinite.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="glass glass-hover px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Enter the Experience
              </Button>
              
              <Button variant="outline" size="lg" className="glass glass-hover px-8 py-4 text-lg">
                <ArrowRight className="w-5 h-5 mr-2" />
                Explore Effects
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-electric-cyan mb-2">50+</div>
                <div className="text-white/60 text-sm">Visual Effects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-electric-purple mb-2">∞</div>
                <div className="text-white/60 text-sm">Possibilities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-electric-green mb-2">Real-time</div>
                <div className="text-white/60 text-sm">Rendering</div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-white/40 text-sm">
            Powered by WebGL, Three.js, and infinite imagination
          </p>
        </footer>
      </div>
    </div>
  );
}