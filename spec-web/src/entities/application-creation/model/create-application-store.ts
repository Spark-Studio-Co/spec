import { create } from 'zustand';

interface ICreateApplcation {
    cityId: number
    cityArea: string
    categoryId: number
    date: string
    title: string
    description: string
    priceMin: number
    priceMax: number
    commission: number
    phone: string
    address: string
    statusId: number
    emergency: boolean

    setDate: (date: string) => void
    setTitle: (title: string) => void
    setDescription: (description: string) => void
    setPriceMin: (priceMin: number) => void
    setPriceMax: (priceMax: number) => void
    setPhone: (phone: string) => void
    setAddress: (address: string) => void
    setEmergency: () => void
}

export const useCreateApplicationStore = create<ICreateApplcation>((set) => ({
    cityId: 0,
    cityArea: '',
    categoryId: 0,
    date: '',
    title: '',
    description: '',
    priceMin: 0,
    priceMax: 0,
    commission: 0,
    phone: '',
    address: '',
    statusId: 0,
    emergency: false,

    setDate: (date: string) => set({ date }),
    setTitle: (title: string) => set({ title }),
    setDescription: (description: string) => set({ description }),
    setPriceMin: (priceMin: number) => set({ priceMin }),
    setPriceMax: (priceMax: number) => set({ priceMax }),
    setPhone: (phone: string) => set({ phone }),
    setAddress: (address: string) => set({ address }),
    setEmergency: () => set((state) => ({ emergency: !state.emergency }))
}))