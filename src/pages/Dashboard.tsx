import { WorkflowUpload } from "@/components/dashboard/WorkflowUpload";
import { ListedWorkflows } from "@/components/dashboard/ListedWorkflows";
import { PurchaseHistory } from "@/components/dashboard/PurchaseHistory";
import { RevenueStats } from "@/components/dashboard/RevenueStats";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <RevenueStats />
        <WorkflowUpload />
        <ListedWorkflows />
        <PurchaseHistory />
      </div>
    </div>
  );
};

export default Dashboard;