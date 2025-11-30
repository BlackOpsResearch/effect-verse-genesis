import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Music, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function AudioGenerationPanel() {
  const [text, setText] = useState('');
  const [audioDescription, setAudioDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-audio-tts', {
        body: { text },
      });

      if (error) throw error;

      setAudioDescription(data.audioDescription);
      toast({
        title: 'Audio Description Generated',
        description: 'AI analyzed how this text should sound.',
      });
    } catch (error: any) {
      console.error('Audio generation error:', error);
      toast({
        title: 'Generation failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Text to Analyze</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze how it should sound..."
            className="min-h-[150px]"
          />
        </div>

        <Button onClick={handleGenerate} disabled={isLoading || !text.trim()} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Music className="w-4 h-4 mr-2" />
              Analyze Audio
            </>
          )}
        </Button>
      </div>

      {audioDescription && (
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium">Audio Description</label>
          <div className="flex-1 glass p-4 rounded-lg overflow-auto">
            <p className="text-sm whitespace-pre-wrap">{audioDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}
