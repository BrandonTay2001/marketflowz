import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export const WalletInfo = () => {
  // In a real app, this would come from your wallet connection
  const walletAddress = "0x1234...5678";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Connected Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-mono">{walletAddress}</p>
      </CardContent>
    </Card>
  );
};