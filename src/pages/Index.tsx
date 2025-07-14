import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { EffectsShowcase } from "@/components/EffectsShowcase";
import { ParticleBackground } from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navigation />
      <main>
        <HeroSection />
        <EffectsShowcase />
      </main>
    </div>
  );
};

export default Index;
