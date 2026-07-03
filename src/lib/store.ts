import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number, color: string, size: string) => void;
  updateQuantity: (
    id: number,
    quantity: number,
    color: string,
    size: string,
  ) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.id === item.id &&
              i.color === item.color &&
              i.size === item.size,
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id &&
                i.color === item.color &&
                i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      removeItem: (id: number, color: string, size: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.id === id && item.color === color && item.size === size),
          ),
        }));
      },
      updateQuantity: (
        id: number,
        quantity: number,
        color: string,
        size: string,
      ) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.color === color && item.size === size
              ? { ...item, quantity }
              : item,
          ),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
