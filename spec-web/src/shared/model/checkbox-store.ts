import { create, StoreApi, UseBoundStore } from 'zustand'

interface ICheckBox {
    checked: boolean
    setChecked: () => void
}

const checkboxStorage: Record<string, UseBoundStore<StoreApi<ICheckBox>>> = {};

const defaultInitialStates: Record<string, boolean> = {
    'time': true
};

export const useCheckboxStore = (storeKey: string) => {
    if (!checkboxStorage[storeKey]) {
        const initialChecked = defaultInitialStates[storeKey] || false;

        checkboxStorage[storeKey] = create<ICheckBox>(
            (set) => ({
                checked: initialChecked,
                setChecked: () => set((state) => ({ checked: !state.checked }))
            })
        )
    }
    return checkboxStorage[storeKey]()
}