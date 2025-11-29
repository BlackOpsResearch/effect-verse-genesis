import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    console.log('Generating effect for prompt:', prompt);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert canvas animation developer. Generate TypeScript React component code for visual effects based on user descriptions. 

Requirements:
- Use React hooks (useState, useEffect, useRef)
- Create canvas-based animations
- Component should accept props: width, height, speed (optional multiplier, default 1)
- Use requestAnimationFrame for smooth animations
- Include cleanup in useEffect return
- Apply the speed prop to all time-based calculations
- Make the effect visually striking and performant
- Return ONLY the component code, no explanations
- Name the component based on the effect (e.g., "CustomEffect")

Example structure:
\`\`\`typescript
import { useEffect, useRef } from 'react';

interface CustomEffectProps {
  width?: number;
  height?: number;
  speed?: number;
}

export const CustomEffect = ({ width = 800, height = 600, speed = 1 }: CustomEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let time = 0;
    
    const animate = () => {
      time += 0.01 * speed;
      // ... animation logic
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return <canvas ref={canvasRef} width={width} height={height} className="w-full h-full" />;
};
\`\`\``
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI API error:', error);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedCode = data.choices[0]?.message?.content || '';
    
    console.log('Successfully generated effect code');

    return new Response(
      JSON.stringify({ code: generatedCode }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in generate-effect:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
