import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import type { Product } from "../data/mockData";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 1 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      data-ocid={`product.item.${index}`}
      className="group block"
    >
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <div className="relative overflow-hidden bg-secondary aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold">
              -{discount}%
            </Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                Out of Stock
              </span>
            </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs">
              Only {product.stock} left
            </Badge>
          )}
          <button
            type="button"
            onClick={handleWishlist}
            data-ocid="product.wishlist_button"
            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={16}
              className={
                wishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground"
              }
            />
          </button>
        </div>

        <div className="p-3 flex flex-col flex-1 gap-2">
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {product.brand}
          </div>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <StarRating
            rating={product.rating}
            count={product.reviewCount}
            size={12}
          />
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-base font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {product.emiFrom && (
            <p className="text-xs text-muted-foreground">
              EMI from ₹{product.emiFrom.toLocaleString()}/mo
            </p>
          )}
          <Button
            size="sm"
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            data-ocid="product.add_cart_button"
            className="w-full mt-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ShoppingCart size={14} className="mr-1" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Link>
  );
}
