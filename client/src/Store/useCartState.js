import { create } from "zustand";

const useCartState = create((set) => ({
  cart: [], 
  setCart: (newCart) => set({ cart: newCart }), 
}));

export default useCartState;
