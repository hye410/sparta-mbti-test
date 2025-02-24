import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  user: {},
};

const useUserStore = create(
  persist(
    (set) => ({
      ...initialState,
      setUser: (userData) => {
        set((state) => ({ user: { ...state.user, ...userData } }));
      },
      initUser: () => {
        set((state) => (state.user = {}));
        sessionStorage.removeItem("user");
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
