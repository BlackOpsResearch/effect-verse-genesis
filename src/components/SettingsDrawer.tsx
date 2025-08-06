import React from 'react';
import { Settings, Palette, Sliders, RotateCcw } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SettingsDrawerProps {
  currentBackground: string;
  settings: Record<string, any>;
  onSettingsChange: (key: string, value: any) => void;
  onResetSettings: () => void;
}

const settingsConfig: Record<string, any> = {
  'Aurora Waves': {
    speed: { label: 'Wave Speed', min: 0.1, max: 3, step: 0.1, default: 1 },
    intensity: { label: 'Aurora Intensity', min: 0.1, max: 2, step: 0.1, default: 1 },
    colors: { label: 'Color Shift', min: 0, max: 360, step: 10, default: 0 },
  },
  'Binary Matrix': {
    speed: { label: 'Fall Speed', min: 0.1, max: 5, step: 0.1, default: 1 },
    density: { label: 'Code Density', min: 0.1, max: 2, step: 0.1, default: 1 },
    glitch: { label: 'Glitch Effect', type: 'boolean', default: true },
  },
  'Crystal Growth': {
    growthRate: { label: 'Growth Rate', min: 0.1, max: 3, step: 0.1, default: 1 },
    complexity: { label: 'Crystal Complexity', min: 1, max: 5, step: 1, default: 3 },
    shimmer: { label: 'Shimmer Effect', type: 'boolean', default: true },
  },
  'Particle Physics': {
    particleCount: { label: 'Particle Count', min: 50, max: 1000, step: 50, default: 300 },
    gravity: { label: 'Gravity', min: -2, max: 2, step: 0.1, default: 0 },
    bounce: { label: 'Bounce Factor', min: 0, max: 1, step: 0.1, default: 0.8 },
  },
  'Plasma Effect': {
    frequency: { label: 'Plasma Frequency', min: 0.1, max: 5, step: 0.1, default: 1 },
    amplitude: { label: 'Wave Amplitude', min: 0.1, max: 3, step: 0.1, default: 1 },
    colorCycle: { label: 'Color Cycling', type: 'boolean', default: true },
  },
};

export function SettingsDrawer({ currentBackground, settings, onSettingsChange, onResetSettings }: SettingsDrawerProps) {
  const currentSettings = settingsConfig[currentBackground] || {};

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="glass glass-hover">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerTitle className="text-electric">Effect Settings - {currentBackground}</DrawerTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onResetSettings}
            className="glass glass-hover"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </DrawerHeader>
        <div className="p-6 overflow-y-auto">
          {Object.keys(currentSettings).length === 0 ? (
            <div className="text-center py-8">
              <Palette className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No settings available for this effect</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(currentSettings).map(([key, config]: [string, any]) => {
                const currentValue = settings[key] ?? config.default;
                
                return (
                  <div key={key} className="space-y-3">
                    <Label className="text-sm font-medium">{config.label}</Label>
                    
                    {config.type === 'boolean' ? (
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={currentValue}
                          onCheckedChange={(checked) => onSettingsChange(key, checked)}
                        />
                        <span className="text-sm text-muted-foreground">
                          {currentValue ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{config.min}</span>
                          <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {currentValue}
                          </span>
                          <span className="text-xs text-muted-foreground">{config.max}</span>
                        </div>
                        <Slider
                          value={[currentValue]}
                          onValueChange={([value]) => onSettingsChange(key, value)}
                          min={config.min}
                          max={config.max}
                          step={config.step}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Global settings */}
              <div className="border-t border-border pt-6 mt-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center">
                  <Sliders className="w-4 h-4 mr-2" />
                  Global Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Animation Speed</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">0.1x</span>
                      <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {settings.globalSpeed ?? 1}x
                      </span>
                      <span className="text-xs text-muted-foreground">3x</span>
                    </div>
                    <Slider
                      value={[settings.globalSpeed ?? 1]}
                      onValueChange={([value]) => onSettingsChange('globalSpeed', value)}
                      min={0.1}
                      max={3}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.paused ?? false}
                      onCheckedChange={(checked) => onSettingsChange('paused', checked)}
                    />
                    <Label className="text-sm">Pause Animation</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}