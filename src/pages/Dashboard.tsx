import { WorkflowUpload } from "@/components/dashboard/WorkflowUpload";
import { ListedWorkflows } from "@/components/dashboard/ListedWorkflows";
import { PurchaseHistory } from "@/components/dashboard/PurchaseHistory";
import { RevenueStats } from "@/components/dashboard/RevenueStats";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { WalletInfo } from "@/components/dashboard/WalletInfo";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
        </Button>
      <div className="space-y-8">
          <WalletInfo />
        <RevenueStats />
        <WorkflowUpload />
        <ListedWorkflows />
        <PurchaseHistory />
      </div>
    </div>
  );
};

export default Dashboard;
