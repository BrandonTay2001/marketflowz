import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Wallet, ShoppingBag, Twitter, MessageCircle, Globe } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Workflow {
  id: string;
  title: string;
  description: string;
  price: string;
  seller: string;
  image?: string; // Optional for now since we don't have real images
}

const mockWorkflows: Workflow[] = [
  {
    id: "1",
    title: "Data Processing Pipeline",
    description: "Efficient ETL workflow for large datasets",
    price: "0.1",
    seller: "0x1234...5678",
    image: "/placeholder.svg", // Using placeholder image
  },
  {
    id: "2",
    title: "ML Training Workflow",
    description: "Automated machine learning model training pipeline",
    price: "0.2",
    seller: "0x8765...4321",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    title: "API Integration Flow",
    description: "Seamless integration with popular APIs",
    price: "0.15",
    seller: "0x2468...1357",
    image: "/placeholder.svg",
  },
];

const Index = () => {
  const { toast } = useToast();
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setConnected(true);
        toast({
          title: "Wallet Connected",
          description: "Successfully connected to MetaMask",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: "Failed to connect to MetaMask",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "MetaMask Not Found",
        description: "Please install MetaMask to use this application",
      });
    }
  };

  const handlePurchase = (workflow: Workflow) => {
    if (!connected) {
      toast({
        variant: "destructive",
        title: "Wallet Not Connected",
        description: "Please connect your wallet to make purchases",
      });
      return;
    }
    toast({
      title: "Purchase Initiated",
      description: "Processing your purchase...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Workflow Marketplace</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
            <Button
              onClick={connectWallet}
              className="bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {connected ? (
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  {`${account.slice(0, 6)}...${account.slice(-4)}`}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </div>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWorkflows.map((workflow) => (
            <Card
              key={workflow.id}
              className="p-6 bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedWorkflow(workflow)}
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
                      handlePurchase(workflow);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Seller: {workflow.seller}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Dialog
          open={selectedWorkflow !== null}
          onOpenChange={(open) => !open && setSelectedWorkflow(null)}
        >
          {selectedWorkflow && (
            <DialogContent className="bg-gray-800 text-white border-gray-700 sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedWorkflow.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img
                  src={selectedWorkflow.image}
                  alt={selectedWorkflow.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <DialogDescription className="text-gray-300 text-base">
                  {selectedWorkflow.description}
                </DialogDescription>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-blue-400 font-semibold text-xl">
                      {selectedWorkflow.price} ETH
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Seller:</span>
                    <span className="text-gray-300">{selectedWorkflow.seller}</span>
                  </div>
                  <Button
                    onClick={() => handlePurchase(selectedWorkflow)}
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                    size="lg"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Purchase Workflow
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default Index;