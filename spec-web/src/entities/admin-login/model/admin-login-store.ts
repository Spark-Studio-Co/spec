import { create } from "zustand";

interface IAdminLoginStore {
    login: string
    password: string
    setLogin: (login: string) => void
    setPassword: (password: string) => void
}

export const useAdminLoginStore = create<IAdminLoginStore>(
    (set) => ({
        login: '',
        password: '',
        setLogin: (login: string) => set({ login: login }),
        setPassword: (password: string) => set({ password: password }),
    })
)