import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag } from "lucide-react";
import { Workflow } from "@/types/marketplace";

interface WorkflowListProps {
  workflows: Workflow[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onWorkflowSelect: (workflow: Workflow) => void;
  onPurchase: (workflow: Workflow) => void;
}

export const WorkflowList = ({
  workflows,
  searchQuery,
  onSearchChange,
  onWorkflowSelect,
  onPurchase,
}: WorkflowListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">All Workflows</h2>
        <Input
          type="search"
          placeholder="Search workflows..."
          className="max-w-xs glass-card"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <Card
            key={workflow.id}
            className="workflow-card cursor-pointer"
            onClick={() => onWorkflowSelect(workflow)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{workflow.title}</h3>
                <p className="text-gray-500 mt-1">{workflow.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-gray-900">
                  <span className="text-sm text-gray-500">Price:</span>
                  <span className="ml-2 font-semibold">{workflow.price} ETH</span>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPurchase(workflow);
                  }}
                  variant="secondary"
                  size="sm"
                  className="glass-card hover:bg-gray-50"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};