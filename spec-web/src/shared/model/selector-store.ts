import { create, StoreApi, UseBoundStore } from 'zustand'



interface ISelectorStore {
    selected: number
    selectedName: string
    setSelectedName: (name: string) => void
    setSelected: (selected: number) => void
}

const selectorStorage: Record<string, UseBoundStore<StoreApi<ISelectorStore>>> = {}

export const useSelectorStore = (storeKey: string) => {
    if (!selectorStorage[storeKey]) {
        selectorStorage[storeKey] = create<ISelectorStore>(
            (set) => ({
                selected: 0,
                selectedName: '',
                setSelectedName: (name: string) => set({ selectedName: name }),
                setSelected: (selected: number) => set({ selected: selected })
            })
        )
    }
    return selectorStorage[storeKey]()
}