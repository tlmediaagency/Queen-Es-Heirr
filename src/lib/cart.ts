import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, SITE } from "@/data/site";

export type CartLine = { productId: string; qty: number };

type CartState = {
  lines: CartLine[];
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (productId, qty = 1) => {
        const existing = get().lines.find((l) => l.productId === productId);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.productId === productId ? { ...l, qty: l.qty + qty } : l,
            ),
          });
        } else {
          set({ lines: [...get().lines, { productId, qty }] });
        }
      },
      setQty: (productId, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.productId !== productId) });
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.productId === productId ? { ...l, qty } : l,
          ),
        });
      },
      remove: (productId) =>
        set({ lines: get().lines.filter((l) => l.productId !== productId) }),
      clear: () => set({ lines: [] }),
    }),
    { name: "queen-e-cart" },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotalCents(lines: CartLine[]) {
  return lines.reduce((sum, l) => {
    const p = PRODUCTS.find((x) => x.id === l.productId);
    return sum + (p ? p.priceCents * l.qty : 0);
  }, 0);
}

export function cartNeedsShipping(lines: CartLine[]) {
  return lines.some((l) => PRODUCTS.find((p) => p.id === l.productId)?.ships);
}

export function cartTotalCents(lines: CartLine[]) {
  const sub = cartSubtotalCents(lines);
  if (sub === 0) return 0;
  return sub + (cartNeedsShipping(lines) ? SITE.shippingCents : 0);
}
