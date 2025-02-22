import { create } from "zustand";

interface ITakenApplicationStore {
    taken: number[];
    setTaken: (index: number) => void;
    removeTaken: (index: number) => void;
    clear: () => void;
}

export const useTakenApplicationStore = create<ITakenApplicationStore>(set => ({
    taken: [],
    setTaken: (index: number) => set(state => ({ taken: [...state.taken, index] })),
    removeTaken: (index: number) => set(state => ({ taken: state.taken.filter((item: number) => item !== index) })),
    clear: () => set({ taken: [] })
}))