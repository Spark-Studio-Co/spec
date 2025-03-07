import { create, StoreApi, UseBoundStore } from 'zustand'

interface ICheckBox {
    checked: boolean
    setChecked: () => void
}

const checkboxStorage: Record<string, UseBoundStore<StoreApi<ICheckBox>>> = {};

export const useCheckboxStore = (storeKey: string) => {
    if (!checkboxStorage[storeKey]) {
        checkboxStorage[storeKey] = create<ICheckBox>(
            (set) => ({
                checked: false,
                setChecked: () => set((state) => ({ checked: !state.checked }))
            })
        )
    }
    return checkboxStorage[storeKey]()
}