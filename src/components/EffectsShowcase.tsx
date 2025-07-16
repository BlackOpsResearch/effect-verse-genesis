import { useState } from "react";
import { EffectCard } from "./EffectCard";
import { ElectricButton } from "./ElectricButton";
import { Grid3X3, Filter, Sparkles } from "lucide-react";

const allEffectsData = [
  {
    title: "Electric Plasma Storm",
    description: "High-voltage plasma effects with realistic lightning and electrical discharge patterns.",
    category: "Plasma Effects"
  },
  {
    title: "L-System Fractals",
    description: "Procedural organic growth patterns using Lindenmayer systems for natural structures.",
    category: "Generative"
  },
  {
    title: "Sine Wave Ocean",
    description: "Interactive water simulation with touchable waves and realistic fluid dynamics.",
    category: "Physics"
  },
  {
    title: "Holographic UI",
    description: "Futuristic interface elements with ray-traced glass and holographic materials.",
    category: "UI Effects"
  },
  {
    title: "Particle Galaxy",
    description: "WebGPU-powered particle systems creating stunning cosmic environments.",
    category: "WebGPU"
  },
  {
    title: "Neural Networks",
    description: "Animated neural network visualizations with flowing data connections.",
    category: "Data Viz"
  },
  {
    title: "Morphing Geometries",
    description: "Smooth 3D shape transitions with mathematical precision and organic flow.",
    category: "3D Math"
  },
  {
    title: "Quantum Fields",
    description: "Abstract quantum mechanics visualization with wave-particle duality effects.",
    category: "Abstract"
  },
  {
    title: "Crystal Growth",
    description: "Procedural crystal formation with realistic light refraction and caustics.",
    category: "Simulation"
  },
  {
    title: "Galaxy Spiral",
    description: "Stunning spiral galaxy formation with realistic stellar evolution and cosmic dust.",
    category: "WebGPU"
  },
  {
    title: "Electric Web",
    description: "Dynamic electrical networks with real-time lightning connections and plasma nodes.",
    category: "Plasma Effects"
  },
  {
    title: "Fluid Dynamics",
    description: "Interactive fluid simulation with mouse control and realistic viscosity physics.",
    category: "Physics"
  },
  {
    title: "DNA Helix",
    description: "Animated double helix with base pair sequences and molecular precision.",
    category: "Simulation"
  },
  {
    title: "Fractal Mandelbrot",
    description: "Infinite zoom fractal explorer with dynamic color mapping and mathematical beauty.",
    category: "Generative"
  },
  {
    title: "Particle Gravity",
    description: "N-body gravitational simulation with orbital mechanics and stellar formation.",
    category: "Physics"
  },
  {
    title: "Matrix Rain",
    description: "Classic Matrix digital rain effect with cascading characters and authentic green glow.",
    category: "UI Effects"
  },
  {
    title: "Neon Pulse",
    description: "Pulsating neon rings with electric glow effects and radial wave propagation.",
    category: "Plasma Effects"
  },
  {
    title: "Voronoi Diagrams",
    description: "Dynamic Voronoi cell tessellation with animated seed points and color transitions.",
    category: "Generative"
  },
  {
    title: "Wave Interference",
    description: "Multiple wave source interference patterns creating complex ripple interactions.",
    category: "Physics"
  },
  {
    title: "Geometric Tunnel",
    description: "Infinite geometric tunnel with polygon morphing and depth-based scaling effects.",
    category: "3D Math"
  },
  {
    title: "Game of Life",
    description: "Conway's Game of Life cellular automaton with colorful cell evolution and survival rules.",
    category: "Simulation"
  },
  {
    title: "Volumetric Clouds",
    description: "Ray-marched volumetric cloud rendering with realistic atmospheric scattering.",
    category: "3D Math"
  },
  {
    title: "Magnetic Fields",
    description: "Electromagnetic field visualization with dynamic particle interactions.",
    category: "Abstract"
  },
  {
    title: "Procedural Fire",
    description: "Realistic flame simulation with temperature gradients and particle combustion.",
    category: "Simulation"
  },
  {
    title: "Holographic Data",
    description: "Futuristic data visualization with floating information panels and AR elements.",
    category: "UI Effects"
  },
  {
    title: "Cyber Matrix",
    description: "Matrix-style digital rain with glitch effects and cyberpunk aesthetics.",
    category: "Data Viz"
  },
  {
    title: "Quantum Tunneling",
    description: "Geometric tunnel with quantum-inspired visual effects and particle transportation.",
    category: "Abstract"
  },
  {
    title: "Plasma Tunnel",
    description: "High-energy plasma corridor with electromagnetic containment fields.",
    category: "Plasma Effects"
  },
  {
    title: "Fractal Trees",
    description: "Self-similar branching structures with infinite detail and organic growth patterns.",
    category: "Generative"
  },
  {
    title: "Sonic Waves",
    description: "Audio-reactive wave propagation with frequency analysis and resonance effects.",
    category: "Physics"
  },
  {
    title: "Fireworks Burst",
    description: "Spectacular particle fireworks with physics-based explosions and gravity effects.",
    category: "Particles"
  },
  {
    title: "Lightning Storm",
    description: "Dynamic lightning bolts with realistic branching patterns and electrical discharge.",
    category: "Weather"
  },
  {
    title: "Ocean Waves",
    description: "Realistic fluid wave simulation with foam effects and multi-layered wave interference.",
    category: "Physics"
  },
  {
    title: "Plasma Ball",
    description: "Electric arcs emanating from energy core with tesla coil-inspired lightning effects.",
    category: "Plasma Effects"
  },
  {
    title: "Ripple Effect",
    description: "Expanding water ripples with wave interference and dynamic amplitude modulation.",
    category: "Physics"
  },
  {
    title: "Binary Matrix",
    description: "Falling binary code rain effect with authentic terminal glow and character trails.",
    category: "Data Viz"
  },
  {
    title: "Particle Swarm",
    description: "Connected particles with swarm intelligence behavior and dynamic network formation.",
    category: "Particles"
  }
];

