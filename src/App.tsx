import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WagmiConfig, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/toaster";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

function App() {
  return (
    <WagmiConfig config={config}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster />
      </Router>
    </WagmiConfig>
  );
}

export default App;