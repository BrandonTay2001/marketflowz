import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wallet, Twitter, MessageCircle, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";
import { TopSellingCarousel } from "@/components/marketplace/TopSellingCarousel";
import { WorkflowList } from "@/components/marketplace/WorkflowList";
import { WorkflowDialog } from "@/components/marketplace/WorkflowDialog";
import { Workflow } from "@/types/marketplace";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockWorkflows: Workflow[] = [
  {
    id: "1",
    title: "Data Processing Pipeline",
    description: "Efficient ETL workflow for large datasets",
    price: "0.1",
    seller: "0x1234...5678",
    image: "/placeholder.svg",
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
  {
    id: "4",
    title: "Data Visualization Pipeline",
    description: "Create beautiful data visualizations automatically",
    price: "0.12",
    seller: "0x9876...2468",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    title: "Automated Testing Suite",
    description: "Comprehensive testing workflow for web applications",
    price: "0.18",
    seller: "0x3579...8642",
    image: "/placeholder.svg",
  }
];

const Index = () => {
  const { toast } = useToast();
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const topSellingWorkflows = mockWorkflows.slice(0, 3);
  const otherWorkflows = mockWorkflows.slice(3);

  const filteredWorkflows = otherWorkflows.filter((workflow) =>
    workflow.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const disconnectWallet = () => {
    setConnected(false);
    setAccount("");
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from MetaMask",
    });
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
            {connected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      {`${account.slice(0, 6)}...${account.slice(-4)}`}
                      <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => window.location.href = "/dashboard"}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={disconnectWallet}>
                    Disconnect Wallet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </div>
              </Button>
            )}
          </div>
        </div>

        <TopSellingCarousel
          workflows={topSellingWorkflows}
          onWorkflowSelect={setSelectedWorkflow}
          onPurchase={handlePurchase}
        />

        <WorkflowList
          workflows={filteredWorkflows}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onWorkflowSelect={setSelectedWorkflow}
          onPurchase={handlePurchase}
        />

        <WorkflowDialog
          workflow={selectedWorkflow}
          onOpenChange={(open) => !open && setSelectedWorkflow(null)}
          onPurchase={handlePurchase}
        />
      </div>
    </div>
  );
};

export default Index;