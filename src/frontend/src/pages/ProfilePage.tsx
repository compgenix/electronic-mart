import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  LogOut,
  Package,
  Shield,
  ShoppingCart,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
import { useWishlist } from "../contexts/WishlistContext";

export function ProfilePage() {
  const { isLoggedIn, isAdmin, mockLogout } = useAuth();
  const { orders } = useProducts();
  const { count: wishCount } = useWishlist();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold mb-4">Please login to view profile</h2>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 mb-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
            <User size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold">
              Electronic Mart Customer
            </h1>
            <p className="text-white/70 text-sm">demo@electronicmart.in</p>
            {isAdmin && (
              <span className="inline-flex items-center gap-1 text-xs bg-accent/20 text-accent border border-accent/30 rounded px-2 py-0.5 mt-1">
                <Shield size={10} /> Admin
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            icon: Package,
            label: "Orders",
            value: orders.length,
            to: "/orders",
          },
          { icon: Heart, label: "Wishlist", value: wishCount, to: "/wishlist" },
          {
            icon: ShoppingCart,
            label: "In Cart",
            value: itemCount,
            to: "/cart",
          },
        ].map(({ icon: Icon, label, value, to }) => (
          <Link key={to} to={to}>
            <div className="bg-card border rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <Icon size={20} className="mx-auto mb-1 text-primary" />
              <div className="text-xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        {[
          { icon: Package, label: "My Orders", to: "/orders" },
          { icon: Heart, label: "My Wishlist", to: "/wishlist" },
          { icon: ShoppingCart, label: "View Cart", to: "/cart" },
          ...(isAdmin
            ? [{ icon: Shield, label: "Admin Dashboard", to: "/admin" }]
            : []),
        ].map(({ icon: Icon, label, to }, i) => (
          <Link key={to} to={to}>
            <div
              className={`flex items-center gap-3 px-5 py-4 hover:bg-secondary transition-colors ${i > 0 ? "border-t" : ""}`}
            >
              <Icon size={18} className="text-primary" />
              <span className="text-sm font-medium">{label}</span>
              <span className="ml-auto text-muted-foreground">&rsaquo;</span>
            </div>
          </Link>
        ))}
        <div className="border-t">
          <button
            type="button"
            onClick={() => {
              mockLogout();
              navigate({ to: "/" });
            }}
            className="flex items-center gap-3 px-5 py-4 w-full hover:bg-secondary transition-colors text-destructive"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
