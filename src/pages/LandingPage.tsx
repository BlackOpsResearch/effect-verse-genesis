import { EffectsStudio } from '@/components/EffectsStudio';
import { SpeedProvider } from '@/contexts/SpeedContext';

export default function LandingPage() {
  return (
    <SpeedProvider>
      <EffectsStudio />
    </SpeedProvider>
  );
}