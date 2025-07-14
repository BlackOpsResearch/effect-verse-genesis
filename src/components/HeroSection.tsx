import { HolographicButton } from "./HolographicButton";
import { Sparkles, Zap, Wand2, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 particle-bg" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full gradient-electric opacity-20 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-32 w-48 h-48 rounded-full gradient-plasma opacity-25 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-1/3 w-56 h-56 rounded-full gradient-cyber opacity-15 animate-float" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-electric-cyan/30">
            <Sparkles className="w-4 h-4 text-electric-cyan" />
            <span className="text-sm text-electric-cyan">Ultimate Effects Playground</span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="text-electric animate-glow">Create</span>
            <br />
            <span className="gradient-electric bg-clip-text text-transparent animate-gradient-shift">Amazing</span>
            <br />
            <span className="text-foreground">Effects</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From electric plasma and L-systems to ray-traced glass and WebGPU physics - 
            the ultimate marketplace for 2D, 3D, and 4D animation effects.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              "WebGPU Physics",
              "Ray Tracing",
              "L-Systems",
              "Plasma Effects",
              "Sine Waves",
              "Holographics"
            ].map((feature) => (
              <span key={feature} className="glass px-3 py-1 rounded-full border border-electric-cyan/20 text-electric-cyan">
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <HolographicButton variant="electric" size="lg" className="animate-electric-pulse">
              <Play className="w-5 h-5 mr-2" />
              Explore Effects
            </HolographicButton>
            
            <HolographicButton variant="cyber" size="lg">
              <Wand2 className="w-5 h-5 mr-2" />
              Create Your Own
            </HolographicButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-cyan">2,500+</div>
              <div className="text-muted-foreground">Effects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-purple">850+</div>
              <div className="text-muted-foreground">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-green">50k+</div>
              <div className="text-muted-foreground">Downloads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}