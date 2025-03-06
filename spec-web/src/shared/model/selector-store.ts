import { create, StoreApi, UseBoundStore } from 'zustand'

interface ISelectorStore {
    selected: string
    setSelected: (selected: string) => void
}

const selectorStorage: Record<string, UseBoundStore<StoreApi<ISelectorStore>>> = {}

export const useSelectorStore = (storeKey: string) => {
    if (!selectorStorage[storeKey]) {
        selectorStorage[storeKey] = create<ISelectorStore>(
            (set) => ({
                selected: '',
                setSelected: (selected: string) => set({ selected: selected })
            })
        )
    }
    return selectorStorage[storeKey]()
}