import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Import all the animated logos
import { LucidLogo } from '@/components/LucidLogo';
import { AuroraWavesLogo } from '@/components/logos/AuroraWavesLogo';
import { BinaryMatrixLogo } from '@/components/logos/BinaryMatrixLogo';
import { CrystalGrowthLogo } from '@/components/logos/CrystalGrowthLogo';
import { PlasmaEffectLogo } from '@/components/logos/PlasmaEffectLogo';
import { ElectricWebLogo } from '@/components/logos/ElectricWebLogo';
import { ParticleSwarmLogo } from '@/components/logos/ParticleSwarmLogo';
import { FractalMandelbrotLogo } from '@/components/logos/FractalMandelbrotLogo';
import { NeuralNetworkLogo } from '@/components/logos/NeuralNetworkLogo';

const logoComponents = [
  {
    name: 'Lucid Logo',
    component: LucidLogo,
    description: 'Main brand logo with 3D crystal effect',
    category: 'Brand'
  },
  {
    name: 'Aurora Waves',
    component: AuroraWavesLogo,
    description: 'Flowing aurora waves with color cycling',
    category: 'Nature'
  },
  {
    name: 'Binary Matrix',
    component: BinaryMatrixLogo,
    description: 'Animated binary code matrix',
    category: 'Digital'
  },
  {
    name: 'Crystal Growth',
    component: CrystalGrowthLogo,
    description: 'Growing crystal formations',
    category: 'Geometric'
  },
  {
    name: 'Plasma Effect',
    component: PlasmaEffectLogo,
    description: 'Orbiting plasma energy balls',
    category: 'Energy'
  },
  {
    name: 'Electric Web',
    component: ElectricWebLogo,
    description: 'Lightning web with electric pulses',
    category: 'Energy'
  },
  {
    name: 'Particle Swarm',
    component: ParticleSwarmLogo,
    description: 'Swarming particles with physics',
    category: 'Physics'
  },
  {
    name: 'Fractal Mandelbrot',
    component: FractalMandelbrotLogo,
    description: 'Rotating fractal patterns',
    category: 'Mathematical'
  },
  {
    name: 'Neural Network',
    component: NeuralNetworkLogo,
    description: 'AI network with flowing data',
    category: 'AI'
  },
];

const categories = ['All', 'Brand', 'Nature', 'Digital', 'Geometric', 'Energy', 'Physics', 'Mathematical', 'AI'];

export function LogosShowcase() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredLogos = selectedCategory === 'All' 
    ? logoComponents 
    : logoComponents.filter(logo => logo.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-electric-blue to-electric-purple bg-clip-text text-transparent">
          Animated Logos
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of stunning animated logos and emblems, each crafted with unique visual effects
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded-full transition-all duration-300
              ${selectedCategory === category
                ? 'bg-electric-cyan text-background'
                : 'glass glass-hover text-foreground'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Logos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLogos.map((logo, index) => {
          const LogoComponent = logo.component;
          
          return (
            <Card key={index} className="glass glass-hover group cursor-pointer">
               <CardHeader className="text-center">
                <div className="flex justify-center mb-4 w-20 h-20 mx-auto">
                  <LogoComponent />
                </div>
                <CardTitle className="text-electric">{logo.name}</CardTitle>
                <CardDescription>{logo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {logo.category}
                  </span>
                  <button className="text-xs text-electric-cyan hover:text-electric-purple transition-colors">
                    View Code →
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Usage Examples */}
      <div className="mt-16 space-y-8">
        <h3 className="text-2xl font-bold text-center text-electric">Usage Examples</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Different Sizes</CardTitle>
              <CardDescription>Logos scale beautifully at any size</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center space-x-4">
              <div className="scale-100">
                <LucidLogo />
              </div>
              <div className="scale-75">
                <AuroraWavesLogo />
              </div>
              <div className="scale-50">
                <CrystalGrowthLogo />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Integration Examples</CardTitle>
              <CardDescription>Perfect for headers, loading screens, and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                <div className="scale-50">
                  <BinaryMatrixLogo />
                </div>
                <span className="text-sm">Navigation Logo</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                <div className="scale-40">
                  <PlasmaEffectLogo />
                </div>
                <span className="text-sm">Button Icon</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                <div className="scale-60">
                  <ElectricWebLogo />
                </div>
                <span className="text-sm">Loading Spinner</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}