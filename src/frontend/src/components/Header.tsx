import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { CATEGORIES, PRODUCTS } from "../data/mockData";

export function Header() {
  const { itemCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { isLoggedIn, isAdmin, mockLogout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    const matches = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
    )
      .slice(0, 5)
      .map((p) => p.name);
    setSuggestions(matches);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (q?: string) => {
    const searchQuery = q ?? query;
    if (searchQuery.trim()) {
      navigate({ to: "/search", search: { q: searchQuery } });
      setSuggestions([]);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="bg-primary border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-display font-bold text-lg leading-tight">
                  Electronic
                </div>
                <div className="text-accent font-display font-bold text-sm leading-tight -mt-1">
                  Mart
                </div>
              </div>
            </div>
          </Link>

          <div ref={searchRef} className="flex-1 relative max-w-2xl">
            <div className="flex">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for products, brands..."
                data-ocid="nav.search_input"
                className="rounded-r-none border-0 bg-white text-foreground h-10 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="button"
                onClick={() => handleSearch()}
                className="rounded-l-none bg-accent hover:bg-accent/90 h-10 px-4 border-0"
              >
                <Search size={18} className="text-white" />
              </Button>
            </div>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg border border-t-0 z-50">
                {suggestions.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => handleSearch(s)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-secondary flex items-center gap-2"
                  >
                    <Search size={14} className="text-muted-foreground" />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                data-ocid="nav.wishlist_button"
                className="relative text-white hover:bg-white/10"
              >
                <Heart size={20} />
                {wishCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] bg-accent flex items-center justify-center">
                    {wishCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                data-ocid="nav.cart_button"
                className="relative text-white hover:bg-white/10"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] bg-accent flex items-center justify-center">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-1">
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    size="icon"
                    data-ocid="nav.account_button"
                    className="text-white hover:bg-white/10"
                  >
                    <User size={20} />
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={mockLogout}
                  className="text-white hover:bg-white/10"
                >
                  <LogOut size={20} />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  data-ocid="nav.account_button"
                  className="text-white hover:bg-white/10 hidden sm:flex"
                >
                  <User size={16} className="mr-1" /> Login
                </Button>
              </Link>
            )}
            <button
              type="button"
              className="sm:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-primary-foreground/5 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.slug}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                data-ocid={`home.category_link.${i + 1}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded text-xs font-medium whitespace-nowrap transition-colors"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-accent hover:text-accent/80 rounded text-xs font-bold whitespace-nowrap"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="sm:hidden bg-primary border-t border-white/10">
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-2 py-2 text-white/90 hover:bg-white/10 rounded text-sm"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
