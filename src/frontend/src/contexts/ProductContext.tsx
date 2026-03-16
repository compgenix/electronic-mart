import { createContext, useContext, useState } from "react";
import { PRODUCTS, type Product } from "../data/mockData";

export interface Order {
  id: string;
  items: Array<{ product: Product; quantity: number }>;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
  };
  paymentMethod: string;
}

interface ProductContextType {
  products: Product[];
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("em_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const addOrder = (order: Omit<Order, "id" | "createdAt">) => {
    const newOrder: Order = {
      ...order,
      id: `ORD${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem("em_orders", JSON.stringify(updated));
      return updated;
    });
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === orderId ? { ...o, status } : o,
      );
      localStorage.setItem("em_orders", JSON.stringify(updated));
      return updated;
    });
  };

  const addProduct = (product: Omit<Product, "id">) => {
    setProducts((prev) => [...prev, { ...product, id: `p${Date.now()}` }]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        orders,
        addOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
}
