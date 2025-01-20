import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Package } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { EditWorkflowDialog } from "./EditWorkflowDialog";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface WorkflowData {
  id: string;
  name: string;
  description?: string;
  price?: string;
  revenue: string;
  listingDate: string;
  image?: File | null;
  workflow?: File | null;
}

export const ListedWorkflows = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [editingWorkflow, setEditingWorkflow] = useState<WorkflowData | null>(null);
  const itemsPerPage = 5;
  
  // In a real app, this would come from your backend
  const listedWorkflows = [
    {
      id: "1",
      name: "Data Processing Pipeline",
      description: "A workflow for processing large datasets",
      price: "0.5",
      revenue: "0.5 ETH",
      listingDate: "2024-03-01",
    },
    {
      id: "2",
      name: "ML Training Workflow",
      description: "Machine learning model training pipeline",
      price: "0.3",
      revenue: "0.3 ETH",
      listingDate: "2024-03-05",
    },
    {
      id: "3",
      name: "API Integration Flow",
      description: "Workflow for integrating multiple APIs",
      price: "0.2",
      revenue: "0.2 ETH",
      listingDate: "2024-03-10",
    },
  ];

  const totalPages = Math.ceil(listedWorkflows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWorkflows = listedWorkflows.slice(startIndex, endIndex);

  const handleEdit = (workflow: WorkflowData) => {
    setEditingWorkflow(workflow);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual save logic in the future
    toast({
      title: "Workflow Updated",
      description: `Workflow ${editingWorkflow?.name} has been updated successfully.`,
    });
    setEditingWorkflow(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Your Listed Workflows
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Workflow Name</TableHead>
                <TableHead className="w-[25%]">Lifetime Revenue</TableHead>
                <TableHead className="w-[25%]">Listing Date</TableHead>
                <TableHead className="w-[10%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentWorkflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell>{workflow.name}</TableCell>
                  <TableCell>{workflow.revenue}</TableCell>
                  <TableCell>{workflow.listingDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(workflow)}
                      title="Edit Workflow"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <EditWorkflowDialog
        workflow={editingWorkflow}
        onOpenChange={(open) => !open && setEditingWorkflow(null)}
        onSave={handleSaveEdit}
        onWorkflowChange={setEditingWorkflow}
      />
    </>
  );
};