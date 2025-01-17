import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export const RevenueStats = () => {
  // In a real app, these would come from your backend
  const lifetimeRevenue = "1.5 ETH";
  const weeklyRevenue = "0.3 ETH";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Lifetime Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{lifetimeRevenue}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Last 7 Days Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{weeklyRevenue}</p>
        </CardContent>
      </Card>
    </div>
  );
};