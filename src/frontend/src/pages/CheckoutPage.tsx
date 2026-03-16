import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
import { DELIVERY_ZONES } from "../data/mockData";

interface Address {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

const PAYMENT_OPTIONS = [
  { value: "cod", label: "Cash on Delivery", desc: "Pay when delivered" },
  { value: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
  {
    value: "card",
    label: "Credit / Debit Card",
    desc: "Visa, Mastercard, RuPay",
  },
];

export function CheckoutPage() {
  const { state, subtotal, tax, discount, total, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [addr, setAddr] = useState<Address>({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const [payment, setPayment] = useState("cod");
  const [pinStatus, setPinStatus] = useState<"idle" | "ok" | "fail">("idle");
  const [placing, setPlacing] = useState(false);

  const checkPin = (pin: string) => {
    if (pin.length !== 6) {
      setPinStatus("idle");
      return;
    }
    const zone = DELIVERY_ZONES.find((z) => z.pinCode === pin);
    setPinStatus(zone?.available ? "ok" : "fail");
    if (zone?.available) {
      setAddr((a) => ({ ...a, city: zone.city, state: zone.state }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.items.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    if (pinStatus === "fail") {
      toast.error("Delivery not available at this PIN code");
      return;
    }
    if (pinStatus === "idle") {
      toast.error("Please verify your PIN code");
      return;
    }
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1200));
    const order = addOrder({
      items: state.items,
      total,
      status: "confirmed",
      address: addr,
      paymentMethod: payment,
    });
    clearCart();
    toast.success(`Order ${order.id} placed successfully!`);
    navigate({ to: "/orders" });
    setPlacing(false);
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold mb-4">No items in cart</h2>
        <Button type="button" onClick={() => navigate({ to: "/" })}>
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border rounded-xl p-6">
              <h2 className="font-display font-semibold text-lg mb-4">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="addr-name">Full Name *</Label>
                  <Input
                    id="addr-name"
                    required
                    value={addr.name}
                    onChange={(e) => setAddr({ ...addr, name: e.target.value })}
                    placeholder="Rahul Sharma"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="addr-phone">Phone *</Label>
                  <Input
                    id="addr-phone"
                    required
                    value={addr.phone}
                    onChange={(e) =>
                      setAddr({ ...addr, phone: e.target.value })
                    }
                    placeholder="9876543210"
                    type="tel"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="addr-address">Address *</Label>
                  <Input
                    id="addr-address"
                    required
                    value={addr.address}
                    onChange={(e) =>
                      setAddr({ ...addr, address: e.target.value })
                    }
                    placeholder="House no, Street, Area"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="addr-pin">PIN Code *</Label>
                  <div className="relative">
                    <Input
                      id="addr-pin"
                      required
                      value={addr.pinCode}
                      onChange={(e) => {
                        const v = e.target.value.slice(0, 6);
                        setAddr({ ...addr, pinCode: v });
                        checkPin(v);
                      }}
                      placeholder="400001"
                      data-ocid="checkout.pin_input"
                      maxLength={6}
                    />
                    {pinStatus === "ok" && (
                      <CheckCircle2
                        size={16}
                        className="absolute right-3 top-3 text-green-500"
                      />
                    )}
                    {pinStatus === "fail" && (
                      <XCircle
                        size={16}
                        className="absolute right-3 top-3 text-destructive"
                      />
                    )}
                  </div>
                  {pinStatus === "ok" && (
                    <p className="text-xs text-green-600">Delivery available</p>
                  )}
                  {pinStatus === "fail" && (
                    <p className="text-xs text-destructive">
                      Not available at this PIN
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="addr-city">City</Label>
                  <Input
                    id="addr-city"
                    value={addr.city}
                    onChange={(e) => setAddr({ ...addr, city: e.target.value })}
                    placeholder="Mumbai"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="addr-state">State</Label>
                  <Input
                    id="addr-state"
                    value={addr.state}
                    onChange={(e) =>
                      setAddr({ ...addr, state: e.target.value })
                    }
                    placeholder="Maharashtra"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-xl p-6">
              <h2 className="font-display font-semibold text-lg mb-4">
                Payment Method
              </h2>
              <RadioGroup
                value={payment}
                onValueChange={setPayment}
                data-ocid="checkout.payment_select"
                className="space-y-2"
              >
                {PAYMENT_OPTIONS.map((pm) => (
                  <div
                    key={pm.value}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary transition-colors"
                  >
                    <RadioGroupItem value={pm.value} id={`pay-${pm.value}`} />
                    <label
                      htmlFor={`pay-${pm.value}`}
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium text-sm">{pm.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {pm.desc}
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div>
            <div className="bg-card border rounded-xl p-5 sticky top-24">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {state.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-2 items-center"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded bg-secondary"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        x{item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-semibold">
                      &#8377;
                      {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>&#8377;{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-&#8377;{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>&#8377;{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>&#8377;{total.toLocaleString()}</span>
                </div>
              </div>
              <Button
                type="submit"
                disabled={placing}
                className="w-full mt-5 bg-accent hover:bg-accent/90 text-white font-semibold h-11"
                data-ocid="checkout.place_order_button"
              >
                {placing ? "Placing Order..." : "Place Order"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Secure checkout
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
