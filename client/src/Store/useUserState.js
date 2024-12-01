// Store/UserStore.js
import { create } from "zustand";

const useUserState = create((set) => ({
  user: null,
  token: null,
  setUser: (userData, userToken) =>
    set({ user: userData, token: userToken }),
  clearUser: () => set({ user: null, token: null }),
}));

export default useUserState;

