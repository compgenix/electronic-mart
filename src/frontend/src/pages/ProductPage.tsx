import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Heart,
  ShoppingCart,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "../components/ProductCard";
import { StarRating } from "../components/StarRating";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
import { useWishlist } from "../contexts/WishlistContext";
import { DELIVERY_ZONES, REVIEWS } from "../data/mockData";

export function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(0);
  const [pinCode, setPinCode] = useState("");
  const [pinStatus, setPinStatus] = useState<
    "idle" | "available" | "unavailable"
  >("idle");
  const [pinInfo, setPinInfo] = useState<{
    city: string;
    state: string;
  } | null>(null);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/">
          <Button className="mt-4">Go Home</Button>
        </Link>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
  const wishlisted = isWishlisted(product.id);
  const similar = products
    .filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
    )
    .slice(0, 4);
  const reviews = REVIEWS.filter((r) => r.productId === id);

  const checkPin = () => {
    if (pinCode.length !== 6) {
      toast.error("Enter a valid 6-digit PIN code");
      return;
    }
    const zone = DELIVERY_ZONES.find((z) => z.pinCode === pinCode);
    if (!zone) {
      setPinStatus("unavailable");
      setPinInfo(null);
      return;
    }
    setPinStatus(zone.available ? "available" : "unavailable");
    setPinInfo(zone.available ? { city: zone.city, state: zone.state } : null);
  };

  const stockStatus =
    product.stock === 0 ? "out" : product.stock <= 5 ? "low" : "in";

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (product.stock === 0) return;
    addToCart(product);
    navigate({ to: "/checkout" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link
          to="/category/$slug"
          params={{ slug: product.categorySlug }}
          className="hover:text-primary"
        >
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <div className="space-y-4">
          <div className="aspect-square bg-secondary rounded-2xl overflow-hidden">
            <img
              src={product.images[selectedImg]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  type="button"
                  key={img}
                  onClick={() => setSelectedImg(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    i === selectedImg ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
              {product.brand}
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {product.name}
            </h1>
            <div className="mt-2">
              <StarRating
                rating={product.rating}
                count={product.reviewCount}
                size={16}
              />
            </div>
          </div>

          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-foreground">
              &#8377;{product.price.toLocaleString()}
            </span>
            {discount > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  &#8377;{product.originalPrice.toLocaleString()}
                </span>
                <Badge className="bg-accent text-accent-foreground text-sm font-bold">
                  {discount}% OFF
                </Badge>
              </>
            )}
          </div>

          {product.emiFrom && (
            <p className="text-sm text-muted-foreground">
              EMI from{" "}
              <span className="font-semibold text-foreground">
                &#8377;{product.emiFrom.toLocaleString()}/month
              </span>{" "}
              on eligible cards
            </p>
          )}

          <div className="flex items-center gap-2">
            {stockStatus === "in" && (
              <CheckCircle2 size={18} className="text-green-500" />
            )}
            {stockStatus === "low" && (
              <AlertCircle size={18} className="text-yellow-500" />
            )}
            {stockStatus === "out" && (
              <XCircle size={18} className="text-destructive" />
            )}
            <span
              className={`text-sm font-semibold ${
                stockStatus === "in"
                  ? "text-green-600"
                  : stockStatus === "low"
                    ? "text-yellow-600"
                    : "text-destructive"
              }`}
            >
              {stockStatus === "in" && "In Stock"}
              {stockStatus === "low" && `Only ${product.stock} left in stock!`}
              {stockStatus === "out" && "Out of Stock"}
            </span>
          </div>

          <div className="bg-secondary rounded-xl p-4">
            <h3 className="font-semibold mb-3 text-sm">Check Delivery</h3>
            <div className="flex gap-2">
              <Input
                value={pinCode}
                onChange={(e) => {
                  setPinCode(e.target.value.slice(0, 6));
                  setPinStatus("idle");
                }}
                placeholder="Enter PIN code"
                data-ocid="product.pin_input"
                className="flex-1"
                maxLength={6}
              />
              <Button
                type="button"
                onClick={checkPin}
                data-ocid="product.pin_check_button"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Check
              </Button>
            </div>
            {pinStatus === "available" && pinInfo && (
              <div className="mt-3 flex items-center gap-2 text-green-600">
                <CheckCircle2 size={16} />
                <span className="text-sm">
                  Delivery available in{" "}
                  <strong>
                    {pinInfo.city}, {pinInfo.state}
                  </strong>
                </span>
              </div>
            )}
            {pinStatus === "unavailable" && (
              <div className="mt-3 flex items-center gap-2 text-destructive">
                <XCircle size={16} />
                <span className="text-sm">
                  Currently not delivering to this location
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              data-ocid="product.add_cart_button"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12"
            >
              <ShoppingCart size={18} className="mr-2" /> Add to Cart
            </Button>
            <Button
              size="lg"
              type="button"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              data-ocid="product.buy_now_button"
              className="flex-1 bg-accent hover:bg-accent/90 text-white h-12"
            >
              <Zap size={18} className="mr-2" /> Buy Now
            </Button>
            <Button
              size="lg"
              type="button"
              variant="outline"
              onClick={() => {
                toggle(product);
                toast(
                  wishlisted ? "Removed from wishlist" : "Added to wishlist",
                );
              }}
              data-ocid="product.wishlist_button"
              className="w-12 h-12 p-0"
            >
              <Heart
                size={18}
                className={wishlisted ? "fill-red-500 text-red-500" : ""}
              />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="specs" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
        </TabsList>
        <TabsContent value="specs">
          <div className="bg-card border rounded-xl overflow-hidden">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div
                key={key}
                className={`flex px-4 py-3 text-sm ${i % 2 === 0 ? "bg-secondary/50" : ""}`}
              >
                <span className="w-40 text-muted-foreground font-medium shrink-0">
                  {key}
                </span>
                <span className="text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="bg-card border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs">
                      {r.userName[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{r.userName}</div>
                      <div className="text-xs text-muted-foreground">
                        {r.date}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={r.rating} size={12} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="description">
          <div className="bg-card border rounded-xl p-6">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {similar.length > 0 && (
        <section>
          <h2 className="text-xl font-display font-bold mb-4">
            Similar Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {similar.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 1} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
