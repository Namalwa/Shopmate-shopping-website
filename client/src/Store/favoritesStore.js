import { create } from "zustand";

const useFavoritesState = create((set) => ({
  favorites: [],
  addFavorite: (product) => set((state) => ({ favorites: [...state.favorites, product] })),
  removeFavorite: (productId) => set((state) => ({
    favorites: state.favorites.filter((product) => product.id !== productId),
  })),
}));

export default useFavoritesState;
