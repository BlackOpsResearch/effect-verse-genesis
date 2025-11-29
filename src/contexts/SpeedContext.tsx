import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';

interface SpeedContextType {
  globalSpeed: number;
  setGlobalSpeed: (speed: number) => void;
  autoAdjust: boolean;
  setAutoAdjust: (enabled: boolean) => void;
  effectiveSpeed: number;
}

const SpeedContext = createContext<SpeedContextType | undefined>(undefined);

export function SpeedProvider({ children }: { children: React.ReactNode }) {
  const [globalSpeed, setGlobalSpeed] = useState(1);
  const [autoAdjust, setAutoAdjust] = useState(true);
  const [effectiveSpeed, setEffectiveSpeed] = useState(1);
  const metrics = usePerformanceMetrics({ isActive: autoAdjust });

  useEffect(() => {
    if (!autoAdjust) {
      setEffectiveSpeed(globalSpeed);
      return;
    }

    // Auto-adjust speed based on performance metrics
    const avgFps = metrics.avgFps || 60;
    const longFramePercent = metrics.droppedPercent || 0;
    
    let speedMultiplier = 1;

    // If FPS is consistently low, reduce speed
    if (avgFps < 30) {
      speedMultiplier = 0.5;
    } else if (avgFps < 45) {
      speedMultiplier = 0.75;
    } else if (avgFps > 55 && longFramePercent < 5) {
      // Performance is good, can use full speed
      speedMultiplier = 1;
    } else if (longFramePercent > 20) {
      // Too many dropped frames
      speedMultiplier = 0.6;
    }

    // Apply both manual and auto adjustments
    setEffectiveSpeed(globalSpeed * speedMultiplier);
  }, [globalSpeed, autoAdjust, metrics.avgFps, metrics.droppedPercent]);

  return (
    <SpeedContext.Provider value={{ 
      globalSpeed, 
      setGlobalSpeed, 
      autoAdjust, 
      setAutoAdjust,
      effectiveSpeed 
    }}>
      {children}
    </SpeedContext.Provider>
  );
}

export function useSpeed() {
  const context = useContext(SpeedContext);
  if (!context) {
    throw new Error('useSpeed must be used within SpeedProvider');
  }
  return context;
}
