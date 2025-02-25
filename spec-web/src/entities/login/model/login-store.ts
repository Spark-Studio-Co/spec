import { create } from "zustand";

interface ILoginStore {
    login: string
    password: string
    setLogin: (login: string) => void
    setPassword: (password: string) => void
}

export const useLoginStore = create<ILoginStore>(
    (set) => ({
        login: '',
        password: '',
        setLogin: (login: string) => set({ login: login }),
        setPassword: (password: string) => set({ password: password })
    })
)