import { create } from "zustand";
import { SyntheticEvent } from "react";

interface IVerifySmsStore {
    token: string;
    isLoading: boolean;
    error: string | null;
    submit: (
        e: SyntheticEvent,
        mutation: any,
        code: string,
        phone: string,
        request_id: string,
        saveToken: (token: string) => void,
        setAuth: (value: boolean) => void // Pass setAuth as a function
    ) => void;
}

export const useVerifySmsStore = create<IVerifySmsStore>((set) => ({
    token: '',
    isLoading: false,
    error: null,
    submit: async (e, mutate, code, phone, request_id, saveToken, setAuth) => {
        e.preventDefault();
        set({ isLoading: true, error: null });

        mutate(
            { code, phone, request_id },
            {
                onSuccess: (data: any) => {
                    if (data?.token) {
                        console.log("✅ Token received:", data.token);
                        saveToken(data.token);
                        setTimeout(() => setAuth(true), 1500);
                    } else {
                        console.warn("⚠️ No token received in response!");
                        set({ error: "Неверный код подтверждения", isLoading: false });
                    }
                },
                onError: (error: any) => {
                    console.log("❌ Error:", error);
                    set({ error: "Ошибка проверки кода", isLoading: false });
                },
            }
        );
    }
}));