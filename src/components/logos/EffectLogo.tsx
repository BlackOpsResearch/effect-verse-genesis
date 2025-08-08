import React from 'react';
import { AuroraWavesLogo } from './AuroraWavesLogo';
import { BinaryMatrixLogo } from './BinaryMatrixLogo';
import { CrystalGrowthLogo } from './CrystalGrowthLogo';
import { PlasmaEffectLogo } from './PlasmaEffectLogo';
import { ElectricWebLogo } from './ElectricWebLogo';
import { ParticleSwarmLogo } from './ParticleSwarmLogo';
import { FractalMandelbrotLogo } from './FractalMandelbrotLogo';
import { NeuralNetworkLogo } from './NeuralNetworkLogo';

function hashHue(name: string) {
  const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return sum % 360;
}

function pickBaseLogo(name: string) {
  const n = name.toLowerCase();
  if (/(matrix|digital rain)/.test(n)) return BinaryMatrixLogo;
  if (/(particle|orbs|flock|debris|fiber)/.test(n)) return ParticleSwarmLogo;
  if (/(quantum|hologram|entangle|wave(?! interference))/i.test(name)) return PlasmaEffectLogo;
  if (/(aurora|ocean|wave|ripple|flow|vortex)/.test(n)) return AuroraWavesLogo;
  if (/(plasma|neon|laser|light trail|flare|supernova|solar)/.test(n)) return PlasmaEffectLogo;
  if (/(lightning|electric|electromagnetic|magnetic|circuit|cyber)/.test(n)) return ElectricWebLogo;
  if (/(fractal|perlin|tessell|voronoi|l-system|geometry|tunnel)/.test(n)) return FractalMandelbrotLogo;
  if (/(crystal|material|metal)/.test(n)) return CrystalGrowthLogo;
  if (/(neural|dna|molecular|cellular|brain)/.test(n)) return NeuralNetworkLogo;
  if (/(black hole|wormhole|gravity|galaxy|nebula|hyperdrive|space)/.test(n)) return PlasmaEffectLogo;
  return AuroraWavesLogo;
}

export function EffectLogo({ name, size = 40, className = '' }: { name: string; size?: number; className?: string }) {
  const Base = pickBaseLogo(name);
  const hue = hashHue(name);
  return (
    <div
      className={className}
      style={{ filter: `hue-rotate(${hue}deg) saturate(1.1) brightness(1.05)` }}
    >
      <Base size={size} />
    </div>
  );
}
