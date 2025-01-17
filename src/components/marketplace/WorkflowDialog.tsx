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
      <DialogContent className="bg-gray-800 text-white border-gray-700 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {workflow.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <img
            src={workflow.image}
            alt={workflow.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <p className="text-gray-300 text-base">{workflow.description}</p>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Price:</span>
              <span className="text-blue-400 font-semibold text-xl">
                {workflow.price} ETH
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Seller:</span>
              <span className="text-gray-300">{workflow.seller}</span>
            </div>
            <Button
              onClick={() => onPurchase(workflow)}
              className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
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