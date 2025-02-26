import { create } from "zustand";
import { SyntheticEvent } from "react";

interface IVerifySmsStore {
    token: string,
    isLoading: boolean,
    error: string | null,
    submit: (e: SyntheticEvent, mutation: any, code: string, phone: string, request_id: string, saveToken: (token: string) => void) => void
}

export const useVerifySmsStore = create<IVerifySmsStore>(
    (set) => ({
        token: '',
        isLoading: false,
        error: null,
        submit: async (e, mutate, code, phone, request_id, saveToken) => {
            e.preventDefault();
            set({ isLoading: true, error: null });

            mutate(
                { code, phone, request_id },
                {
                    onSuccess: (data: any) => {
                        if (data?.token) {
                            console.log(" Token received:", data.token);
                            saveToken(data.token);
                        } else {
                            console.warn(" No token received in response!");
                        }
                    },
                    onError: (error: any) => {
                        console.log(" Error:", error);
                        set({ error: error.message, isLoading: false });
                    },
                }
            );
        }
    })
)