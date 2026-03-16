import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { useWishlist } from "../contexts/WishlistContext";

export function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div
        className="max-w-xl mx-auto px-4 py-20 text-center"
        data-ocid="wishlist.empty_state"
      >
        <Heart size={48} className="mx-auto mb-4 text-muted" />
        <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">
          Save items you love for later.
        </p>
        <Link to="/">
          <Button>Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-6">
        <Heart className="inline mr-2 fill-red-500 text-red-500" size={22} />
        My Wishlist ({items.length} items)
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
