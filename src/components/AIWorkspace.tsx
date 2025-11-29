import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Code, MessageSquare, Image, Music, Video, Users } from 'lucide-react';
import { MultiModalChat } from './MultiModalChat';
import { CodingAgent } from './CodingAgent';
import { ImageGenerationPanel } from './ImageGenerationPanel';
import { AudioGenerationPanel } from './AudioGenerationPanel';
import { MultiAgentOrchestrator } from './MultiAgentOrchestrator';

export function AIWorkspace() {
  return (
    <div className="h-screen flex flex-col glass">
      <div className="border-b border-border/40 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-electric" />
          <h1 className="text-2xl font-bold">AI Workspace</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Comprehensive AI tools for generation, coding, and multi-agent collaboration
        </p>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start border-b border-border/40 rounded-none bg-transparent px-4">
          <TabsTrigger value="chat" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Chat Agent
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-2">
            <Code className="w-4 h-4" />
            Coding Agent
          </TabsTrigger>
          <TabsTrigger value="image" className="gap-2">
            <Image className="w-4 h-4" />
            Image Gen
          </TabsTrigger>
          <TabsTrigger value="audio" className="gap-2">
            <Music className="w-4 h-4" />
            Audio Gen
          </TabsTrigger>
          <TabsTrigger value="multi-agent" className="gap-2">
            <Users className="w-4 h-4" />
            Multi-Agent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 m-0 p-4">
          <MultiModalChat />
        </TabsContent>

        <TabsContent value="code" className="flex-1 m-0 p-4">
          <CodingAgent />
        </TabsContent>

        <TabsContent value="image" className="flex-1 m-0 p-4">
          <ImageGenerationPanel />
        </TabsContent>

        <TabsContent value="audio" className="flex-1 m-0 p-4">
          <AudioGenerationPanel />
        </TabsContent>

        <TabsContent value="multi-agent" className="flex-1 m-0 p-4">
          <MultiAgentOrchestrator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
