import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { WalletInfo } from "@/components/dashboard/WalletInfo";
import { RevenueStats } from "@/components/dashboard/RevenueStats";
import { WorkflowUpload } from "@/components/dashboard/WorkflowUpload";
import { PurchaseHistory } from "@/components/dashboard/PurchaseHistory";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="space-y-8">
          <WalletInfo />
          <RevenueStats />
          <WorkflowUpload />
          <PurchaseHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;