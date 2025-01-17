import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Workflow } from "@/types/marketplace";

interface TopSellingCarouselProps {
  workflows: Workflow[];
  onWorkflowSelect: (workflow: Workflow) => void;
  onPurchase: (workflow: Workflow) => void;
}

export const TopSellingCarousel = ({
  workflows,
  onWorkflowSelect,
  onPurchase,
}: TopSellingCarouselProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Top Selling Workflows</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {workflows.map((workflow) => (
            <CarouselItem key={workflow.id} className="md:basis-1/2 lg:basis-1/3">
              <Card
                className="p-6 bg-white border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer h-full"
                onClick={() => onWorkflowSelect(workflow)}
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-2">{workflow.title}</h3>
                  <p className="text-gray-400 mb-4 flex-grow">
                    {workflow.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-blue-400">
                      <span className="text-sm">Price:</span>
                      <span className="ml-2 font-semibold">
                        {workflow.price} ETH
                      </span>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPurchase(workflow);
                      }}
                      variant="secondary"
                      size="sm"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};