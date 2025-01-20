import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { TopSellingCarousel } from "@/components/marketplace/TopSellingCarousel";
import { WorkflowList } from "@/components/marketplace/WorkflowList";
import { WorkflowDialog } from "@/components/marketplace/WorkflowDialog";
import { Header } from "@/components/marketplace/Header";
import { Workflow } from "@/types/marketplace";

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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header
          connected={connected}
          account={account}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />

        <div className="space-y-12">
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
    </div>
  );
};

export default Index;