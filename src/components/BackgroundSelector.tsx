import React from 'react';
import { 
  Waves, Sparkles, Zap, Grid, Droplets, Eye, Diamond, 
  Flame, CloudRain, Orbit, Moon, Star, Sun, Triangle,
  Hexagon, Layers, Wind, Atom, Cpu, Binary, Network
} from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const backgroundEffects = [
  { name: 'Aurora Waves', icon: Waves, color: 'text-blue-400', gradient: 'from-blue-400 to-purple-500' },
  { name: 'Binary Matrix', icon: Binary, color: 'text-green-400', gradient: 'from-green-400 to-blue-500' },
  { name: 'Black Hole', icon: Eye, color: 'text-purple-400', gradient: 'from-purple-400 to-black' },
  { name: 'Cellular Automata', icon: Grid, color: 'text-orange-400', gradient: 'from-orange-400 to-red-500' },
  { name: 'Cosmic Dust', icon: Sparkles, color: 'text-yellow-400', gradient: 'from-yellow-400 to-orange-500' },
  { name: 'Crystal Cave', icon: Diamond, color: 'text-cyan-400', gradient: 'from-cyan-400 to-blue-500' },
  { name: 'Crystal Grid', icon: Hexagon, color: 'text-pink-400', gradient: 'from-pink-400 to-purple-500' },
  { name: 'Crystal Growth', icon: Triangle, color: 'text-emerald-400', gradient: 'from-emerald-400 to-teal-500' },
  { name: 'Cyber Cells', icon: Cpu, color: 'text-teal-400', gradient: 'from-teal-400 to-cyan-500' },
  { name: 'Cyber Circuit', icon: Network, color: 'text-indigo-400', gradient: 'from-indigo-400 to-purple-500' },
  { name: 'DNA Helix', icon: Atom, color: 'text-lime-400', gradient: 'from-lime-400 to-green-500' },
  { name: 'Data Stream', icon: Layers, color: 'text-violet-400', gradient: 'from-violet-400 to-purple-500' },
  { name: 'Digital Rain', icon: Binary, color: 'text-green-500', gradient: 'from-green-500 to-emerald-600' },
  { name: 'Electric Web', icon: Zap, color: 'text-yellow-300', gradient: 'from-yellow-300 to-orange-400' },
  { name: 'Electromagnetic Field', icon: Orbit, color: 'text-blue-300', gradient: 'from-blue-300 to-indigo-400' },
  { name: 'Energy Orbs', icon: Sun, color: 'text-amber-400', gradient: 'from-amber-400 to-orange-500' },
  { name: 'Fiber Optics', icon: Layers, color: 'text-cyan-300', gradient: 'from-cyan-300 to-blue-400' },
  { name: 'Fireworks Burst', icon: Star, color: 'text-red-400', gradient: 'from-red-400 to-pink-500' },
  { name: 'Flocking Birds', icon: Wind, color: 'text-sky-400', gradient: 'from-sky-400 to-blue-500' },
  { name: 'Flow Field', icon: Waves, color: 'text-purple-300', gradient: 'from-purple-300 to-pink-400' },
  { name: 'Fluid Dynamics', icon: Droplets, color: 'text-blue-500', gradient: 'from-blue-500 to-cyan-600' },
  { name: 'Fluid Warp', icon: Waves, color: 'text-teal-300', gradient: 'from-teal-300 to-blue-400' },
  { name: 'Fractal Flame', icon: Flame, color: 'text-orange-500', gradient: 'from-orange-500 to-red-600' },
  { name: 'Fractal Mandelbrot', icon: Hexagon, color: 'text-magenta-400', gradient: 'from-magenta-400 to-purple-500' },
  { name: 'Galaxy Spiral', icon: Moon, color: 'text-purple-500', gradient: 'from-purple-500 to-indigo-600' },
  { name: 'Geometric Tunnel', icon: Triangle, color: 'text-cyan-500', gradient: 'from-cyan-500 to-blue-600' },
  { name: 'Gravity Wells', icon: Orbit, color: 'text-violet-500', gradient: 'from-violet-500 to-purple-600' },
  { name: 'Hologram Shader', icon: Eye, color: 'text-rainbow', gradient: 'from-pink-400 via-purple-400 to-indigo-400' },
  { name: 'Holographic Noise', icon: Grid, color: 'text-cyan-400', gradient: 'from-cyan-400 to-purple-500' },
  { name: 'Hyperdrive', icon: Star, color: 'text-white', gradient: 'from-white to-blue-400' },
  { name: 'Supernova', icon: Sun, color: 'text-yellow-300', gradient: 'from-yellow-300 to-red-500' },
  { name: 'Wormhole Travel', icon: Eye, color: 'text-purple-300', gradient: 'from-purple-300 to-blue-400' },
];

interface BackgroundSelectorProps {
  currentBackground: string;
  onBackgroundChange: (background: string) => void;
}

export function BackgroundSelector({ currentBackground, onBackgroundChange }: BackgroundSelectorProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="glass glass-hover">
          <Sparkles className="w-4 h-4 mr-2" />
          Change Style
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="text-electric">Select Background Effect</DrawerTitle>
        </DrawerHeader>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {backgroundEffects.map((effect) => {
              const IconComponent = effect.icon;
              const isActive = currentBackground === effect.name;
              
              return (
                <button
                  key={effect.name}
                  onClick={() => onBackgroundChange(effect.name)}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all duration-300 group
                    ${isActive 
                      ? 'border-electric-cyan bg-electric-cyan/10 scale-105' 
                      : 'border-border hover:border-electric-cyan/50 glass glass-hover'
                    }
                  `}
                >
                  {/* Background gradient preview */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${effect.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center space-y-2">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${effect.gradient} shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-center">{effect.name}</span>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-electric-cyan rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}