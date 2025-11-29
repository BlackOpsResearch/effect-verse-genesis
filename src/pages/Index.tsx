import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { EffectsShowcase } from "@/components/EffectsShowcase";
import { NeuralNetworkBackground } from "@/components/NeuralNetworkBackground";
import { SpeedProvider } from "@/contexts/SpeedContext";

const Index = () => {
  return (
    <SpeedProvider>
      <div className="min-h-screen relative">
        <NeuralNetworkBackground />
        <Navigation />
        <main>
          <HeroSection />
          <EffectsShowcase />
        </main>
      </div>
    </SpeedProvider>
  );
};

export default Index;
