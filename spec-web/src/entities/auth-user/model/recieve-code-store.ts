import { create } from "zustand";
import { SyntheticEvent } from "react";

interface IRecieveCodeStore {
    phone: string;
    setPhone: (phone: string) => void;
    isLoading: boolean;
    error: string | null;
    submit: (e: SyntheticEvent, mutate: any, navigate: any, rawPhone: string) => void;
}

export const useRecieveCodeStore = create<IRecieveCodeStore>((set) => ({
    phone: '',
    isLoading: false,
    error: null,
    setPhone: (phone: string) => set({ phone }),
    submit: (e: SyntheticEvent, mutate, navigate, rawPhone) => {
        e.preventDefault();

        set({ isLoading: true, error: null });

        mutate(
            { phone: rawPhone },
            {
                onSuccess: (data: any) => {
                    console.log("Code received:", data);
                    setTimeout(() => {
                        navigate('/code-confirmation', { replace: true });
                    }, 1500)
                },
                onError: (error: any) => {
                    console.log('error', error);
                    set({ error: error.message, isLoading: false });
                },
            }
        );
    },
}));