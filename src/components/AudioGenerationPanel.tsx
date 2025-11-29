import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Music, Loader2, Play, Pause, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const VOICES = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

export function AudioGenerationPanel() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('alloy');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-audio-tts', {
        body: { text, voice },
      });

      if (error) throw error;

      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
        { type: 'audio/mpeg' }
      );
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      toast({
        title: 'Audio generated!',
        description: 'Your audio is ready to play.',
      });
    } catch (error: any) {
      console.error('Audio generation error:', error);
      toast({
        title: 'Generation failed',
        description: error.message || 'Failed to generate audio. Make sure OPENAI_API_KEY is configured.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'generated-audio.mp3';
    link.click();
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Voice</label>
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {VOICES.map((v) => (
                <SelectItem key={v} value={v}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Text to Speech</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to speech..."
            className="min-h-[150px]"
          />
        </div>

        <Button onClick={handleGenerate} disabled={isLoading || !text.trim()} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Music className="w-4 h-4 mr-2" />
              Generate Audio
            </>
          )}
        </Button>
      </div>

      {audioUrl && (
        <div className="glass p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Generated Audio</label>
            <Button variant="outline" size="sm" onClick={downloadAudio}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          <Button onClick={togglePlayback} className="w-full">
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
