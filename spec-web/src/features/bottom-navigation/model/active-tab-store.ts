import { create } from "zustand";

export interface IActiveTabStore {
    activeTab: string
    setActiveTab: (tab: string) => void
}

export const useActiveTabStore = create<IActiveTabStore>(set => ({
    activeTab: 'Заявки',
    setActiveTab: (tab: string) => set({ activeTab: tab })
}))