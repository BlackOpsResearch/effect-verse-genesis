import React, { useState } from 'react';
import { Sparkles, Send, Code, Play, Loader2 } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function AIStudioDrawer() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please describe the effect you want to create",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-effect', {
        body: { prompt }
      });

      if (error) throw error;

      setGeneratedCode(data.code);
      toast({
        title: "Effect generated!",
        description: "Your custom effect code is ready. You can preview it or copy the code.",
      });
    } catch (error) {
      console.error('Error generating effect:', error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate effect. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Code copied!",
      description: "The generated code has been copied to your clipboard.",
    });
  };

  const extractCodeBlock = (code: string) => {
    // Extract code from markdown code blocks if present
    const match = code.match(/```(?:typescript|tsx)?\n([\s\S]*?)```/);
    return match ? match[1] : code;
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="glass glass-hover">
          <Sparkles className="w-4 h-4 mr-2" />
          AI Studio
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="text-electric flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            AI Code Studio
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Prompt Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Describe Your Effect</label>
            <Textarea
              placeholder="E.g., 'Create a mesmerizing spiral of glowing particles that rotate around the center with a pulsing color effect'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] glass"
              disabled={isGenerating}
            />
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Generate Effect
                </>
              )}
            </Button>
          </div>

          {/* Generated Code Preview */}
          {generatedCode && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Generated Code</label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopyCode}
                  className="glass glass-hover"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Copy Code
                </Button>
              </div>
              <div className="relative">
                <pre className="p-4 bg-muted rounded-lg overflow-x-auto max-h-[400px] text-xs">
                  <code>{extractCodeBlock(generatedCode)}</code>
                </pre>
              </div>
              <p className="text-xs text-muted-foreground">
                💡 Tip: Copy this code and save it as a new component in your project to use it.
              </p>
            </div>
          )}

          {/* Quick Examples */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Quick Examples</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                "Flowing liquid metal effect with reflections",
                "DNA double helix rotating in 3D space",
                "Glitchy digital rain with random characters",
                "Geometric kaleidoscope with mirror symmetry",
                "Cosmic nebula with twinkling stars"
              ].map((example) => (
                <Button
                  key={example}
                  variant="outline"
                  size="sm"
                  onClick={() => setPrompt(example)}
                  disabled={isGenerating}
                  className="glass glass-hover justify-start text-left h-auto py-2 px-3"
                >
                  <Play className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span className="text-xs">{example}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
