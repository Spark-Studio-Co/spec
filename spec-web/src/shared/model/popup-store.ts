import { create, StoreApi, UseBoundStore } from "zustand";

interface IPopupStore {
    isOpen: boolean
    passedValue?: string
    open: () => void
    close: () => void
    toggle: () => void
    setPassedValue: (value: string) => void
}

const popupStorage: Record<string, UseBoundStore<StoreApi<IPopupStore>>> = {};

export const usePopupStore = (storeKey: string, passedValue?: string) => {
    if (!popupStorage[storeKey]) {
        popupStorage[storeKey] = create<IPopupStore>((set) => ({
            isOpen: false,
            passedValue: undefined,
            open: () => set({ isOpen: true }),
            close: () => set({ isOpen: false }),
            toggle: () => set((state) => ({ isOpen: !state.isOpen })),
            setPassedValue: (value: string) => set({ passedValue: value })
        }))
    }
    if (passedValue !== undefined) {
        popupStorage[storeKey]().setPassedValue(passedValue);
    }

    return popupStorage[storeKey]()
}