const categories = [
  "All Effects",
  "Plasma Effects", 
  "Generative",
  "Physics",
  "UI Effects",
  "WebGPU",
  "Data Viz",
  "3D Math",
  "Abstract",
  "Simulation",
  "Particles",
  "Weather"
];

export function EffectsShowcase() {
  const [activeCategory, setActiveCategory] = useState("All Effects");
  const [visibleCount, setVisibleCount] = useState(9);
  
  const filteredEffects = activeCategory === "All Effects" 
    ? allEffectsData 
    : allEffectsData.filter(effect => effect.category === activeCategory);
  
  const visibleEffects = filteredEffects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEffects.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredEffects.length));
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(9);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-electric-cyan/30 mb-6">
            <Sparkles className="w-4 h-4 text-electric-cyan" />
            <span className="text-sm text-electric-cyan">Featured Collection</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-electric">Premium</span>{" "}
            <span className="gradient-plasma bg-clip-text text-transparent">Effects</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handcrafted animations from industry professionals. Ready to use in your projects.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <ElectricButton 
                key={category} 
                variant={category === activeCategory ? "electric" : "neural"}
                size="sm"
                className="text-sm"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </ElectricButton>
            ))}
          </div>
          
          <div className="flex gap-3 lg:ml-auto">
            <ElectricButton variant="cyber" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </ElectricButton>
            <ElectricButton variant="plasma" size="sm">
              <Grid3X3 className="w-4 h-4 mr-2" />
              Grid View
            </ElectricButton>
          </div>
        </div>

        {/* Effects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {visibleEffects.map((effect, index) => (
            <EffectCard
              key={`${effect.title}-${index}`}
              title={effect.title}
              description={effect.description}
              category={effect.category}
              className="animate-float"
              style={{
                animationDelay: `${index * 0.1}s`
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center">
            <ElectricButton variant="electric" size="lg" onClick={handleLoadMore}>
              Load More Effects ({filteredEffects.length - visibleCount} remaining)
            </ElectricButton>
          </div>
        )}
        
        {!hasMore && filteredEffects.length > 9 && (
          <div className="text-center">
            <p className="text-muted-foreground">
              Showing all {filteredEffects.length} effects in {activeCategory}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}