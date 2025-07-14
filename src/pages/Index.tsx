import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { EffectsShowcase } from "@/components/EffectsShowcase";
import { NeuralNetworkBackground } from "@/components/NeuralNetworkBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <NeuralNetworkBackground />
      <Navigation />
      <main>
        <HeroSection />
        <EffectsShowcase />
      </main>
    </div>
  );
};

export default Index;
