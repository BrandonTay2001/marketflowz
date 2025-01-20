import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WorkflowData } from "@/types/marketplace";

interface EditWorkflowDialogProps {
  workflow: WorkflowData | null;
  onOpenChange: (open: boolean) => void;
  onSave: (e: React.FormEvent) => void;
  onWorkflowChange: (workflow: WorkflowData) => void;
}

export const EditWorkflowDialog = ({
  workflow,
  onOpenChange,
  onSave,
  onWorkflowChange,
}: EditWorkflowDialogProps) => {
  if (!workflow) return null;

  return (
    <Dialog open={!!workflow} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Workflow</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
              Workflow Name
            </label>
            <Input
              id="edit-name"
              value={workflow.name}
              onChange={(e) => onWorkflowChange({ ...workflow, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="edit-description"
              value={workflow.description || ""}
              onChange={(e) => onWorkflowChange({ ...workflow, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="edit-price" className="block text-sm font-medium mb-1">
              Price (ETH)
            </label>
            <Input
              id="edit-price"
              type="number"
              step="0.001"
              value={workflow.price || ""}
              onChange={(e) => onWorkflowChange({ ...workflow, price: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="edit-image" className="block text-sm font-medium mb-1">
              Workflow Image
            </label>
            <Input
              id="edit-image"
              type="file"
              accept="image/*"
              onChange={(e) => onWorkflowChange({ ...workflow, image: e.target.files?.[0] || null })}
            />
          </div>

          <div>
            <label htmlFor="edit-workflow" className="block text-sm font-medium mb-1">
              Workflow JSON File
            </label>
            <Input
              id="edit-workflow"
              type="file"
              accept=".json"
              onChange={(e) => onWorkflowChange({ ...workflow, workflow: e.target.files?.[0] || null })}
            />
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};