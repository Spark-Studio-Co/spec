import { create } from "zustand";
import { SyntheticEvent } from "react";

interface ISendCodeStore {
    token: '',
    isLoading: boolean,
    error: string | null,
    submit: (e: SyntheticEvent, mutation: any, code: string, phone: string, saveToken: (token: string) => void) => void
}

export const useSendCodeStore = create<ISendCodeStore>(
    (set) => ({
        token: '',
        isLoading: false,
        error: null,
        submit: async (e, mutate, code, phone, saveToken) => {
            e.preventDefault();
            set({ isLoading: true, error: null });

            mutate(
                { code, phone },
                {
                    onSuccess: (data: any) => {
                        if (data?.token) {
                            console.log("🔑 Token received:", data.token);
                            saveToken(data.token);
                        } else {
                            console.warn("⚠️ No token received in response!");
                        }
                    },
                    onError: (error: any) => {
                        console.log("🚨 Error:", error);
                        set({ error: error.message, isLoading: false });
                    },
                }
            );
        }
    })
)