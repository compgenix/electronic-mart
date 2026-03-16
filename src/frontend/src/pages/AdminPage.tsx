import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Edit,
  Package,
  Plus,
  Shield,
  ShoppingBag,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../contexts/ProductContext";
import { DELIVERY_ZONES } from "../data/mockData";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export function AdminPage() {
  const { isAdmin } = useAuth();
  const { products, orders, deleteProduct, updateOrderStatus } = useProducts();
  const navigate = useNavigate();
  const [addOpen, setAddOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Shield size={48} className="mx-auto mb-4 text-muted" />
        <h2 className="text-xl font-bold mb-2">Admin access required</h2>
        <Button onClick={() => navigate({ to: "/login" })}>
          Login as Admin
        </Button>
      </div>
    );
  }

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const lowStock = products.filter((p) => p.stock <= 5);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error("Name and price required");
      return;
    }
    toast.success("Product added (demo mode)");
    setAddOpen(false);
    setNewProduct({
      name: "",
      brand: "",
      category: "",
      price: "",
      stock: "",
      description: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Shield size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Electronic Mart Control Panel
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Zones</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: TrendingUp,
                label: "Total Revenue",
                value: `₹${totalRevenue.toLocaleString()}`,
                color: "text-green-600",
              },
              {
                icon: ShoppingBag,
                label: "Total Orders",
                value: orders.length,
                color: "text-blue-600",
              },
              {
                icon: Package,
                label: "Products",
                value: products.length,
                color: "text-purple-600",
              },
              {
                icon: AlertTriangle,
                label: "Low Stock",
                value: lowStock.length,
                color: "text-red-600",
              },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-card border rounded-xl p-5">
                <Icon size={20} className={`${color} mb-2`} />
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          {/* Low stock alerts */}
          {lowStock.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                <AlertTriangle size={16} /> Low Stock Alerts ({lowStock.length})
              </h3>
              <div className="space-y-2">
                {lowStock.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium">{p.name}</span>
                    <Badge className="bg-red-100 text-red-700">
                      {p.stock} left
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent orders */}
          <div>
            <h3 className="font-semibold mb-3">Recent Orders</h3>
            {orders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No orders yet</p>
            ) : (
              <Table data-ocid="admin.orders_table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs">
                        {order.id}
                      </TableCell>
                      <TableCell className="text-xs">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{order.total.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>

        {/* Products */}
        <TabsContent value="products">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display font-semibold text-lg">
              Product Catalog ({products.length})
            </h2>
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button
                  data-ocid="admin.add_product_button"
                  className="bg-primary text-primary-foreground"
                >
                  <Plus size={16} className="mr-1" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  {[
                    {
                      key: "name",
                      label: "Product Name",
                      placeholder: "iPhone 16",
                    },
                    { key: "brand", label: "Brand", placeholder: "Apple" },
                    {
                      key: "category",
                      label: "Category",
                      placeholder: "Smartphones",
                    },
                    { key: "price", label: "Price (₹)", placeholder: "99999" },
                    { key: "stock", label: "Stock", placeholder: "50" },
                    {
                      key: "description",
                      label: "Description",
                      placeholder: "Product description",
                    },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} className="space-y-1">
                      <Label>{label}</Label>
                      <Input
                        value={newProduct[key as keyof typeof newProduct]}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            [key]: e.target.value,
                          })
                        }
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={handleAddProduct}
                      className="flex-1 bg-primary text-primary-foreground"
                    >
                      Save Product
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setAddOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <Table data-ocid="admin.product_table">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p, idx) => (
                  <TableRow
                    key={p.id}
                    data-ocid={`admin.product.row.${idx + 1}`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded bg-secondary"
                        />
                        <span className="text-sm font-medium line-clamp-1 max-w-[200px]">
                          {p.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{p.brand}</TableCell>
                    <TableCell className="font-semibold">
                      ₹{p.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          p.stock <= 5
                            ? "text-red-600 font-semibold"
                            : "text-foreground"
                        }
                      >
                        {p.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          data-ocid={`admin.product.edit_button.${idx + 1}`}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          data-ocid={`admin.product.delete_button.${idx + 1}`}
                          onClick={() => {
                            deleteProduct(p.id);
                            toast.success("Product deleted");
                          }}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders">
          <h2 className="font-display font-semibold text-lg mb-4">
            All Orders ({orders.length})
          </h2>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">No orders yet</p>
          ) : (
            <div className="rounded-xl border overflow-hidden">
              <Table data-ocid="admin.orders_table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, idx) => (
                    <TableRow
                      key={order.id}
                      data-ocid={`admin.orders.row.${idx + 1}`}
                    >
                      <TableCell className="font-mono text-xs">
                        {order.id}
                      </TableCell>
                      <TableCell className="text-xs">
                        {order.address.name}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{order.total.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs capitalize">
                        {order.paymentMethod}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(v) => {
                            updateOrderStatus(order.id, v as any);
                            toast.success("Status updated");
                          }}
                        >
                          <SelectTrigger className="h-7 w-28 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "pending",
                              "confirmed",
                              "shipped",
                              "delivered",
                              "cancelled",
                            ].map((s) => (
                              <SelectItem
                                key={s}
                                value={s}
                                className="text-xs capitalize"
                              >
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Delivery Zones */}
        <TabsContent value="delivery">
          <h2 className="font-display font-semibold text-lg mb-4">
            Delivery Zones
          </h2>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PIN Code</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DELIVERY_ZONES.map((zone, idx) => (
                  <TableRow
                    key={zone.pinCode}
                    data-ocid={`admin.delivery.row.${idx + 1}`}
                  >
                    <TableCell className="font-mono font-semibold">
                      {zone.pinCode}
                    </TableCell>
                    <TableCell>{zone.city}</TableCell>
                    <TableCell>{zone.state}</TableCell>
                    <TableCell>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          zone.available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {zone.available ? "Available" : "Unavailable"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
