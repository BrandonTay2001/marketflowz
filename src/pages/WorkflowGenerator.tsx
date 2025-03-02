
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const WorkflowGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a prompt first",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // TODO: Implement actual workflow generation logic
      toast({
        title: "Generation Started",
        description: "Your workflow is being generated...",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Failed to generate workflow",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Workflow Generator</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Describe your workflow</Label>
            <Textarea
              id="prompt"
              placeholder="Describe the workflow you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-32"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? "Generating..." : "Generate Workflow"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowGenerator;
