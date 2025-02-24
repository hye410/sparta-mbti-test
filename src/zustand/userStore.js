import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: {},
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
