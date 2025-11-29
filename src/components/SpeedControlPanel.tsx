import React from 'react';
import { Gauge, Zap, ZapOff } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useSpeed } from '@/contexts/SpeedContext';

export function SpeedControlPanel() {
  const { globalSpeed, setGlobalSpeed, autoAdjust, setAutoAdjust, effectiveSpeed } = useSpeed();

  return (
    <Card className="p-4 glass space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-primary" />
          <Label className="text-sm font-semibold">Animation Speed</Label>
        </div>
        <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
          {effectiveSpeed.toFixed(2)}x
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>0.1x</span>
          <span>Manual: {globalSpeed.toFixed(1)}x</span>
          <span>3x</span>
        </div>
        <Slider
          value={[globalSpeed]}
          onValueChange={([value]) => setGlobalSpeed(value)}
          min={0.1}
          max={3}
          step={0.1}
          className="w-full"
        />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          {autoAdjust ? (
            <Zap className="w-4 h-4 text-primary" />
          ) : (
            <ZapOff className="w-4 h-4 text-muted-foreground" />
          )}
          <Label htmlFor="auto-adjust" className="text-sm cursor-pointer">
            Auto-adjust to performance
          </Label>
        </div>
        <Switch
          id="auto-adjust"
          checked={autoAdjust}
          onCheckedChange={setAutoAdjust}
        />
      </div>

      {autoAdjust && (
        <p className="text-xs text-muted-foreground">
          Speed automatically adjusts based on your device's performance
        </p>
      )}
    </Card>
  );
}
