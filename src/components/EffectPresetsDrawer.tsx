import React from 'react';
import { Layers, Zap, Sparkles, Waves, Brain, Rocket } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface EffectPreset {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  effects: string[];
  settings: Record<string, any>;
  transition: 'fade' | 'dissolve' | 'morph';
}

const PRESETS: EffectPreset[] = [
  {
    id: 'cosmic-journey',
    name: 'Cosmic Journey',
    description: 'Blend of galaxy spiral, nebula clouds, and cosmic dust',
    icon: <Sparkles className="w-5 h-5" />,
    effects: ['Galaxy Spiral', 'Nebula Cloud', 'Cosmic Dust'],
    settings: {
      speed: 0.8,
      intensity: 1.5,
      colorShift: 120
    },
    transition: 'fade'
  },
  {
    id: 'neural-storm',
    name: 'Neural Storm',
    description: 'Electric web merged with neural network pulses',
    icon: <Brain className="w-5 h-5" />,
    effects: ['Electric Web', 'Neural Pulse', 'Lightning Storm'],
    settings: {
      speed: 1.2,
      density: 1.8,
      glitch: true
    },
    transition: 'morph'
  },
  {
    id: 'cyber-matrix',
    name: 'Cyber Matrix',
    description: 'Digital rain, cyber grid, and binary matrix fusion',
    icon: <Zap className="w-5 h-5" />,
    effects: ['Digital Rain', 'Cyber Grid', 'Binary Matrix'],
    settings: {
      speed: 1.5,
      density: 2,
      glitch: true
    },
    transition: 'dissolve'
  },
  {
    id: 'quantum-flow',
    name: 'Quantum Flow',
    description: 'Quantum waves with particle physics and field effects',
    icon: <Waves className="w-5 h-5" />,
    effects: ['Quantum Wave', 'Particle Physics', 'Quantum Field'],
    settings: {
      speed: 1,
      particleCount: 500,
      gravity: 0.2
    },
    transition: 'fade'
  },
  {
    id: 'crystal-dream',
    name: 'Crystal Dream',
    description: 'Growing crystals with aurora waves and shimmer',
    icon: <Layers className="w-5 h-5" />,
    effects: ['Crystal Growth', 'Aurora Waves', 'Crystal Cave'],
    settings: {
      growthRate: 1.2,
      shimmer: true,
      intensity: 1.5
    },
    transition: 'morph'
  },
  {
    id: 'hyperdrive',
    name: 'Hyperdrive',
    description: 'Wormhole travel with hyperspace effects',
    icon: <Rocket className="w-5 h-5" />,
    effects: ['Wormhole Travel', 'Hyperdrive', 'Light Trails'],
    settings: {
      speed: 2,
      intensity: 2,
      trailLength: 1.5
    },
    transition: 'dissolve'
  }
];

interface EffectPresetsDrawerProps {
  onApplyPreset: (preset: EffectPreset) => void;
}

export function EffectPresetsDrawer({ onApplyPreset }: EffectPresetsDrawerProps) {
  const { toast } = useToast();

  const handleApplyPreset = (preset: EffectPreset) => {
    onApplyPreset(preset);
    toast({
      title: `${preset.name} applied!`,
      description: `Combining: ${preset.effects.join(', ')}`,
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="glass glass-hover">
          <Layers className="w-4 h-4 mr-2" />
          Presets
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle className="text-electric">Effect Presets</DrawerTitle>
        </DrawerHeader>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESETS.map((preset) => (
              <Card
                key={preset.id}
                className="p-4 glass cursor-pointer hover:border-primary/50 transition-all group"
                onClick={() => handleApplyPreset(preset)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {preset.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">{preset.name}</h3>
                    <p className="text-sm text-muted-foreground">{preset.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {preset.effects.map((effect) => (
                        <span
                          key={effect}
                          className="text-xs px-2 py-1 rounded-full bg-muted"
                        >
                          {effect}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        Transition: {preset.transition}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-auto py-1 px-2"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
