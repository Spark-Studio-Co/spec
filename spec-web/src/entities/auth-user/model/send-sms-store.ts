import { create } from "zustand";
import { SyntheticEvent } from "react";

interface ISendSmsStore {
    phone: string;
    setPhone: (phone: string) => void;
    isLoading: boolean;
    error: string | null;
    submit: (e: SyntheticEvent, mutate: any, navigate: any, rawPhone: string, saveRequestId: (requestId: string) => void) => void;
}

export const useSendSmsStore = create<ISendSmsStore>((set) => ({
    phone: '',
    isLoading: false,
    error: null,
    setPhone: (phone: string) => set({ phone }),
    submit: (e: SyntheticEvent, mutate, navigate, rawPhone, saveRequestId) => {
        e.preventDefault();

        set({ isLoading: true, error: null });

        mutate(
            { phone: rawPhone },
            {
                onSuccess: (data: any) => {

                    if (data?.request_id) {
                        console.log("🔑 Request id received:", data.request_id);
                        saveRequestId(data.request_id);
                    } else {
                        console.warn("⚠️ No request_id received in response!");
                    }

                    console.log("Code received:", data);
                    setTimeout(() => {
                        navigate('/code-confirmation', { replace: true });
                        set({ isLoading: false, error: null });
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