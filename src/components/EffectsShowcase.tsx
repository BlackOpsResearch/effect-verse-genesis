import { EffectCard } from "./EffectCard";
import { ElectricButton } from "./ElectricButton";
import { Grid3X3, Filter, Sparkles } from "lucide-react";

const effectsData = [
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
  "Simulation"
];

export function EffectsShowcase() {
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
                variant={category === "All Effects" ? "electric" : "neural"}
                size="sm"
                className="text-sm"
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
          {effectsData.map((effect, index) => (
            <EffectCard
              key={index}
              title={effect.title}
              description={effect.description}
              category={effect.category}
              className={index % 3 === 0 ? "animate-float" : index % 3 === 1 ? "animate-float" : "animate-float"}
              style={{
                animationDelay: `${index * 0.2}s`
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <ElectricButton variant="electric" size="lg">
            Load More Effects
          </ElectricButton>
        </div>
      </div>
    </section>
  );
}