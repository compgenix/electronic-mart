import { createContext, useContext, useEffect, useReducer } from "react";
import type { Product } from "../data/mockData";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  coupon: string | null;
  couponDiscount: number;
}

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; productId: string }
  | { type: "UPDATE"; productId: string; quantity: number }
  | { type: "APPLY_COUPON"; code: string; discount: number }
  | { type: "REMOVE_COUPON" }
  | { type: "CLEAR" };

const STORAGE_KEY = "em_cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "UPDATE":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      };
    case "APPLY_COUPON":
      return { ...state, coupon: action.code, couponDiscount: action.discount };
    case "REMOVE_COUPON":
      return { ...state, coupon: null, couponDiscount: 0 };
    case "CLEAR":
      return { items: [], coupon: null, couponDiscount: 0 };
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const saved = localStorage.getItem(STORAGE_KEY);
  const initial: CartState = saved
    ? JSON.parse(saved)
    : { items: [], coupon: null, couponDiscount: 0 };

  const [state, dispatch] = useReducer(cartReducer, initial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );
  const discount = state.couponDiscount;
  const taxable = Math.max(0, subtotal - discount);
  const tax = Math.round(taxable * 0.18);
  const total = taxable + tax;
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart: (p) => dispatch({ type: "ADD", product: p }),
        removeFromCart: (id) => dispatch({ type: "REMOVE", productId: id }),
        updateQuantity: (id, qty) =>
          dispatch({ type: "UPDATE", productId: id, quantity: qty }),
        applyCoupon: (code, discount) =>
          dispatch({ type: "APPLY_COUPON", code, discount }),
        removeCoupon: () => dispatch({ type: "REMOVE_COUPON" }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        itemCount,
        subtotal,
        tax,
        discount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
