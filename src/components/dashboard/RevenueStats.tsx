import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export const RevenueStats = () => {
  // In a real app, these would come from your backend
  const lifetimeRevenue = "1.5 ETH";
  const weeklyRevenue = "0.3 ETH";
  const dailyRevenue = "0.05 ETH";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Revenue Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Last 7 Days</p>
            <p className="text-2xl font-bold">{weeklyRevenue}</p>
          </div>
          
          <div className="text-center border-x border-border">
            <p className="text-sm text-muted-foreground mb-2">Lifetime</p>
            <p className="text-2xl font-bold">{lifetimeRevenue}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Last 24 Hours</p>
            <p className="text-2xl font-bold">{dailyRevenue}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};