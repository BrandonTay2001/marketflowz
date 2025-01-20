import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { useAccount } from 'wagmi';

export const WalletInfo = () => {
  const { address, isConnected } = useAccount();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Connected Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-mono">
          {isConnected ? address : "No wallet connected"}
        </p>
      </CardContent>
    </Card>
  );
};