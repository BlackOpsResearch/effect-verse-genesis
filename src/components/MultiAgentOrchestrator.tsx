import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Users, Loader2, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Checkbox } from '@/components/ui/checkbox';

const AVAILABLE_AGENTS = [
  { id: 'visual', name: 'Visual Agent', description: 'Image generation & design' },
  { id: 'code', name: 'Code Agent', description: 'Programming & debugging' },
  { id: 'chat', name: 'Chat Agent', description: 'Conversation & Q&A' },
  { id: 'audio', name: 'Audio Agent', description: 'Voice & audio generation' },
];

export function MultiAgentOrchestrator() {
  const [task, setTask] = useState('');
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['visual', 'code', 'chat', 'audio']);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const toggleAgent = (agentId: string) => {
    setSelectedAgents(prev =>
      prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleCoordinate = async () => {
    if (!task.trim() || selectedAgents.length === 0) return;

    setIsLoading(true);
    setResult('');

    try {
      const { data, error } = await supabase.functions.invoke('multi-agent-coordinator', {
        body: { task, agents: selectedAgents },
      });

      if (error) throw error;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6);
            if (jsonStr === '[DONE]') continue;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullResponse += content;
                setResult(fullResponse);
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }

      toast({
        title: 'Task coordinated!',
        description: 'Multi-agent system has processed your request.',
      });
    } catch (error: any) {
      console.error('Multi-agent error:', error);
      toast({
        title: 'Coordination failed',
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
          <label className="text-sm font-medium mb-3 block">Select Active Agents</label>
          <div className="grid grid-cols-2 gap-3">
            {AVAILABLE_AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="glass p-3 rounded-lg flex items-start gap-3 cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => toggleAgent(agent.id)}
              >
                <Checkbox
                  checked={selectedAgents.includes(agent.id)}
                  onCheckedChange={() => toggleAgent(agent.id)}
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{agent.name}</div>
                  <div className="text-xs text-muted-foreground">{agent.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Complex Task</label>
          <Textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Describe a complex task that requires multiple specialized agents... e.g., 'Create a landing page with hero image, generate code for it, and add voice-over narration'"
            className="min-h-[120px]"
          />
        </div>

        <Button
          onClick={handleCoordinate}
          disabled={isLoading || !task.trim() || selectedAgents.length === 0}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Coordinating Agents...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Coordinate Task
            </>
          )}
        </Button>
      </div>

      {result && (
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium">Coordination Plan & Results</label>
          <div className="flex-1 glass p-4 rounded-lg overflow-auto">
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
