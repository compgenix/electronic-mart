import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { COUPONS } from "../data/mockData";

export function CartPage() {
  const {
    state,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    subtotal,
    tax,
    discount,
    total,
    itemCount,
  } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const navigate = useNavigate();

  const handleApplyCoupon = () => {
    const code = couponInput.toUpperCase().trim();
    const coupon = COUPONS.find((c) => c.code === code);
    if (!coupon) {
      toast.error("Invalid coupon code");
      return;
    }
    if (coupon.minOrder && subtotal < coupon.minOrder) {
      toast.error(
        `Minimum order amount ₹${coupon.minOrder.toLocaleString()} required`,
      );
      return;
    }
    const discountAmount =
      coupon.type === "percent"
        ? Math.round(subtotal * (coupon.value / 100))
        : coupon.value;
    applyCoupon(code, discountAmount);
    toast.success(
      `Coupon applied! You save ₹${discountAmount.toLocaleString()}`,
    );
    setCouponInput("");
  };

  if (state.items.length === 0) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 py-20 text-center"
        data-ocid="cart.empty_state"
      >
        <ShoppingBag size={64} className="mx-auto mb-4 text-muted" />
        <h2 className="text-2xl font-display font-bold mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link to="/">
          <Button className="bg-primary text-primary-foreground">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-6">
        Shopping Cart ({itemCount} items)
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item, idx) => {
            const discount_pct = Math.round(
              ((item.product.originalPrice - item.product.price) /
                item.product.originalPrice) *
                100,
            );
            return (
              <div
                key={item.product.id}
                data-ocid={`cart.item.${idx + 1}`}
                className="bg-card border rounded-xl p-4 flex gap-4"
              >
                <Link to="/product/$id" params={{ id: item.product.id }}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg bg-secondary"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to="/product/$id" params={{ id: item.product.id }}>
                    <h3 className="font-semibold text-foreground line-clamp-1 hover:text-primary">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.product.brand}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-lg">
                      ₹{item.product.price.toLocaleString()}
                    </span>
                    {discount_pct > 0 && (
                      <>
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{item.product.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-green-600 font-semibold">
                          -{discount_pct}%
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={item.product.stock}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product.id,
                            Number.parseInt(e.target.value) || 1,
                          )
                        }
                        data-ocid={`cart.quantity_input.${idx + 1}`}
                        className="w-12 text-center text-sm py-1.5 border-x focus:outline-none bg-background"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                        className="p-2 hover:bg-secondary transition-colors disabled:opacity-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        removeFromCart(item.product.id);
                        toast("Item removed");
                      }}
                      data-ocid={`cart.remove_button.${idx + 1}`}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-card border rounded-xl p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Tag size={16} className="text-accent" /> Coupon Code
            </h3>
            {state.coupon ? (
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-green-600">
                    {state.coupon}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    -₹{discount.toLocaleString()} saved
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={removeCoupon}>
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter coupon code"
                  data-ocid="cart.coupon_input"
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                />
                <Button
                  onClick={handleApplyCoupon}
                  data-ocid="cart.coupon_button"
                  className="bg-primary text-primary-foreground"
                >
                  Apply
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Try: SAVE10, MART200, NEWUSER
            </p>
          </div>

          {/* Price Breakdown */}
          <div className="bg-card border rounded-xl p-4">
            <h3 className="font-semibold mb-4">Price Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({itemCount} items)
                </span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (18% GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <Button
              className="w-full mt-4 bg-accent hover:bg-accent/90 text-white font-semibold h-11"
              onClick={() => navigate({ to: "/checkout" })}
              data-ocid="cart.checkout_button"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
