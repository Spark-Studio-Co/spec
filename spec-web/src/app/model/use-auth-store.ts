import { create } from "zustand";

interface IAuthStore {
    isAuth: boolean
    isAdmin: boolean
    setAuth: (state: boolean) => void
    setAdmin: (state: boolean) => void
}

export const useAuthStore = create<IAuthStore>(
    (set) => ({
        isAuth: false,
        isAdmin: false,
        setAuth: (state: boolean) => set({ isAuth: state }),
        setAdmin: (state: boolean) => set({ isAdmin: state })
    })
)