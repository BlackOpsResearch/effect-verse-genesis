import { useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: 'electric' | 'plasma' | 'neural' | 'cyber';
  animation?: 'glow' | 'wave' | 'glitch' | 'particle';
}

export function AnimatedText({ 
  text, 
  className = '', 
  variant = 'electric',
  animation = 'glow'
}: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (animation === 'glitch' && textRef.current) {
      const element = textRef.current;
      let glitchTimeout: NodeJS.Timeout;

      const createGlitch = () => {
        element.style.textShadow = `
          ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 hsl(0, 100%, 50%),
          ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 hsl(120, 100%, 50%),
          ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 hsl(240, 100%, 50%)
        `;
        
        setTimeout(() => {
          element.style.textShadow = '';
        }, 100);

        glitchTimeout = setTimeout(createGlitch, Math.random() * 3000 + 2000);
      };

      createGlitch();

      return () => {
        if (glitchTimeout) clearTimeout(glitchTimeout);
      };
    }
  }, [animation]);

  const getVariantClasses = () => {
    const variants = {
      electric: 'bg-gradient-to-r from-electric-blue to-electric-purple bg-clip-text text-transparent',
      plasma: 'bg-gradient-to-r from-electric-purple to-electric-pink bg-clip-text text-transparent',
      neural: 'bg-gradient-to-r from-electric-green to-electric-cyan bg-clip-text text-transparent',
      cyber: 'bg-gradient-to-r from-electric-cyan to-electric-blue bg-clip-text text-transparent'
    };
    return variants[variant];
  };

  const getAnimationClasses = () => {
    const animations = {
      glow: 'animate-pulse drop-shadow-lg',
      wave: 'animate-bounce',
      glitch: 'relative',
      particle: 'animate-float'
    };
    return animations[animation];
  };

  if (animation === 'wave') {
    return (
      <span className={`${className} inline-block`}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`${getVariantClasses()} inline-block animate-bounce`}
            style={{
              animationDelay: `${index * 100}ms`,
              animationDuration: '2s'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span 
      ref={textRef}
      className={`${className} ${getVariantClasses()} ${getAnimationClasses()}`}
    >
      {text}
    </span>
  );
}