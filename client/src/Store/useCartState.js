import { create } from "zustand";

const useCartState = create((set) => ({
  cart: [],
  setCart: (newCart) => {
    console.log("Setting new cart state:", newCart); 
    set({ cart: newCart });
  },
  clearCart: () => set({ cart: [] }),
}));

export default useCartState;
