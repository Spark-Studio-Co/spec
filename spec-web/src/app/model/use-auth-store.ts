import { create } from "zustand";

interface IAuthStore {
    isAuth: boolean
    setAuth: (state: boolean) => void
}

export const useAuthStore = create<IAuthStore>((set) => ({
    isAuth: false,
    setAuth: (auth: boolean) => {
        set(() => ({ isAuth: auth }));
    },
}));