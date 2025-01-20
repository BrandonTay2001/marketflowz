import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Workflow } from "@/types/marketplace";

interface WorkflowDialogProps {
  workflow: Workflow | null;
  onOpenChange: (open: boolean) => void;
  onPurchase: (workflow: Workflow) => void;
}

export const WorkflowDialog = ({
  workflow,
  onOpenChange,
  onPurchase,
}: WorkflowDialogProps) => {
  if (!workflow) return null;

  return (
    <Dialog open={!!workflow} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">
            {workflow.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <img
            src={workflow.image}
            alt={workflow.title}
            className="w-full h-64 object-cover rounded-lg transition-all duration-300 hover:shadow-2xl filter grayscale"
          />
          <p className="text-black text-base">{workflow.description}</p>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-black">Price:</span>
              <span className="text-black font-semibold text-xl">
                {workflow.price} ETH
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black">Seller:</span>
              <span className="text-black">{workflow.seller}</span>
            </div>
            <Button
              onClick={() => onPurchase(workflow)}
              className="w-full glass-card hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 text-black"
              size="lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Purchase Workflow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};