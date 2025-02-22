import { create } from "zustand"

interface IExecutionApplicationStore {
    execution: number | null
    setExecution: (index: number) => void
    closeExecution: () => void
}

export const useExecutionApplicationStore = create<IExecutionApplicationStore>(set => ({
    execution: null,
    setExecution: (index: number) => set({ execution: index }),
    closeExecution: () => set({ execution: null }),
}))