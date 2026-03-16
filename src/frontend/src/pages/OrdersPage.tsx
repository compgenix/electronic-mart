import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Package } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../contexts/ProductContext";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    progress: 10,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800",
    progress: 30,
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-800",
    progress: 65,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    progress: 100,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    progress: 0,
  },
};

export function OrdersPage() {
  const { orders } = useProducts();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Package size={48} className="mx-auto mb-4 text-muted" />
        <h2 className="text-xl font-bold mb-2">Login to view orders</h2>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div
        className="max-w-xl mx-auto px-4 py-20 text-center"
        data-ocid="orders.empty_state"
      >
        <Package size={48} className="mx-auto mb-4 text-muted" />
        <h2 className="text-xl font-bold mb-2">No orders yet</h2>
        <p className="text-muted-foreground mb-6">
          Your order history will appear here.
        </p>
        <Link to="/">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order, idx) => {
          const cfg = STATUS_CONFIG[order.status];
          return (
            <div
              key={order.id}
              data-ocid={`orders.item.${idx + 1}`}
              className="bg-card border rounded-xl p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    {order.id}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg.color}`}
                  >
                    {cfg.label}
                  </span>
                  <span className="font-bold">
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Tracking */}
              {order.status !== "cancelled" && (
                <div className="mb-4">
                  <Progress value={cfg.progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    {["Confirmed", "Processing", "Shipped", "Delivered"].map(
                      (s) => (
                        <span key={s}>{s}</span>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Items */}
              <div className="flex gap-3 flex-wrap">
                {order.items.slice(0, 3).map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded bg-secondary"
                    />
                    <div>
                      <p className="text-xs font-medium line-clamp-1 max-w-[120px]">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        x{item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    +{order.items.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
