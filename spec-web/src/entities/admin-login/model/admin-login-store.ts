import { create } from "zustand";

interface IAdminLoginStore {
    username: string
    password: string
    setUsername: (username: string) => void
    setPassword: (password: string) => void
}

export const useAdminLoginStore = create<IAdminLoginStore>(
    (set) => ({
        username: '',
        password: '',
        setUsername: (username: string) => set({ username: username }),
        setPassword: (password: string) => set({ password: password }),
    })
)