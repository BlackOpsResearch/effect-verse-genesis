import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, Loader2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function ImageGenerationPanel() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-image-ai', {
        body: { prompt },
      });

      if (error) throw error;

      setGeneratedImage(data.imageUrl);
      toast({
        title: 'Image generated!',
        description: 'Your image is ready.',
      });
    } catch (error: any) {
      console.error('Image generation error:', error);
      toast({
        title: 'Generation failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'generated-image.png';
    link.click();
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Image Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate in detail..."
            className="min-h-[120px]"
          />
        </div>

        <Button onClick={handleGenerate} disabled={isLoading || !prompt.trim()} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image className="w-4 h-4 mr-2" />
              Generate Image
            </>
          )}
        </Button>

        <div className="grid grid-cols-2 gap-2">
          {['Ultra realistic photo', 'Digital art', 'Oil painting', 'Anime style'].map((style) => (
            <Button
              key={style}
              variant="outline"
              size="sm"
              onClick={() => setPrompt(prev => `${prev} ${style}`.trim())}
              className="glass glass-hover"
            >
              {style}
            </Button>
          ))}
        </div>
      </div>

      {generatedImage && (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Generated Image</label>
            <Button variant="outline" size="sm" onClick={downloadImage}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          <div className="flex-1 glass rounded-lg overflow-hidden flex items-center justify-center p-4">
            <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain rounded" />
          </div>
        </div>
      )}
    </div>
  );
}
