import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart } from "lucide-react";

export const PurchaseHistory = () => {
  // In a real app, this would come from your backend
  const purchases = [
    {
      id: "1",
      name: "Data Processing Pipeline",
      price: "0.1 ETH",
      date: "2024-03-15",
    },
    {
      id: "2",
      name: "ML Training Workflow",
      price: "0.2 ETH",
      date: "2024-03-10",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Purchase History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workflow Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Purchase Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.name}</TableCell>
                <TableCell>{purchase.price}</TableCell>
                <TableCell>{purchase.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};