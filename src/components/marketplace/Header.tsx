import { Button } from "@/components/ui/button";
import { Wallet, Twitter, MessageCircle, Globe, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'

interface HeaderProps {
  connected: boolean;
  account: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Header = ({
  connected,
  account,
  onConnect,
  onDisconnect,
}: HeaderProps) => {
  return (
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
            <FontAwesomeIcon icon={faTelegram} />
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
              <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
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
              <DropdownMenuItem onClick={onDisconnect}>
                Disconnect Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={onConnect}
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
  );
};