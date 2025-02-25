import { create } from "zustand";
import { SyntheticEvent } from "react";
import { useAuthStore } from "../../../app/model/use-auth-store";

interface ISendCodeStore {
    isLoading: boolean,
    error: string | null,
    submit: (e: SyntheticEvent, mutation: any, code: string, phone: string) => void
}

export const useSendCodeStore = create<ISendCodeStore>(
    (set) => ({
        isLoading: false,
        error: null,
        submit: async (e, mutate, code, phone) => {
            e.preventDefault();
            set({ isLoading: true, error: null });

            try {
                const response = await mutate({ code, phone });
                console.log('✅ Code verification successful:', response);
                set({ isLoading: false, error: null });

                if (response?.status === 200) {
                    const auth = useAuthStore.getState();
                    auth.setAuth(true);
                }
            } catch (error: any) {
                console.error('🚨 Code verification failed:', error);
                set({ error: error.message, isLoading: false });
            }
        }
    })
)